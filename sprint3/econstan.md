# Sprint 3
Emily Constantin
e4met
Alternate Carreer Planner

### What you planned to do
* add the prereqs to the course objects (Issue #27) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/27 
* write the bucket processing python code (Issue #26) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/26
* finialize the database (Issue #22) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/22
* work on algorithm processing code with beatrice (Issue #31) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/31


### What you did not do
* finialize the database (Issue #22) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/22
I cleaned up a lot and worked on this, but not completely done


### What problems you encountered
We had to re-structure some of our classes for the processing code because after "finishing" it, we realized a lot of the data from the buckets was lost and the course IDs werent holding enough names. So I focused more time on the data processing code. Also, part of finalizing the database meant cleaning up past work that wasn't correct and marking down instances where logic needed to be hardcoded. Which we still have more work to do on.

### Issues you worked on
* add the prereqs to the course objects (Issue #27) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/27 
* write the bucket processing python code (Issue #26) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/26
* finialize the database (Issue #22) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/22
* work on algorithm processing code with beatrice (Issue #31) https://github.com/utk-cs340-fall24/Alternate-Career-Planner/issues/31

### Files you worked on
* data_collection/major_requirements_csvs/*
* data_collection/population_ec.py
* data_collection/population.py
* data_collection/database.xlsx

### What you accomplished
I successfully added code to add the prereqs and coreqs for each course. I did some code cleanup from last sprint because i didn't realize there were some bugs. I went through our "database" aka big excel sheet and marked everything that wasnt finished yet. As part of the cleanup task, I fixed some errors in the connections between bucket, course, and major requirements tables. i also added code to process nested buckets properly and decided which major requirements (like tech electives) will have to be hardcoded (to do next sprint). 