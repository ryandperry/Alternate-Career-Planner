# Data Entry Guide and Instructions

### Set up space in the database
Create a new sheet in the database to make a table for your major.

The main table will be a concatenation of all major-specific tables
Add your major to the Major Table (the list of all majors)

### Collect Catalog Information
Navigate to the 2023-2024 course catalog
Locate the major under ‘majors A-Z’ (normal major, not honors or 5 year MS)
*https://catalog.utk.edu/preview_program.php?catoid=43&poid=25821#C
*Make sure the drop down menu at the top says 2023-2024
*Open the suggested catalog PDF for the major
**https://tickle.utk.edu/wp-content/uploads/2022/11/Computer-Engineering-2023.pdf 
*DARS is currently broken, do not use DARS for this

### Fill in tables with information
Start with the single classes that are listed in the utrack
*Add each class (and honors version) to the course table with the same course ID

When you reach a collection of more than 1 courses (we're calling them buckets), add the collection as a new bucket to the bucket table
Link your major to the bucket by listing the major and bucket together in your major-specific table
Ignore VolCore (general education) requirements
*if you aren't sure if something is general education (vol core) or specific to tickle engineering, add it anyway

### CSVs
CSV's are comma seperated, so when you list multiple courses, use a semicolon
when youre finished with your major-specific table, export the individual sheet as a csv and commit to github
all other sheets will be exported in the end


