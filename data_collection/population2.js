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

// Function to read CSV and invoke callback with data
function readCSV(filePath, callback) {
  const results = [];
  fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => callback(null, results))
      .on('error', (error) => callback(error));
}

// Load course data
function loadCourses(callback) {
  readCSV('database_design_CT.csv', (err, coursesData) => {
    if (err) {
      loadCoursesFromBackup(callback);
    } else {
      const courseObjects = {};
      for (const row of coursesData) {
        const courseId = row['Course ID'];
        const courseObject = new Course(
            courseId, row['Course'], row['Course Description'],
            row['Course Hours']);
        courseObjects[courseId] = courseObject;
      }
      console.log(courseObjects);
      callback(null, courseObjects);
    }
  });
}

function loadCoursesFromBackup(callback) {
  readCSV('data_collection/database_design_CT.csv', (err, coursesData) => {
    const courseObjects = {};
    for (const row of coursesData) {
      const courseId = row['Course ID'];
      const courseObject = new Course(
          courseId, row['Course'], row['Course Description'],
          row['Course Hours']);
      courseObjects[courseId] = courseObject;
    }
    console.log(courseObjects);
    callback(null, courseObjects);
  });
}

// Load major data
function loadMajors(callback) {
  readCSV('database_design_MT.csv', (err, majorsData) => {
    if (err) {
      loadMajorsFromBackup(callback);
    } else {
      const majorObjects = {};
      for (const row of majorsData) {
        const majorId = row['Major ID'];
        const majorObj = new Major(
            majorId, row['Major Abreviation'], row['Major Name'],
            row['Major Description']);
        majorObjects[majorId] = majorObj;
      }
      console.log(majorObjects);
      callback(null, majorObjects);
    }
  });
}

function loadMajorsFromBackup(callback) {
  readCSV('data_collection/database_design_MT.csv', (err, majorsData) => {
    const majorObjects = {};
    for (const row of majorsData) {
      const majorId = row['Major ID'];
      const majorObj = new Major(
          majorId, row['Major Abreviation'], row['Major Name'],
          row['Major Description']);
      majorObjects[majorId] = majorObj;
    }
    console.log(majorObjects);
    callback(null, majorObjects);
  });
}

// Load bucket data
function loadBuckets(callback) {
  readCSV('database_design_BT.csv', (err, bucketsData) => {
    if (err) {
      loadBucketsFromBackup(callback);
    } else {
      const bucketObjects = {};
      for (const row of bucketsData) {
        const bucketId = row['Bucket ID'];
        const bucketObj = new Bucket(
            bucketId, row['Bucket Name'], row['Course Names'],
            row['Bucket Number of Hours'], row['Bucket Number of Courses']);
        bucketObjects[bucketId] = bucketObj;
      }
      console.log(bucketObjects);
      callback(null, bucketObjects);
    }
  });
}

function loadBucketsFromBackup(callback) {
  readCSV('data_collection/database_design_BT.csv', (err, bucketsData) => {
    const bucketObjects = {};
    for (const row of bucketsData) {
      const bucketId = row['Bucket ID'];
      const bucketObj = new Bucket(
          bucketId, row['Bucket Name'], row['Course Names'],
          row['Bucket Number of Hours'], row['Bucket Number of Courses']);
      bucketObjects[bucketId] = bucketObj;
    }
    console.log(bucketObjects);
    callback(null, bucketObjects);
  });
}

// Process major requirements
function processMajorRequirements(
    majorRequirements, majorObject, courseObjects) {
  majorRequirements.forEach(row => {
    const bucketId = row['Required Bucket ID'];
    const courseId = row['Required Course ID'];
    const courseName = row['Required Course'];

    if (bucketId !== 'NULL') {
      majorObject.bucketIds.add(bucketId);
    } else if (courseId !== 'NULL') {
      majorObject.courseIds.add(courseId);
    } else if (courseName !== 'NULL') {
      const courseId = Object.values(courseObjects)
                           .find(course => course.name === courseName)
                           ?.courseId;
      if (courseId) {
        majorObject.courseIds.add(courseId);
      }
    }
  });

  console.log(majorObject.bucketIds);
  console.log(majorObject.courseIds);
}

// Main function to execute everything
function main() {
  loadCourses((err, courseObjects) => {
    if (err) {
      console.error('Error loading courses:', err);
      return;
    }

    loadMajors((err, majorObjects) => {
      if (err) {
        console.error('Error loading majors:', err);
        return;
      }

      loadBuckets((err, bucketObjects) => {
        if (err) {
          console.error('Error loading buckets:', err);
          return;
        }

        const majorKeys = ['1', '5', '10', '11'];
        majorKeys.forEach(majorKey => {
          const majorObject = majorObjects[majorKey];
          console.log(majorObject.name);

          const relativeFilename = `major_requirement_csvs/major_${
              parseInt(majorObject.majorId)}.csv`;
          const outsideFilename =
              `data_collection/major_requirement_csvs/major_${
                  parseInt(majorObject.majorId)}.csv`;
          console.log(relativeFilename);

          readCSV(relativeFilename, (err, majorRequirements) => {
            if (err) {
              readCSV(outsideFilename, (err, majorRequirements) => {
                if (!err) {
                  processMajorRequirements(
                      majorRequirements, majorObject, courseObjects);
                } else {
                  console.error('Error loading major requirements:', err);
                }
              });
            } else {
              processMajorRequirements(
                  majorRequirements, majorObject, courseObjects);
            }
          });
        });
      });
    });
  });
}

// Execute main function
main();
