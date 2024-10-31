/* Course.js
 * Description: Implements the Course class.
 */

class Course {
  constructor() {
    this.courseCode = '';
    this.creditHours = 0;
    this.grade = '';
    this.title = '';
  }

  /*
   * Returns a Course's course code.
   */
  getCourseCode() {
    return this.courseCode;
  }

  /*
   * Returns a Course's credit hours.
   */
  getCreditHours() {
    return this.creditHours;
  }

  /*
   * Returns a Course's grade.
   */
  getGrade() {
    return this.grade;
  }

  /*
   * Returns a Course's title.
   */
  getTitle() {
    return this.title;
  }

  /*
   * Sets a Course's member variables given
   * an unformatted course block.
   */
  setCourseInfo(block) {
    const lines = block.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (i === 13) { // Course code line
        this.courseCode = line.replace(/\s+/g, '')
          .replace(/([A-Z]+)([0-9]+)/, '$1 $2');
      } else if (i === 18) { // Credit hours line
        this.creditHours = parseFloat(line);
      } else if (i === 23) { // Grade line
        this.grade = line;
      } else if (i === 28) { // Title line
        this.title = line;
      }
    }
  }
}

export default Course;

