# Sprint 2
Emily Constantin
e4met
Alternate Career Planner

### What you planned to do
issue 1: begin code to populate the database (working with beatrice) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/14 
issue 2: input industrial engineering data into the database https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/13
issue 3: make academic history screen (a table that has course names and letter grades)

### What you did not do
* academic history screen - i was supposed to make a react.js view with a table that displayed course objects (names and letter grades)

### What problems you encountered
* my vs code wasnt set up to use python yet so that took some time
* beatrice and i met for an hour to plan out the code and we ended up needing 2.5 hours to talk it through, get vs code interactive window working, and i had to see Manan for help with installing pandas
* i tried to work on a screen view in storybook and got blocked quickly because i didnt realize that i had never installed npm - so storybook couldnt run
* then i got blocked again by the react tutorials because they used css and js files but not the storybook
* i gave my screen to kale since he didnt have enough work and I was stuck
* the database excels used numbers and in order to have unique keys in the class objects, i had to re-export every page to excel and change all the datatypes to strings

### Issues you worked on
issue 1: begin code to populate the database https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/14 
issue 2: input industrial engineering data into the database https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/13

### Files you worked on
* data_collection/population.py
* data_collection/population_ec.py
* data_collection/major_requirement_csvs/major_11.csv 
* data_collection/database_design.xlsx (IE major ID 8)
* alternate-career-planner/src/views/AcademicHistoryView.css
* alternate-career-planner/src/views/AcademicHistoryView.stories.js
* alternate-career-planner/src/views/AcademicHistoryView.js

### What you accomplished
This sprint, i worked with beatrice on a script that will make bucket, course, and major objects from our excel sheets. My part of the code was the bottom-most for loop that goes through each csv that hold major requirements and fills in the specific courses and bucket requirements lists in the major object. I got set up with python, pandas, and storybook. I cleaned up our "database" and added all the requirements for the industrial engineering major. i also went through the data and found places where we need to clean up before reading it in to our comparison algorithm. I realized my limitations on react and im prepared to learn more about that from kale on the next sprint.
