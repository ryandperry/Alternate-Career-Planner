# 340 Alternate Career Planner Database Population Script
# Takes in an excel with major, bucket, and course information
# Builds tables for each major
# Builds lists of course, major, and bucket information
# Prepares data for the algorithm to match students -> majors

# Pandas Data Frames 

# Bucket Table To-Dos: 
# Populate the course ID's, fill in the number of courses 

# for i in bucket ID 

# Prereq/Coreq 
# Populating the Course ID and the Prereq Bucket Name and number of courses/ hours 


# for i in Major Table 
# Course ID to Required Course & Required Course Name 
# Bucket ID to course name and number of hours 

# Class :
# course : ID, name description 
# Bucket: ID, Bucket Name, Bucket NUmber of Hours/Number of COurses, List of Courses
# Major: ID, Abbreviation, Name, Description  

# Write out the classes , then write out stump code 

import pandas as pd


class Major:
  def __init__(self, major_id, abbr, name, description):
    self.major_id = major_id
    self.abbr = abbr
    self.name = name
    self.description = description

  course_ids = set()
  bucket_ids = set()


class Course:
  def __init__(self, course_id, name, description, hours):
    self.course_id = course_id
    self.name = name
    self.description = description
    self.hours = hours


class Bucket:
  def __init__(self, bucket_id, name, course_names, num_hours, num_courses):
    self.bucket_id = bucket_id
    self.name = name
    self.course_names = course_names
    self.num_hours = num_hours
    self.num_courses = num_courses

  #get course IDs from the course names
  #course_ids

  # functions me and beatrice can make

  #looping through course table rows
  #build course class object for each row
  #dict of courses
  # dict.append(str(course.course_id), course object)
  # dict[course.course_id] returns course object
  # check this indenting 
print("Hello World")
df = pd.DataFrame()
df = pd.read_csv('data_collection/database_design_CT.csv')
#print(df.shape[0])
for row in df.index:
    #course_id, name, description, hours
    course_object = Course(df.loc[row, 'Course ID'], df.loc[row, 'Course'], df.loc[row, 'Course Description'], df.loc[row, 'Course Hours'])
    #dict[i] = course_object
    # dict = {str(row): course_object}
    print(dict[str(row)].name)
    print(course_object.name)

  #looping through major table rows
  #build major class object for each row
  #dict of majors
  major_objects = {}

  #looping through bucket table rows
  #build bucket class object for each row
  #dict of buckets

  #Emily part
  #make excel csvs for each major requirements
  #name them major_ID like major_1 (which is CS)
  #place them in folder for easy access

  # for each table that has major's requirements in the excel,
  for major in majors_objects:
    #read csv for this major using the ID number

    #clean up the csv by populating the empty columns
    #example: if the row has a course (MATH 141), lookup in the dictionary
      #of courses for that and add the course ID to major.course_ids set()
    #example: if the row has course ID 5, 


    
#algorithm will depend on searching by ID so we're
# using dictionaries to be able to quickly search on ID
