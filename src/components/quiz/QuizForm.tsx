'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/use-auth';
import { questionBankFor10th, questionBankFor12th } from '@/lib/quiz/question-bank';
import {
  initializeQuizState,
  selectNextQuestion,
  updateQuizState,
  revertQuizState,
  resumeQuizState,
  QuizState
} from '@/lib/quiz/adaptive-engine';
import type { EnhancedQuizQuestion } from '@/lib/quiz/riasec-scoring';
import { ArrowUp, ArrowDown, Check } from 'lucide-react';
import { LoadingAnimation } from '@/components/ui/LoadingAnimation';

// Helper function to render icons
function renderIcon(icon: string | undefined, size: 'sm' | 'md' | 'lg' = 'md') {
  if (!icon) return null;

  if (icon.startsWith('http://') || icon.startsWith('https://')) {
    const sizeMap = { sm: '24', md: '32', lg: '48' };
    return <img src={icon} alt="icon" className={`inline-block w-${sizeMap[size]} h-${sizeMap[size]} object-contain`} />;
  }

  const sizeClass = size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-3xl' : 'text-4xl';
  return <span className={sizeClass}>{icon}</span>;
}

export function QuizForm() {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<EnhancedQuizQuestion | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string | number | string[] | Record<string, number> | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { userProfile, loading, updateQuizAnswers } = useAuth();

  const questionBank = userProfile?.classLevel === '10' ? questionBankFor10th : questionBankFor12th;

  useEffect(() => {
    if (userProfile && !quizState) {
      let initialState: QuizState;
      const hasSavedProgress = userProfile.quizAnswers && Object.keys(userProfile.quizAnswers).length > 0;

      if (hasSavedProgress) {
        const allQuestions = [
          ...questionBank.baseline,
          ...Object.values(questionBank.deepdive).flat(),
          ...(questionBank.academic || []),
          ...(questionBank.values || []),
          ...(questionBank.skills || []),
          ...(questionBank.learningStyle || []),
        ];
        initialState = resumeQuizState(userProfile.quizAnswers, allQuestions);
      } else {
        initialState = initializeQuizState();
      }

      setQuizState(initialState);
      const nextQuestion = selectNextQuestion(initialState, questionBank);

      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
      } else if (initialState.questionCount >= 15) {
        // If loaded state is already complete, redirect to results
        router.push(`/quiz/results?completed=true`);
      }
    }
  }, [userProfile, quizState, questionBank, router]);

  if (loading || !userProfile) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader><CardTitle>Loading...</CardTitle></CardHeader>
      </Card>
    );
  }

  if (isSubmitting) {
    return <LoadingAnimation />;
  }

  if (!quizState || !currentQuestion) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader><CardTitle>Error</CardTitle><CardDescription>Could not load quiz.</CardDescription></CardHeader>
      </Card>
    );
  }

  const progress = ((quizState.questionCount + 1) / 15) * 100; // Target ~15 questions now
  const totalQuestions = 15;

  const handleBack = () => {
    if (!quizState || quizState.questionCount === 0) return;

    const allQuestions = [
      ...questionBank.baseline,
      ...Object.values(questionBank.deepdive).flat(),
      ...(questionBank.academic || []),
      ...(questionBank.values || []),
      ...(questionBank.skills || []),
      ...(questionBank.learningStyle || []),
    ];

    const { newState, lastAnswer } = revertQuizState(quizState, allQuestions);

    if (lastAnswer) {
      setQuizState(newState);
      // Find the question object for the last answer
      const prevQuestion = allQuestions.find(q => q.id === lastAnswer.questionId);
      if (prevQuestion) {
        setCurrentQuestion(prevQuestion);
        // In QuizState it's stored as raw value, so we can use it directly
        setCurrentAnswer(lastAnswer.answer);
      }
    }
  };

  const handleNext = async () => {
    if (currentAnswer === undefined) return;

    const allQuestions = [
      ...questionBank.baseline,
      ...Object.values(questionBank.deepdive).flat(),
      ...(questionBank.academic || []),
      ...(questionBank.values || []),
      ...(questionBank.skills || []),
      ...(questionBank.learningStyle || []),
    ];

    const newState = updateQuizState(
      quizState,
      currentQuestion.id,
      currentAnswer,
      allQuestions
    );
    setQuizState(newState);

    const nextQuestion = selectNextQuestion(newState, questionBank);

    if (!nextQuestion || newState.questionCount >= 20) {
      setIsSubmitting(true);
      // Artificial delay to show the animation
      await new Promise(resolve => setTimeout(resolve, 4000)); // 4 seconds min
      await finishQuiz(newState);
    } else {
      setCurrentQuestion(nextQuestion);
      setCurrentAnswer(undefined);
    }
  };

  const finishQuiz = async (finalState: QuizState) => {
    const answersObject: Record<string, string> = {};
    finalState.answeredQuestions.forEach((response) => {
      if (typeof response.answer === 'object') {
        answersObject[response.questionId] = JSON.stringify(response.answer);
      } else {
        answersObject[response.questionId] = String(response.answer);
      }
    });

    await updateQuizAnswers(answersObject);
    router.push(`/quiz/results?completed=true`);
  };

  const isAnswered = currentAnswer !== undefined &&
    (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

  const displayQuestion = convertToDisplayFormat(currentQuestion);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">AI-Powered Career Assessment</CardTitle>
        <CardDescription>
          Question {quizState.questionCount + 1} of ~{totalQuestions}
        </CardDescription>
        <Progress value={progress} className="w-full mt-2" />
      </CardHeader>
      <CardContent className="min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold text-xl mb-6">{displayQuestion.question}</h3>

            {/* SCENARIO TYPE */}
            {displayQuestion.type === 'scenario' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayQuestion.scenarios?.map((scenario: any) => (
                  <button
                    key={scenario.id}
                    onClick={() => setCurrentAnswer(scenario.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-md ${currentAnswer === scenario.id
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:border-primary/50'
                      }`}
                  >
                    <div className="mb-3">{renderIcon(scenario.icon, 'lg')}</div>
                    <h4 className="font-bold text-base mb-1">{scenario.title}</h4>
                    <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  </button>
                ))}
              </div>
            )}

            {/* MULTIPLE CHOICE TYPE */}
            {displayQuestion.type === 'multiple-choice' && (
              <RadioGroup
                value={String(currentAnswer || '')}
                onValueChange={setCurrentAnswer}
                className="space-y-3"
              >
                {displayQuestion.options?.map((option: string, index: number) => (
                  <div key={index} className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${currentAnswer === option ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary/50'
                    }`}>
                    <RadioGroupItem value={option} id={`opt-${index}`} />
                    <Label htmlFor={`opt-${index}`} className="flex-1 cursor-pointer font-medium text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* CHECKBOX MULTI TYPE */}
            {displayQuestion.type === 'checkbox-multi' && (
              <div className="space-y-3">
                {displayQuestion.options?.map((option: string, index: number) => {
                  const selected = (currentAnswer as string[] || []).includes(option);
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${selected ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary/50'
                        }`}
                      onClick={() => {
                        const current = (currentAnswer as string[]) || [];
                        const updated = current.includes(option)
                          ? current.filter(i => i !== option)
                          : [...current, option];
                        setCurrentAnswer(updated);
                      }}
                    >
                      <Checkbox checked={selected} />
                      <span className="flex-1 font-medium text-base">{option}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SLIDER TYPE */}
            {displayQuestion.type === 'slider' && (
              <div className="py-8 px-4">
                <div className="flex justify-between mb-4 text-sm font-medium text-muted-foreground">
                  <span>{displayQuestion.sliderConfig?.minLabel}</span>
                  <span>{displayQuestion.sliderConfig?.maxLabel}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={Number(currentAnswer || 5)}
                  onChange={(e) => setCurrentAnswer(Number(e.target.value))}
                  className="w-full h-4 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="text-center mt-4 font-bold text-2xl text-primary">
                  {typeof currentAnswer === 'number' ? currentAnswer : 5} / 10
                </div>
              </div>
            )}

            {/* SLIDER GRID TYPE */}
            {displayQuestion.type === 'slider-grid' && (
              <div className="space-y-6">
                {displayQuestion.skills?.map((skill: any) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <Label className="text-base">{skill.name}</Label>
                      <span className="text-primary font-bold">
                        {((currentAnswer as Record<string, number>)?.[skill.name] || 0)}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={((currentAnswer as Record<string, number>)?.[skill.name] || 0)}
                      onChange={(e) => {
                        const current = (currentAnswer as Record<string, number>) || {};
                        setCurrentAnswer({ ...current, [skill.name]: Number(e.target.value) });
                      }}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* RANKING TYPE */}
            {displayQuestion.type === 'ranking' && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Click options in order of importance (1 = Most Important)
                </p>
                <div className="space-y-2">
                  {displayQuestion.options?.map((option: string) => {
                    const rank = (currentAnswer as string[] || []).indexOf(option);
                    const isSelected = rank !== -1;

                    return (
                      <div
                        key={option}
                        onClick={() => {
                          const current = (currentAnswer as string[]) || [];
                          if (isSelected) {
                            setCurrentAnswer(current.filter(i => i !== option));
                          } else {
                            setCurrentAnswer([...current, option]);
                          }
                        }}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary/50'
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                          }`}>
                          {isSelected ? rank + 1 : ''}
                        </div>
                        <span className="font-medium">{option}</span>
                        {isSelected && <Check className="ml-auto w-5 h-5 text-primary" />}
                      </div>
                    );
                  })}
                </div>
                {(currentAnswer as string[] || []).length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentAnswer([])}
                    className="mt-2 text-muted-foreground"
                  >
                    Reset Ranking
                  </Button>
                )}
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={quizState.questionCount === 0 || isSubmitting}
        >
          <ArrowUp className="w-4 h-4 mr-2 rotate-[-90deg]" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!isAnswered || isSubmitting} size="lg" className="px-8">
          {quizState.questionCount >= 19 ? 'Finish Assessment' : 'Next Question'}
        </Button>
      </CardFooter>
    </Card>
  );
}

function convertToDisplayFormat(question: EnhancedQuizQuestion): any {
  const base = {
    id: question.id,
    question: question.text,
  };

  switch (question.type) {
    case 'scenario':
      return { ...base, type: 'scenario', scenarios: question.scenarios };
    case 'multiple-choice':
      return { ...base, type: 'multiple-choice', options: question.options.map(o => o.text) };
    case 'checkbox-multi':
      return { ...base, type: 'checkbox-multi', options: question.options.map(o => o.text) };
    case 'slider':
      return { ...base, type: 'slider', sliderConfig: { minLabel: question.minLabel, maxLabel: question.maxLabel } };
    case 'slider-grid':
      return { ...base, type: 'slider-grid', skills: question.skills };
    case 'ranking':
      return { ...base, type: 'ranking', options: question.options };
    default:
      return { ...base, type: 'unknown' };
  }
}
