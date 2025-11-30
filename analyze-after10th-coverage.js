// Script to analyze course coverage specifically for after_10th courses

const fs = require('fs');
const path = require('path');

// Read the data files
const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
const newCollegesPath = path.join(__dirname, 'src', 'lib', 'new-colleges.ts');

let dataContent = fs.readFileSync(dataPath, 'utf8');
let newCollegesContent = fs.readFileSync(newCollegesPath, 'utf8');

// Parse colleges with level field
const after10thPattern = /\{\s*id:\s*['"`]([^'"`]+)['"`],[\s\S]*?level:\s*['"`]after_10th['"`],[\s\S]*?courses:\s*\[([\s\S]*?)\]/g;

const after10thCourses = {};
const after10thColleges = [];

function extractAfter10thData(content) {
    const matches = content.matchAll(after10thPattern);
    for (const match of matches) {
        const collegeId = match[1];
        const coursesString = match[2];

        // Extract individual course names
        const courseMatches = coursesString.matchAll(/['"`]([^'"`]+)['"`]/g);
        for (const courseMatch of courseMatches) {
            const courseName = courseMatch[1].trim();
            if (courseName) {
                if (!after10thCourses[courseName]) {
                    after10thCourses[courseName] = [];
                }
                after10thCourses[courseName].push(collegeId);
            }
        }

        if (!after10thColleges.includes(collegeId)) {
            after10thColleges.push(collegeId);
        }
    }
}

extractAfter10thData(dataContent);
extractAfter10thData(newCollegesContent);

// Analyze results
const allAfter10thCourses = Object.keys(after10thCourses).sort();
const coursesWithLessThan3 = [];
const coursesWithExactly3 = [];
const coursesWithMoreThan3 = [];

for (const course of allAfter10thCourses) {
    const colleges = after10thCourses[course];
    const count = colleges.length;
    if (count < 3) {
        coursesWithLessThan3.push({ course, count, colleges });
    } else if (count === 3) {
        coursesWithExactly3.push({ course, count, colleges });
    } else {
        coursesWithMoreThan3.push({ course, count, colleges });
    }
}

// Generate report
console.log('='.repeat(80));
console.log('AFTER 10TH COURSE COVERAGE ANALYSIS');
console.log('='.repeat(80));
console.log(`\nTotal after_10th colleges: ${after10thColleges.length}`);
console.log(`Total unique after_10th courses: ${allAfter10thCourses.length}`);
console.log(`Courses offered by < 3 colleges: ${coursesWithLessThan3.length}`);
console.log(`Courses offered by exactly 3 colleges: ${coursesWithExactly3.length}`);
console.log(`Courses offered by > 3 colleges: ${coursesWithMoreThan3.length}`);

if (coursesWithLessThan3.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('AFTER 10TH COURSES WITH LESS THAN 3 COLLEGES:');
    console.log('='.repeat(80));
    coursesWithLessThan3.forEach(({ course, count, colleges }) => {
        console.log(`\n  📚 ${course}`);
        console.log(`     Offered by: ${count} college${count > 1 ? 's' : ''}`);
        console.log(`     Colleges: ${colleges.join(', ')}`);
    });
}

if (coursesWithExactly3.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('AFTER 10TH COURSES WITH EXACTLY 3 COLLEGES:');
    console.log('='.repeat(80));
    coursesWithExactly3.forEach(({ course, count }) => {
        console.log(`  ✓ ${course} (${count} colleges)`);
    });
}

if (coursesWithMoreThan3.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('AFTER 10TH COURSES WITH MORE THAN 3 COLLEGES:');
    console.log('='.repeat(80));
    coursesWithMoreThan3.forEach(({ course, count }) => {
        console.log(`  ✓ ${course} (${count} colleges)`);
    });
}

console.log('\n' + '='.repeat(80));
console.log('SUMMARY:');
console.log('='.repeat(80));
if (coursesWithLessThan3.length === 0) {
    console.log('✅ ALL after_10th courses are offered by at least 3 colleges!');
} else {
    console.log(`❌ ${coursesWithLessThan3.length} after_10th courses need more colleges.`);
    console.log(`   Estimated colleges to add: ${coursesWithLessThan3.length * 2 - coursesWithLessThan3.reduce((sum, c) => sum + c.count, 0)}`);
}
console.log('='.repeat(80));

// Write detailed report to file
const report = {
    totalAfter10thColleges: after10thColleges.length,
    totalCourses: allAfter10thCourses.length,
    summary: {
        lessThan3: coursesWithLessThan3.length,
        exactly3: coursesWithExactly3.length,
        moreThan3: coursesWithMoreThan3.length
    },
    coursesNeedingColleges: coursesWithLessThan3,
    coursesWithExactly3,
    coursesWithMoreThan3
};

fs.writeFileSync('after10th-analysis-report.json', JSON.stringify(report, null, 2));
console.log('\nDetailed report saved to: after10th-analysis-report.json');
