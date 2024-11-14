# Sprint 4

* name: Ryan Perry
* github id: ryandavidperry
* group name: Alternate Career Planner

### What you planned to do
* Summarize a user's classes in a sidebar on the Course History View ([gh-42](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/42))
* Create a component to list a user's major recommendations on the Course History View ([gh-45](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/45)) 
* Display a user's progress through their major recommendations in the Course History View ([gh-46](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/46))

### What you did not do
* I completed every task I had planned for this sprint.

### What problems you encountered
* I encountered some problems adjusting the CSS styling for the courses table in the sidebar on the Course History View. I was completely inexperienced with editing the look of an HTML table before the start of this sprint. After I got over the intial learning curve, it was significantly easier to customize the table. I also had some issues getting the major descriptions to display for each of the user's recommendations on the Course History View. I had to follow a long string of nested functions and files to understand how the descriptions were being displayed elsewhere. However, this issue was largely due to underestimating the project's scope earlier in the semester.

### Issues you worked on
* I worked on [Issue #42](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/42), which was focused on creating a filterable sidebar to summarize a user's academic history on the Course History View.
* I worked on [Issue #45](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/45) and created a Top Majors Component that lists the user's top 3 recommended majors on the Course History view given an array from the backend.
* I worked on [Issue #46](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/46) and modified the Progress Bar Component I made in Sprint 1 to display a user's progress through each of their major recommendations given an array from the backend.

### Files you worked on
* /alternate-career-planner/src/components/CourseHistory/CourseHistory.css
* /alternate-career-planner/src/components/CourseHistory/CourseHistory.js 
* /alternate-career-planner/src/components/ProgressBar/ProgressBar.css
* /alternate-career-planner/src/components/ProgressBar/ProgressBar.js
* /alternate-career-planner/src/components/TopMajors/TopMajors.js
* /alternate-career-planner/src/views/CourseHistoryView/CourseHistory.css
* /alternate-career-planner/src/views/CourseHistoryView/CourseHistory.js
* /alternate-career-planner/src/views/Home/Home.js
* /alternate-career-planner/src/views/Quiz/Quiz.css

### What you accomplished
During this sprint, I created a sidebar to display a user's course history on the Course History View. The user can filter by 'All', 'In Progress', and 'Completed' courses. The title and grade received is displayed for each course in the selected category. The sidebar can scroll independently from the main content on the rest of the page.

I also created a Top Majors Component that displays the title, image, progress, description, and careers for each of the recommended majors on the Course History View. This component takes an array from the backend containing the user's top 3 majors and their progress through them. Right now, I pass an array of dummy majors. However, I will update this code as we make the final modifcations to our backend algorithm and server.

Finally, for this sprint I also modified the Progress Bar Component I created in Sprint 1. After receiving the top majors array from the backend, the components takes the progress for a course in the array to create a progress bar. This progress bar is diplayed for each of the user's recommended majors on the Course History View.
