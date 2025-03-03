# Sprint 1

* name: Ryan Perry
* github id: ryandavidperry
* group name: Alternate Career Planner

### What you planned to do
* Parse the user's academic history file to extract information about the user's completed classes ([gh-1](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/1))
* Create a screen to display the user's progress through their delcared major ([gh-5](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/5)) 
* Add mechanical and aerospace engineering courses to database CSVs ([gh-6](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/6))

### What you did not do
* I was unable to integrate my C++ code with react. 
* I was unable to display real user data without the necessary backend logic. 

### What problems you encountered
* The code I have written to parse the user's academic history file is in C++. When the sprint began, I planned to integrate this code with react. I soon realized it would be better to write the backend logic in Java. However, I am unfamiliar with Java and could not make this conversion during the sprint.

### Issues you worked on
* I worked on [Issue #1](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/1), which was focused on parsing the user's academic history file that is generated by UTK's DARS. This program stores course objects for a user's completed classes in a vector.
* I worked on [Issue #5](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/5) and created a screen to display the user's progress through their delcared major. Right now, this screen is filled with dummy data, but it will be populated with real data when we can parse the user's academic history file.
* I worked on [Issue #6](https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/6) and added the aerospace and mechanical engineering course requirements to our database CSVs.

### Files you worked on
* /alternate-career-planner/src/components/ProgressBar/ProgressBar.css
* /alternate-career-planner/src/components/ProgressBar/ProgressBar.js
* /alternate-career-planner/src/views/CompletedCoursesView/CompletedCoursesView.css
* /alternate-career-planner/src/views/CompletedCoursesView/CompletedCoursesView.js
* /c_parsing/README.md
* /c_parsing/main.cpp
* /c_parsing/parsing.cpp
* /c_parsing/parsing.h
* [database](https://docs.google.com/spreadsheets/d/1396Llo6YEQW1FxGvkfRYii44ywH6aEHaIX0b-_4ZzOM/edit?gid=597996709#gid=597996709)/Major Table
* [database](https://docs.google.com/spreadsheets/d/1396Llo6YEQW1FxGvkfRYii44ywH6aEHaIX0b-_4ZzOM/edit?gid=597996709#gid=597996709)/Bucket Table
* [database](https://docs.google.com/spreadsheets/d/1396Llo6YEQW1FxGvkfRYii44ywH6aEHaIX0b-_4ZzOM/edit?gid=597996709#gid=597996709)/Course Table
* [database](https://docs.google.com/spreadsheets/d/1396Llo6YEQW1FxGvkfRYii44ywH6aEHaIX0b-_4ZzOM/edit?gid=597996709#gid=597996709)/PreReq/CoReq Table
* [database](https://docs.google.com/spreadsheets/d/1396Llo6YEQW1FxGvkfRYii44ywH6aEHaIX0b-_4ZzOM/edit?gid=597996709#gid=597996709)/AE - ID 4
* [database](https://docs.google.com/spreadsheets/d/1396Llo6YEQW1FxGvkfRYii44ywH6aEHaIX0b-_4ZzOM/edit?gid=597996709#gid=597996709)/ME - ID 9

### What you accomplished
During this sprint, I reworked and expanded the academic history file parsing program I developed for the helloplus assignment. I separated the interface from the implementation and shifted the paradigm from functional programming to object-oriented programming. I extracted the course code, credit hours, grade, and course title from each of the courses the user has taken or is currently taking. I stored each course object in a vector for easy access.

I also created the Completed Courses View for the react webpage. This view displays a custom progress bar component that can be incremented or reset with a button press. This view also displays a list of example courses the student has taken. The view shows the course code, title, description, grade, and credit hours for each of the courses in the list. Right now, this view uses example data, but it will show real course data when we have implemented an appropriate backend. This view will show the user how much of their delcared major they have completed.

I also entered course data from UTK's aerospace and mechanical engineering catalogs into our external [database](https://docs.google.com/spreadsheets/d/1396Llo6YEQW1FxGvkfRYii44ywH6aEHaIX0b-_4ZzOM/edit?gid=773606674#gid=773606674). This involved manually inserting required courses and their corresponding course codes, credit hours, descriptions, groupings, pre-requisites, and co-requisites for both of these majors. I completed the AE - ID 4 and ME - ID 9 sheets. I also contributed portions of data to the Major Table, Bucket Table, Course Table, and PreReq/CoReq Table.
