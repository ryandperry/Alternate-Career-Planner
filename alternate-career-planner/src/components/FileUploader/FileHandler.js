/* FileHandler.js
 * Description: Parses the academic history file and 
 * stores each course in the coursesTaken array.
 */

import Course from './Course';

export let coursesTaken = [];

export const parseCourseContent = (content) => {
    return new Promise((resolve, reject) => {
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
                if (newCourse.setCourseInfo(courseBlock)) {
                    coursesTaken.push(newCourse);
                }
                // Reset the course block for the next coures
                courseBlock = '';
            }
        }
        localStorage.setItem('coursesTaken', JSON.stringify(coursesTaken));

        // Send couresTaken to backend
        fetch("http://localhost:5000/RyanData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coursesTaken)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const largeInput = JSON.stringify(data);
                const filteredInput = data.filter(
                    (item) => item["First Match"] || item["Second Match"] ||
                    item["Third Match"]
                );
                const transformedJSON = filteredInput.map(match => {
                    const key = Object.keys(match)[0];
                    const { Name, Percent } = match[key];

                    return {
                        title: Name,
                        progress: Percent * 100
                    };
                });

                localStorage.setItem('backendMajors', JSON.stringify(transformedJSON));
                resolve();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:',
                    error);
                reject(error);
            });
    });
};
