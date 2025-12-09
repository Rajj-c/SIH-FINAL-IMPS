'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Quote, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SuccessStoriesSection() {
    const stories = [
        {
            name: "Kashish",
            quote: "\"From school dropout in a Delhi slum to class topper\"",
            story: "Kashish grew up in a Delhi slum where her parents often sent her back to the village to care for her sick grandmother. She skipped months of school and finally dropped out. A local NGO teacher convinced her parents, re-enrolled her in government school, and gave her remedial support. Step by step, she caught up with her classmates and is now one of the toppers in her class.",
            link: "https://www.cry.org/blog/topper-girl-kashishs-journey-from-being-a-school-dropout-to-topping-her-class/"
        },
        {
            name: "Shahid",
            quote: "\"He flipped barbeques by day, solved NEET questions by night\"",
            story: "Shahid is the son of a barbeque seller and grew up helping his father at the stall while money for coaching and books was always short. He joined a low-cost online coaching programme and studied whenever he found time, often after long work hours. His persistence paid off when he scored about 640 in NEET and earned an MBBS seat.",
            link: "https://blog.mtg.in/real-life-stories-of-students-who-overcame-challenges-achieved-success-in-cbse-neet-jee/"
        },
        {
            name: "V. Kathiresan",
            quote: "\"Once a school dropout and driver, now a PhD holder and college professor\"",
            story: "Kathiresan left school early to support his family and later worked as a driver for A. P. J. Abdul Kalam. Noticing his interest in reading, Kalam encouraged him to restart his education, helped him with English, and pushed him to keep studying. Over the years, he cleared his school exams, completed graduation, post-graduation, and finally a PhD. Today he teaches as an assistant professor in a government college.",
            link: "https://theteenagertoday.com/from-car-driver-to-professor/"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
                        Real Student Success Stories
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        They struggled too, but awareness changed everything
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {stories.map((story, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Card className="h-full p-8 hover:shadow-xl transition-shadow border-slate-100 flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{story.name}</h3>
                                <div className="mb-6 relative">
                                    <Quote size={20} className="text-green-500 absolute -top-3 -left-2 opacity-50 transform -scale-x-100" />
                                    <p className="text-green-700 font-semibold italic relative z-10 px-2 leading-relaxed">
                                        {story.quote}
                                    </p>
                                    <Quote size={20} className="text-green-500 absolute -bottom-3 -right-2 opacity-50" />
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                    {story.story}
                                </p>
                                <Button
                                    variant="outline"
                                    className="gap-2 text-green-600 border-green-200 hover:bg-green-50"
                                    onClick={() => window.open(story.link, '_blank')}
                                >
                                    <ExternalLink size={14} /> Read full story
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Grid */}
                <div className="mt-20 text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">What You Gain with Awareness</h3>
                    <p className="text-slate-500 mb-10 text-sm">Even if you don't like traditional studying</p>

                    <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
                        {[
                            { icon: "📖", title: "Access e-books & resources", desc: "Go through free learning materials and online resources" },
                            { icon: "🏛️", title: "Low-fee government colleges", desc: "Access seats in polytechnics and ITIs with fees as low as ₹5,000/year" },
                            { icon: "💰", title: "Free scholarships & hostel", desc: "Get financial support worth ₹1,00,000+ for your education" },
                            { icon: "⚡", title: "Skill development", desc: "Build practical skills that employers actually need" }
                        ].map((item, i) => (
                            <div key={i} className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex gap-4 items-start hover:bg-emerald-50 transition-colors">
                                <div className="text-2xl pt-1">{item.icon}</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
