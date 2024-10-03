# Sprint 1
**Name**: Jack Minehan
**Github ID**: jckmnhn
**Group Name**: Alternate Career Planner

## What you planned to do
- Enter all computer science courses, descriptions, and requirements into spreadsheets
	- Issue #4
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/4
- Create a view containing a list of similar majors
	- Issue #3
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/3
- The original plan was to create a mockup in Figma for a view containing details of a major and a list of its courses, but after the first week I also built this into a fully functional view with code.
	- Issue #2, Issue #7
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/2
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/7
## What you did not do
All planned items were completed.

## What problems you encountered
Entering data into the various spreadsheets was long and somewhat confusing, for the current design did not account for courses that have a requirement of selecting more than one out of a number of courses. We will likely simplify our project to account for this unforeseen complexity.

## Issues you worked on 
- Enter all computer science courses, descriptions, and requirements into spreadsheets
	- Issue #4
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/4
- Created a view containing a list of similar majors
	- Issue #3
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/3
- Created both a mockup and working code for a view containing details of a major and a list of its courses
	- Issue #2, #7
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/2
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/7

## Files you worked on
Planning and Figma Mockup
- /planning/Design Prototypes/MajorDetailView Designs/ImagePrototype.png
- /planning/Design Prototypes/MajorDetailView Designs/README.md
- /planning/Design Prototypes/MajorDetailView Designs/SimilarMajorsPrototype.png
- /planning/Design Prototypes/MajorDetailView Designs/SimplePrototype.png
- /planning/InterestQuizQuestions/QuizQuestions.md

Data Entry of all COSC courses, requirements, descriptions
- /data_collection/database_design.xlsx

Detailed View of Major
- /alternate-career-planner/src/components/CourseList/CourseList.stories.js
- /alternate-career-planner/src/components/CourseList/CourseList.js
- /alternate-career-planner/src/components/CourseList/CourseList.css
- /alternate-career-planner/src/components/MajorHeaderImage/MajorHeaderImage.js
- /alternate-career-planner/src/components/MajorHeaderImage/MajorHeaderImage.css
- /alternate-career-planner/src/components/MajorList/MajorList.css
- /alternate-career-planner/src/components/MajorList/MajorList.js
- /alternate-career-planner/src/components/MajorList/MajorList.stories.js
- /alternate-career-planner/src/views/MajorDetailView/MajorDetailView.css
- /alternate-career-planner/src/views/MajorDetailView/MajorDetailView.js
- /alternate-career-planner/src/views/MajorDetailView/MajorDetailView.stories.js

View of Similar Majors
- /alternate-career-planner/src/components/MajorList/MajorList.css
- /alternate-career-planner/src/components/MajorList/MajorList.js
- /alternate-career-planner/src/components/MajorList/MajorList.stories.js
- /alternate-career-planner/src/views/MajorsListView/MajorsListView.css
- /alternate-career-planner/src/views/MajorsListView/MajorsListView.js
- /alternate-career-planner/src/views/MajorsListView/MajorsListView.stories.js
## What you accomplished
In this sprint, I created two views: a view displaying details of a major and a view displaying a list of majors. In both of these views, I am using the UT colors to match the school's theme.

In the view displaying details of a major, including its description, I made a component displaying a list of courses, their descriptions, and course hours. At the top of this view, there is a unique header image for each major (pulled from the UTK website for the corresponding major). I originally crafted this view's UI in Figma, and I created this view based on that mockup.

In the view displaying a list of majors, each major is listed with its description. The top of the page displays a small welcome message stating that the majors below are likely to be similar to their selected preferences, as this will be a view displayed after the user completes a brief interest quiz. It also features a transform effect when hovering over majors in the list.

Additionally, I entered each course, requirement, and description for the UTK computer science major into a spreadsheet that will later be exported to a csv file. As I was one of the first to enter data into the spreadsheet, I also had to manually find many general engineering courses, their credit hours, and descriptions to enter them into the spreadsheets. This processed involved creating data in three different tables.

