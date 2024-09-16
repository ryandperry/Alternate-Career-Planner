# Academic History Parsing
## Overview
* This program parses a student's academic history HTML file and extracts information about the student's courses. It separates the academic history file into blocks of course data and then extracts the course codes and corresponding credit hours from these blocks. It then provides a summary of the courses a student has taken, sorted by credit hours, and calculates the total credit hours toward graduation.
## Usage
* This program can be compiled using g++. The user must provide an academic history HTML file on the command line. To obtain this file, run a DARS report online via MyUTK. Select the Course History tab. Right click the Course History Table and select Save As. Be sure to save as type Webpage, HTML Only. This program currently does not error check the HTML file, so do not modify it.
## Significance to our Project
* In our project, HTML parsing is important not only for reading a student's academic history, but also for gathering course data from UTK's online catalogs. This program serves as a rough foundation for the more sophisticated parsing techniques we will use during the project.
