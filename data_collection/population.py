# Database Population Script
# Takes in an excel with major, bucket, and course information
# Builds tables for each major
# Builds lists of course, major, and bucket information
# Prepares data for the algorithm to match students -> majors

# TO RUN:
# select all (cntl+a)
# shift+enter to use interactive window
# highlight the contents of main
# shift+enter to run whatever is in main

import pandas as pd

# update filenames here instead of in the code
filenames = {
  "Bucket Table": "bucket_table.csv",
  "Major Table": "database_design_MT.csv",
  "Course Table": "database_design_CT.csv",
  "PreReq/CoReq Table": "prereq_coreq.csv"
}

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
    
  prereq_courseids = set()
  coreq_courseids = set()


class Bucket:
  def __init__(self, bucket_id, name, num_hours, num_courses):
    self.bucket_id = bucket_id
    self.name = name
    self.num_hours = num_hours
    self.num_courses = num_courses
  
  course_names = set()
  course_ids = set()
  bucket_ids = set()



# from the course table, build a course object with 
# ID, description, name, credit hours, prereqs, and coreqs
def build_course_objects():
  try:
    course_table = pd.read_csv(filenames['Course Table'], dtype=str)
  except:
    course_table = pd.read_csv('data_collection/'+filenames['Course Table'], dtype=str)
  course_table = course_table.fillna("NULL")
  
  course_objects = {}
  for row in course_table.index:
      course_id = course_table.loc[row, "Course ID"]
      course_object = Course(course_table.loc[row, 'Course ID'], course_table.loc[row, 'Course'], course_table.loc[row, 'Course Description'], course_table.loc[row, 'Course Hours'])
      course_objects[str(course_id)] = course_object

  # PREREQs and COREQs
  try:
    prereqs = pd.read_csv(filenames['PreReq/CoReq Table'], dtype=str)
  except:
    prereqs = pd.read_csv('data_collection/'+filenames['PreReq/CoReq Table'], dtype=str)

  prereqs = prereqs.fillna("NULL")
  #for each row (each course and P/C pairing)
  for row in prereqs.index:
    #get this current row's course name and course ID
    current_course_name = prereqs['Course'][row]
    current_course_ID = prereqs['Course ID'][row]

    #get this current row's req class name or req course ID
    current_req_name = prereqs['PreReq/CoReq Course'][row]
    current_req_ID = prereqs['Pre-Req Course ID'][row]

    if((current_course_name == 'NULL' and current_course_ID == "NULL") or 
       (current_req_name == "NULL" and current_req_ID == "NULL")):
      continue
    
    #if it doesnt have an ID, find it and save it
    if(current_course_ID == "NULL"):
      # find the matching ID and save it
      for course in course_objects.values():
        if(course.name == current_course_name):
          current_course_ID = course.course_id
    
    #if it doesnt have an ID, find it and save it
    if(current_req_ID == "NULL"):
      # find the matching ID and save it
      for course in course_objects.values():
        if(course.name == current_req_name):
          current_req_ID = course.course_id

    if(current_course_ID == "NULL" or current_req_ID == "NULL"):
      continue
    
    # for this row's requirement,
    # save it to the course object's prereq or coreq list
    if(prereqs['Co-req or Pre-req'][row] == 'P'):
      course_objects[current_course_ID].prereq_courseids.add(current_req_ID)
    if(prereqs['Co-req or Pre-req'][row] == 'C'):
      course_objects[current_course_ID].coreq_courseids.add(current_req_ID)
              
  return course_objects

def build_bucket_objects(course_objects):
  try:
    bucket_table = pd.read_csv(filenames['Bucket Table'], dtype=str)
  except:
    bucket_table = pd.read_csv('data_collection/'+filenames['Bucket Table'], dtype=str)
  bucket_table= bucket_table.fillna("NULL")
  bucket_objects = {}
  for row in bucket_table.index:
      bucket_id = bucket_table.loc[row, "Bucket ID"]
      bucket_obj = Bucket(bucket_table.loc[row, 'Bucket ID'], bucket_table.loc[row, 'Bucket Name'], bucket_table.loc[row, 'Bucket Number of Hours'], bucket_table.loc[row, "Bucket Number of Courses"])

      #seperate out the course names in semi-colon seperated list
      bucket_obj.course_names = set(bucket_table['Course Names'][row].replace(" ", "").split(";"))

      # #TODO this doesnt work. need to add course IDs
      # for current_course_name in bucket_obj.course_names:
      #   # find this course ID
      #   for course_obj in course_objects.values():
      #     if(course_obj.name == current_course_name):
      #       bucket_obj = bucket_obj.course_ids.add(course_obj.course_id)

      #add other bucket IDs
      bucket_obj.bucket_ids.add(bucket_table['Sequence Bucket IDs'][row])
      # save this new bucket object
      bucket_objects[str(bucket_id)] =  bucket_obj


  return bucket_objects

#there are csvs for each major requirements
#(from our "database")
#name them major_ID like major_1 (which is CS)
#place them in the major requirements csv folder

def build_major_objects(course_objects, bucket_objects):
  try:
    major_table = pd.read_csv(filenames['Major Table'], dtype=str)
  except:
    major_table = pd.read_csv('data_collection/'+filenames['Major Table'], dtype=str)
  major_table = major_table.fillna("NULL")
  major_objects = {}
  for row in major_table.index:
      major_id = major_table.loc[row, 'Major ID']
      major_obj = Major(major_table.loc[row, 'Major ID'], major_table.loc[row, 'Major Abreviation'], major_table.loc[row, 'Major Name'], major_table.loc[row, 'Major Description'])
      major_objects[str(major_id)] = major_obj

  for major_id in major_objects.keys():
    major_object = major_objects[major_id]
    
    if( major_object.major_id == "NULL"):
      continue

    relative_filename = 'major_requirement_csvs/major_' + str(int(major_object.major_id)) + '.csv'
    outside_filename = 'data_collection/major_requirement_csvs/major_' + str(int(major_object.major_id)) + '.csv'
    try:
      try:
        major_requirements = pd.read_csv(relative_filename, dtype=str)
      except:
        major_requirements = pd.read_csv(outside_filename, dtype=str)
    except:
      #if this csv isnt in the folder yet, just skip it
      continue
    #fill in everything that's null in the excel 
    major_requirements = major_requirements.fillna("NULL")

    #make the course and bucket objects using either the ID or the name
    #example: if the row has a course (MATH 141), lookup in the dictionary
      #of courses for that and add the course ID to major.course_ids set()
    #example: if the row has course ID 5, then add that ID
    for row in major_requirements.index:
      #get the course ID or bucket ID for this major requirement
      bucket_ID = major_requirements['Required Bucket ID'][row]
      course_ID = major_requirements['Required Course ID'][row]
      course = major_requirements['Required Course'][row]
    
      #if this row has a bucket, use the bucket ID
      if(bucket_ID != "NULL"):
        major_object.bucket_ids.add(str(bucket_ID))
      
      elif(course_ID != "NULL"):
        major_object.course_ids.add(str(course_ID))
      
      elif(course != "NULL"):
        course_ID = [course_obj.course_id for course_obj in course_objects.values() if course_obj.name == course]
        major_object.course_ids.add(str(course_ID))
  
  return major_objects

def main():
  course_objects = build_course_objects()
  bucket_objects = build_bucket_objects(course_objects)
  print(course_objects)
  print(bucket_objects)

  major_objects = build_major_objects(course_objects=course_objects, bucket_objects=bucket_objects)
  print(major_objects)