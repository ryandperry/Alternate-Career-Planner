# Sprint 3
**Name**: Jack Minehan
**Github ID**: jckmnhn
**Group Name**: Alternate Career Planner

## What you planned to do
- Enter all electrical engineering courses, descriptions, and requirements into spreadsheets
	- Issue #28
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/28
- Connect quiz results to post-quiz navigation
	- Issue #25
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/25
- Create navigation links for sidebar + header
	- Issue #21
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/21

## What you did not do
All planned items were completed.

## What problems you encountered
Some of the spacing/padding on the web pages needed fixing after connecting pages together. I have since fixed this issue. I also needed to uniquely encode each major name as a url, since they contained spaces.

## Issues you worked on 
- Enter all electrical engineering courses, descriptions, and requirements into spreadsheets
	- Issue #28
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/28
- Connect quiz results to post-quiz navigation
	- Issue #25
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/25
- Create navigation links for sidebar + header
	- Issue #21
	- https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/21

## Files you worked on
- MajorHeaderImage.css
- ResultsView.js
- MajorsListView.css
- App.js
- MajorList.css
- MajorDetailView.js
- CourseList.js
- ResultsView.css
- NavigationBar.js
- Header.js
- NavigationBar.css
- JobsList.js
- MajorsListView.js
- MajorHeaderImage.js

Data Entry
- course_table.csv
- bucket_table.csv
- major_3.csv

## What you accomplished
In this sprint, I added all electrical engineering courses and requirements into the data sheets, created navigation links for the sidebar and header, and connected the quiz results page to post-quiz navigation.

To connect the quiz results page to further navigation, I created a results page to wrap views in both the sidebar and the header. This was necessary because only the views after the initial quiz require a sidebar. Additionally, the header link after the quiz needed to link back to the results, since going back to the first page would cause the user to lose their progress. After linking the results page to the finish button on the quiz, I added all majors and their descriptions from the UTK catalog, which all link to their respective pages.

After linking these pages, there were still many broken links that needed to go to individual pages. I changed the sidebar to highlight the currently selected page in orange, and any linked content after the results page now shows within the bounds of the sidebar and header. To properly link each major programmatically, I had to encode the major name as a URL to replace spaces and special characters. I also fixed the retake and view results buttons to properly go to their respective pages. 

Additionally, I added all electrical engineering courses, requirements, and descriptions into spreadsheets that will be used in serving data to find the most overlap among a user's courses and other majors. This involved manually finding many general engineering courses along with their credit hours and descriptions to enter them into three different spreadsheets.