/* FileHandler.js
 * Description: Parses the academic history file and 
 * stores each course in the coursesTaken array.
 */

import Course from './Course';

export let coursesTaken = [];

export const parseCourseContent = (content) => {
    const even = 'class="even">';
    const odd = 'class="odd">';
    let courseBlock = '';
    coursesTaken = [];

    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes(even) || line.includes(odd)) {
            courseBlock += line + '\n';
            for (let j = 0; j < 30; j++) {
                if (i + 1 < lines.length) {
                    courseBlock += lines[++i] + '\n';
                } else {
                    break;
                }
            }
            const newCourse = new Course();
            newCourse.setCourseInfo(courseBlock);
            coursesTaken.push(newCourse);
            // Reset the course block for the next coures
            courseBlock = '';
        }
    }
    localStorage.setItem('coursesTaken', JSON.stringify(coursesTaken));
};

