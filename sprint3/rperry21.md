# Sprint 3

* name: Ryan Perry
* github id: ryandavidperry
* group name: Alternate Career Planner

### What you planned to do
* Interpret the user's quiz responses to determine their ideal major ([gh-29](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/29))
* Allow the user to upload their academic history file on the home screen ([gh-30](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/30)) 
* Error check the user's uploaded file ([gh-32](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/32))

### What you did not do
* I completed every task I had planned for this sprint.

### What problems you encountered
* I had some problems deciding on the quiz algorithm, but I eventually decided to create branching paths depending on how the user answered each question. I also encountered some issues when rewriting my parsing program in JavaScript so that it could be use with React. However, I have grown more comfortable with JavaScript throughout the course of this project, so I resolved the issues relatively quickly. I also encountered a few issues when error checking the user's uploaded file. I had not used regular expressions in JavaScript prior to this sprint.

### Issues you worked on
* I worked on [Issue #29](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/29), which was focused on determining the user's ideal major based on their quiz responses. The quiz consists of a few different questions and can easily be expanded to include more. The answer choices differ depending on which branch the user follows after answering each question. Upon completing the quiz, the majors will be narrowed down to the option the user is most likely to enjoy. This major is displayed at the top of the quiz results screen.
* I worked on [Issue #30](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/30) and implemented the funcitonality of the upload button on the website's home screen. Upon uploading a file of the correct type, the user's course history is parsed from the file and displayed on the course results screen. This screen is still a work in progress.
* I worked on [Issue #32](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/32), which error checks the user's uploaded file. The website ensures that the filetype is HTML and also checks for  valid course codes, number of credit hours, and grades. The website does not accept the file until these conditions are met.

### Files you worked on
* /alternate-career-planner/src/App.js
* /alternate-career-planner/src/components/CourseHistory/CourseHistory.js
* /alternate-career-planner/src/components/FileUploader/Course.js
* /alternate-career-planner/src/components/FileUploader/FileHandler.js
* /alternate-career-planner/src/components/FileUploader/FileUploader.js
* /alternate-career-planner/src/components/Header/Header.js
* /alternate-career-planner/src/components/QuizComp/QuizComp.js
* /alternate-career-planner/src/components/QuizComp/quizdata2.js
* /alternate-career-planner/src/views/CompletedCoursesView/CompletedCoursesView.js 
* /alternate-career-planner/src/views/CourseHistoryView/CourseHistory.js
* /alternate-career-planner/src/views/Home/Home.css
* /alternate-career-planner/src/views/Home/Home.js
* /alternate-career-planner/src/views/MajorsListView/MajorsListView.js

### What you accomplished
During this sprint, I interpreted the user's responses to the career interest quiz. The quiz features a few questions with answer choices that change depending on how you answered the previous question(s). Upon completing the quiz, the major that the user is most likely to enjoy is displayed at the top of the quiz results screen. For this to work, I expanded the quiz componenet I wrote during the previous sprint. The questions are drawn from the quiz data file in the same directory.

I also implemented a functional upload file button on the home screen. After clicking this button, the user is prompted to upload their academic history file that can be downloaded from UTK's DARS. Upon uploading, the user's course history is parsed from the file and stored locally as a JSON string. The user is also redirected to the course history screen which is still a work in progress.

Finally, in this sprint I implemented error checking for the user's uploaded file. This code ensures that the user provides an HTML file. It also checks to see if the file contains a valid course code, number of credit hours, and grade for each course in the file. If the uploaded file does not meet the required specifications, the website prompts the user to upload another file.
