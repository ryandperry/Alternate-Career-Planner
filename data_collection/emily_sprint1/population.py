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
    major_id = major_id
    abbr = abbr
    name = name
    description = description

  course_ids = {}
  bucket_ids = {}


class Course:
  def __init__(self, course_id, name, description, hours):
    course_id = course_id
    name = name
    description = description
    hours = hours

class Bucket:
  def __init__(self, bucket_id, name, course_names, num_hours, num_courses):
    bucket_id = bucket_id
    name = name
    course_names = course_names
    num_hours = num_hours
    num_courses = num_courses

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
df = pd.read_csv("database_design_CT.csv")
print(df.shape[0])
for row in df.index:
    #course_id, name, description, hours
    course_object = Course(df.loc[row, 'Course ID'], df.loc[row, 'Course'], df.loc[row, 'Course Description'], df.loc[row, 'Course Hours'])
      #dict[i] = course_object
    dict = {row: course_object}

print(dict)

  #looping through major table rows
  #build major class object for each row
  #dict of majors

  #looping through bucket table rows
  #build bucket class object for each row
  #dict of buckets

  # for each table that has major's requirements in the excel,
  # make a pandas table 
  # populate columns using the lists of class objects
  # we have 12 majors
  # make one generic function to populate each table using the 
  # course IDs, bucket ID, major ID

  #algorithm will depend on searching by ID so we're
  # using dictionaries to be able to quickly search on ID
