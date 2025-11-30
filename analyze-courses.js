// Script to analyze course coverage across colleges

const fs = require('fs');
const path = require('path');

// Read the data files
const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
const newCollegesPath = path.join(__dirname, 'src', 'lib', 'new-colleges.ts');

let dataContent = fs.readFileSync(dataPath, 'utf8');
let newCollegesContent = fs.readFileSync(newCollegesPath, 'utf8');

// Extract colleges array from both files
// This is a simplified parser - we'll extract course arrays manually

// Parse courses from the content
const coursePattern = /courses:\s*\[([\s\S]*?)\]/g;
const courseCounts = {};

function extractCourses(content) {
    const matches = content.matchAll(coursePattern);
    for (const match of matches) {
        const coursesString = match[1];
        // Extract individual course names
        const courseMatches = coursesString.matchAll(/['"`]([^'"`]+)['"`]/g);
        for (const courseMatch of courseMatches) {
            const courseName = courseMatch[1].trim();
            if (courseName) {
                courseCounts[courseName] = (courseCounts[courseName] || 0) + 1;
            }
        }
    }
}

extractCourses(dataContent);
extractCourses(newCollegesContent);

// Analyze results
const allCourses = Object.keys(courseCounts).sort();
const coursesWithLessThan3 = [];
const coursesWithExactly3 = [];
const coursesWithMoreThan3 = [];

for (const course of allCourses) {
    const count = courseCounts[course];
    if (count < 3) {
        coursesWithLessThan3.push({ course, count });
    } else if (count === 3) {
        coursesWithExactly3.push({ course, count });
    } else {
        coursesWithMoreThan3.push({ course, count });
    }
}

// Generate report
console.log('='.repeat(80));
console.log('COURSE COVERAGE ANALYSIS');
console.log('='.repeat(80));
console.log(`\nTotal unique courses: ${allCourses.length}`);
console.log(`Courses offered by < 3 colleges: ${coursesWithLessThan3.length}`);
console.log(`Courses offered by exactly 3 colleges: ${coursesWithExactly3.length}`);
console.log(`Courses offered by > 3 colleges: ${coursesWithMoreThan3.length}`);

if (coursesWithLessThan3.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('COURSES WITH LESS THAN 3 COLLEGES:');
    console.log('='.repeat(80));
    coursesWithLessThan3.forEach(({ course, count }) => {
        console.log(`  • ${course} (${count} college${count > 1 ? 's' : ''})`);
    });
}

console.log('\n' + '='.repeat(80));
console.log('SAMPLE OF WELL-COVERED COURSES (>3 colleges):');
console.log('='.repeat(80));
coursesWithMoreThan3.slice(0, 20).forEach(({ course, count }) => {
    console.log(`  • ${course} (${count} colleges)`);
});

console.log('\n' + '='.repeat(80));
console.log('SUMMARY:');
console.log('='.repeat(80));
if (coursesWithLessThan3.length === 0) {
    console.log('✅ ALL COURSES are offered by at least 3 colleges!');
} else {
    console.log(`❌ ${coursesWithLessThan3.length} courses are offered by fewer than 3 colleges.`);
}
console.log('='.repeat(80));

// Write detailed report to file
const report = {
    totalCourses: allCourses.length,
    summary: {
        lessThan3: coursesWithLessThan3.length,
        exactly3: coursesWithExactly3.length,
        moreThan3: coursesWithMoreThan3.length
    },
    coursesWithLessThan3,
    coursesWithExactly3,
    coursesWithMoreThan3
};

fs.writeFileSync('course-analysis-report.json', JSON.stringify(report, null, 2));
console.log('\nDetailed report saved to: course-analysis-report.json');
