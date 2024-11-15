# Sprint 4
**Name**: Jack Minehan
**Github ID**: jckmnhn
**Group Name**: Alternate Career Planner

## What you planned to do
- Update and finalize README.md
	- Issue #41
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/41
- Fix quiz results page to better present content
	- Issue #44
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/44
- Work with group to connect all backend features to frontend
	- Issue #38
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/38
- Fix visual bugs
	- Issue #43
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/43

## What you did not do
All planned items were completed.

## What problems you encountered
When changing the results page to more clearly present a suggested major, it was somewhat difficult because majors are passed in a different way than that view took parameters. This meant I had to change some of the parameters and their types for the content to appear.

## Issues you worked on 
- Update and finalize README.md
	- Issue #41
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/41
- Fix quiz results page to better present content
	- Issue #44
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/44
- Work with group to connect all backend features to frontend
	- Issue #38
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/38
- Fix visual bugs
	- Issue #43
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/43

## Files you worked on
README and license
- /README.md
- /LICENSE.md

Quiz results page
-  /alternate-career-planner/src/views/MajorsListView/MajorsListView.js

Connecting Python with group
- /alternate-career-planner/src/components/CourseList/CourseList.js
- /test_flask/app.py

Header Images
- /alternate-career-planner/public/assets/major-header-images/industrial-engineering-header.jpg
- /alternate-career-planner/public/assets/major-header-images/nuclear-engineering-header.jpg
- /alternate-career-planner/public/assets/major-header-images/computer-engineering-header.jpg

Other changes
- /alternate-career-planner/src/views/HomeScreen/HomeScreen.js
- /alternate-career-planner/src/views/CourseHistory/CourseHistory.js
- /alternate-career-planner/src/views/Home/Home.css
- /alternate-career-planner/src/components/MajorHeaderImage/MajorHeaderImage.js
- /alternate-career-planner/src/App.css

## What you accomplished
In this sprint, I added a complete README file, changed the results page to more clearly present a suggested major, worked with the group on connecting backend content to the frontend, and fixed some visual bugs.

For the updated README file, I created a header image using the logo and added a screenshot of the functional website. In addition to updating the project description, I added detailed installation and usage instructions with commands and prerequisites. I also added a section for the technologies we used and included badges. Additionally, I added a license file with a mention for the UTK assets, and I added this to the README.

Another issue I worked on during this sprint was to change the quiz results page to better present content. Previously, it only showed the name of the major with a list of all majors below, but it was somewhat unclear and difficult to navigate. Now, it is more clear by including more information about the suggested major and includes larger text.

Additionally, I worked on fixing some visual bugs and inconsistencies throughout the project. For example, some content was cut off and needed extra padding, and some font colors, weights, etc. were changed. I also copied more header images from the utk site for each major to have a completely unique image.

Lastly, I worked with the group to connect some backend features to the frontend UI. We spent several hours working on hosting a local server with flask to fetch data from the python code with React. I was successful in setting up this connection with getting course information from flask as a test, but we still need to finalize this before our presentation.
