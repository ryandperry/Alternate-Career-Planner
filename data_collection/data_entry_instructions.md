# Data Entry Guide and Instructions

### Set up space in the database
Create a new sheet in the database called 'Major Abreviation - ID #' to make a table for your major.
* https://docs.google.com/spreadsheets/d/1396Llo6YEQW1FxGvkfRYii44ywH6aEHaIX0b-_4ZzOM/edit?usp=sharing 
* the ID number for each major can be found in the Majors Table
* Example: new sheet called CS - ID 1

The main table will be a code-generated concatenation of all major-specific tables.
We don't modify the main table manually.

### Collect Catalog Information
Navigate to the 2023-2024 course catalog

Locate the major under ‘majors A-Z’ 
* https://catalog.utk.edu/preview_program.php?catoid=43&poid=25821#C
* Make sure the drop down menu at the top says 2023-2024
* If availible, open the suggested catalog PDF for the major
* * https://tickle.utk.edu/wp-content/uploads/2022/11/Computer-Engineering-2023.pdf 
* DARS is currently broken, do not use DARS for this
* We're only doing normal majors, not honors or 5 year MS

### Fill in tables with information
Start with the single classes that are listed in the utrack
* Add each class (and the honors version of that class) to the course table with the same course ID
* Add each class' pre-reqs and co-reqs to the prereq table

When you reach a collection of more than 1 courses (we're calling them buckets), add the collection as a new bucket to the bucket table.

If you reach a collection of sequences of courses (choose from this list of sequeneces), add each sequence as its own bucket. then make a new entry for the bucket and list all the sequence buckets under the column (sequence bucket IDs)

Link your major to the bucket by listing bucket ID in your major-specific table as a row by itself.

Ignore VolCore (general education) requirements
* if you aren't sure if something is general education (vol core) or specific to tickle engineering, add it anyway
* even if something MEETS volcore requirements, it can still be an engineering-specific requirement
* * for example: if a major requires CS 723 as a writing intensive course, it meets the VolCore requirement for writing intensive - in our table we still have to list it as a required class because it is not just a VolCore credit. engineering majors have to take that specific class

### CSVs
CSV's are comma seperated, so when you list multiple courses or multiple buckets, use a semicolon.

When you're finished with your major-specific table, export the sheet as an excel. change all column data types strings only. then export that sheet as a csv titled "major_IDNUMBER.csv" (for example major_2.csv) and commit to github under the folder "major_requirement_csvs"

All other sheets will be exported by whoever runs the processing code.




