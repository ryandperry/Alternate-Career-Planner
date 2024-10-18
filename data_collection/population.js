const fs = require('fs');
const csv = require('csv-parser');

class Major {
    constructor(majorId, abbr, name, description) {
        this.majorId = majorId;
        this.abbr = abbr;
        this.name = name;
        this.description = description;
        this.courseIds = new Set();
        this.bucketIds = new Set();
    }
}

class Course {
    constructor(courseId, name, description, hours) {
        this.courseId = courseId;
        this.name = name;
        this.description = description;
        this.hours = hours;
    }
}

class Bucket {
    constructor(bucketId, name, courseNames, numHours, numCourses) {
        this.bucketId = bucketId;
        this.name = name;
        this.courseNames = courseNames;
        this.numHours = numHours;
        this.numCourses = numCourses;
    }
}

// Function to read CSV and return a promise with data
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
}

// Read course data
async function loadCourses() {
    try {
        const coursesData = await readCSV('database_design_CT.csv');
        const courseObjects = {};
        for (const row of coursesData) {
            const courseId = row['Course ID'];
            const courseObject = new Course(courseId, row['Course'], row['Course Description'], row['Course Hours']);
            courseObjects[courseId] = courseObject;
        }
        console.log(courseObjects);
        return courseObjects;
    } catch {
        return loadCoursesFromBackup();
    }
}

async function loadCoursesFromBackup() {
    const coursesData = await readCSV('data_collection/database_design_CT.csv');
    const courseObjects = {};
    for (const row of coursesData) {
        const courseId = row['Course ID'];
        const courseObject = new Course(courseId, row['Course'], row['Course Description'], row['Course Hours']);
        courseObjects[courseId] = courseObject;
    }
    console.log(courseObjects);
    return courseObjects;
}

// Read major data
async function loadMajors() {
    try {
        const majorsData = await readCSV('database_design_MT.csv');
        const majorObjects = {};
        for (const row of majorsData) {
            const majorId = row['Major ID'];
            const majorObj = new Major(majorId, row['Major Abreviation'], row['Major Name'], row['Major Description']);
            majorObjects[majorId] = majorObj;
        }
        console.log(majorObjects);
        return majorObjects;
    } catch {
        return loadMajorsFromBackup();
    }
}

async function loadMajorsFromBackup() {
    const majorsData = await readCSV('data_collection/database_design_MT.csv');
    const majorObjects = {};
    for (const row of majorsData) {
        const majorId = row['Major ID'];
        const majorObj = new Major(majorId, row['Major Abreviation'], row['Major Name'], row['Major Description']);
        majorObjects[majorId] = majorObj;
    }
    console.log(majorObjects);
    return majorObjects;
}

// Read bucket data
async function loadBuckets() {
    try {
        const bucketsData = await readCSV('database_design_BT.csv');
        const bucketObjects = {};
        for (const row of bucketsData) {
            const bucketId = row['Bucket ID'];
            const bucketObj = new Bucket(bucketId, row['Bucket Name'], row['Course Names'], row['Bucket Number of Hours'], row['Bucket Number of Courses']);
            bucketObjects[bucketId] = bucketObj;
        }
        console.log(bucketObjects);
        return bucketObjects;
    } catch {
        return loadBucketsFromBackup();
    }
}

async function loadBucketsFromBackup() {
    const bucketsData = await readCSV('data_collection/database_design_BT.csv');
    const bucketObjects = {};
    for (const row of bucketsData) {
        const bucketId = row['Bucket ID'];
        const bucketObj = new Bucket(bucketId, row['Bucket Name'], row['Course Names'], row['Bucket Number of Hours'], row['Bucket Number of Courses']);
        bucketObjects[bucketId] = bucketObj;
    }
    console.log(bucketObjects);
    return bucketObjects;
}

// Main function to execute everything
async function main() {
    const courseObjects = await loadCourses();
    const majorObjects = await loadMajors();
    const bucketObjects = await loadBuckets();

    for (const majorKey of ['1', '5', '10', '11']) {
        const majorObject = majorObjects[majorKey];
        console.log(majorObject.name);

        const relativeFilename = `major_requirement_csvs/major_${parseInt(majorObject.majorId)}.csv`;
        const outsideFilename = `data_collection/major_requirement_csvs/major_${parseInt(majorObject.majorId)}.csv`;
        console.log(relativeFilename);

        try {
            const majorRequirements = await readCSV(relativeFilename);
            processMajorRequirements(majorRequirements, majorObject, courseObjects);
        } catch {
            const majorRequirements = await readCSV(outsideFilename);
            processMajorRequirements(majorRequirements, majorObject, courseObjects);
        }
    }
}

// Process major requirements
function processMajorRequirements(majorRequirements, majorObject, courseObjects) {
    majorRequirements.forEach(row => {
        const bucketId = row['Required Bucket ID'];
        const courseId = row['Required Course ID'];
        const courseName = row['Required Course'];

        if (bucketId !== "NULL") {
            majorObject.bucketIds.add(bucketId);
        } else if (courseId !== "NULL") {
            majorObject.courseIds.add(courseId);
        } else if (courseName !== "NULL") {
            const courseId = Object.values(courseObjects).find(course => course.name === courseName)?.courseId;
            if (courseId) {
                majorObject.courseIds.add(courseId);
            }
        }
    });

    console.log(majorObject.bucketIds);
    console.log(majorObject.courseIds);
}

// Execute main function
main();
