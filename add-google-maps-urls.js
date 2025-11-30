// Script to add Google Maps URLs to all existing colleges
// This will read the data files and add googleMapsUrl to colleges that don't have it

const fs = require('fs');
const path = require('path');

const files = [
    'src/lib/data.ts',
    'src/lib/new-colleges.ts'
];

files.forEach(filePath => {
    const absolutePath = path.join(__dirname, filePath);
    let content = fs.readFileSync(absolutePath, 'utf8');

    // Find all college objects with latitude and longitude but no googleMapsUrl
    // Pattern: latitude: NUMBER, longitude: NUMBER but no googleMapsUrl nearby

    // Add googleMapsUrl after longitude for colleges that don't have it
    // Look for pattern: longitude: NUMBER,\n (not followed by googleMapsUrl)
    content = content.replace(
        /latitude:\s*([-\d.]+),\s*\n\s*longitude:\s*([-\d.]+),(?!\s*\n\s*googleMapsUrl)/g,
        (match, lat, lon) => {
            return `latitude: ${lat},\n        longitude: ${lon},\n        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=${lat},${lon}',`;
        }
    );

    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`✅ Updated ${filePath}`);
});

console.log('\n🎉 All colleges now have Google Maps URLs!');
