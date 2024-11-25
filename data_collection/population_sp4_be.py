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
  "Major Table": "major_table.csv",
  "Course Table": "course_table.csv",
  "PreReq/CoReq Table": "prereq_coreq.csv",
  "Major Requirements Folder Name": "major_requirement_csvs",
  "Major Requirements Prefix": "major_"
}

#global sets that everyone needs access to?

class Major:
  def __init__(self, major_id, abbr, name, description):
    self.major_id = major_id
    self.abbr = abbr
    self.name = name
    self.description = description
    self.course_ids = set()
    self.bucket_ids = set()



class Course:
  def __init__(self, course_id, description, hours):
    self.course_id = course_id
    self.names = set()
    self.description = description
    self.hours = hours
    self.prereq_courseids = set()
    self.coreq_courseids = set()


class Bucket:
  def __init__(self, bucket_id, name, num_hours, num_courses):
    self.bucket_id = bucket_id
    self.name = name
    self.num_hours = num_hours
    self.num_courses = num_courses
    self.course_names = set()
    self.course_ids = set()
    self.other_bucket_ids = set()

class Person:
  def __init__(self, major, classes_array, quiz_results):
    self.major = major
    self.classes_array = classes_array
    self.quiz_results = quiz_results


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
      #if this course ID already exists, add this current name to the list of names
      if course_id in course_objects.keys():
        # print(row, " key already made, adding ", course_table['Course'][row])
        course_objects[course_id].names.add(course_table['Course'][row].replace(" ",""))
      else:
        #make a new course object for this entry
        # print(row," making new key, adding ", course_table.loc[row, 'Course ID'], " with names ",course_table['Course'][row] )
        course_object = Course(course_table.loc[row, 'Course ID'], course_table.loc[row, 'Course Description'], course_table.loc[row, 'Course Hours'])
        course_object.names.add(course_table['Course'][row].replace(" ",""))
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
    current_course_name = prereqs['Course'][row].replace(" ","")
    current_course_ID = prereqs['Course ID'][row]

    #get this current row's req class name or req course ID
    current_req_name = prereqs['PreReq/CoReq Course'][row].replace(" ","")
    current_req_ID = prereqs['Pre-Req Course ID'][row]

    #this whole row is empty
    if((current_course_name == 'NULL' and current_course_ID == "NULL") or 
       (current_req_name == "NULL" and current_req_ID == "NULL")):
      continue

    #handle the case where the course ID is null
    if(current_course_name != "NULL" and current_course_ID == "NULL"):
      #need to get the ID to be able to match course IDs
      for course_obj in course_objects.values():
        # print(course_obj.names)
        if current_course_name in course_obj.names:
          # print("found")
          current_course_ID = course_obj.course_id
    
    #if it doesnt have an ID, find it and save it
    if(current_req_ID == "NULL"):
      for course in course_objects.values():
        if(current_req_name in course.names):
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
      bucket_id = bucket_table['Bucket ID'][row]
      #make sure number of hours and number of courses are integers not strings
      # do we want to do this in the algorithm or the data processing?
      num_hours = bucket_table.loc[row, 'Bucket Number of Hours']
      if (num_hours != "NULL"): num_hours = int(num_hours);
      else: num_hours = -1
      num_courses = bucket_table.loc[row, "Bucket Number of Courses"]
      if (num_courses != "NULL"): num_courses = int(num_hours);
      else: num_hours = -1

      bucket_obj = Bucket(bucket_id=bucket_table.loc[row, 'Bucket ID'], name =bucket_table.loc[row, 'Bucket Name'],num_hours=num_hours, num_courses=num_courses)

      #seperate out the course names in semi-colon seperated list
      if(bucket_table['Course Names'][row] != "NULL"):
        bucket_obj.course_names = set(bucket_table['Course Names'][row].replace(" ", "").split(";"))

      for current_course_name in bucket_obj.course_names:
        # find this course ID in the course objects list
        for course_obj in course_objects.values():
          if(current_course_name in course_obj.names):
            # print("found a matching name")
            bucket_obj.course_ids.add(course_obj.course_id)

      #add the sequence IDs (other bucket ids.. we can think of a better name)
      if( bucket_table['Sequence Bucket IDs'][row] != "NULL"):
        bucket_obj.other_bucket_ids = set(bucket_table['Sequence Bucket IDs'][row].replace(" ", "").split(";"))

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

    relative_filename = filenames['Major Requirements Folder Name']+'/' + filenames['Major Requirements Prefix'] + str(int(major_object.major_id)) + '.csv'
    outside_filename = 'data_collection/' + filenames['Major Requirements Folder Name']+'/' + filenames['Major Requirements Prefix'] + str(int(major_object.major_id)) + '.csv'
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
        course_ID = [course_obj.course_id for course_obj in course_objects.values() if course in course_obj.names]
        major_object.course_ids.add(str(course_ID))
  
  return major_objects

def adding_person(personCourseObjects, major, quiz_major, major_object):
  # personCourseObjects is the array of course objects from Ryans parsing code 
  # major will hopefully also be from ryan's code
  # and then what they scored on the quiz is the quiz_major string 
  # from the output from ryan's code , we will do the following 
  # Ryan's code will create an array of course obects 

  # major object is from our own stuff 

  # changing both of the names into IDs so we can store those ids in our one person 
  for majors in major_object:
    if(major == majors.name):
      major_id = majors.major_id 
    if(quiz_major == majors.name):
      quiz_id = majors.major_id
  func_classes_array = []
  for i in personCourseObjects:
    if(personCourseObjects[i].grade > 'C'):
      # if they got higher than a C, add it to the person object
      func_classes_array.append(personCourseObjects[i].course_name)
  OnlyOnePerson = Person(major=major_id, classes_array=func_classes_array, quiz_results=quiz_id)
  return OnlyOnePerson

def processing_course(course_objects, person_object):
  # list of strings
  # from ryan - list of strings
  
  # goal - build set of ids (of classes that they took)
  history_ids = set()
  for history_name in person_object.classes_array:
    for course in course_objects.values():
      # TODO if history name in course.names
      if(history_name in course.names):
      # if(course.name == history_name):  
        history_ids.add(course.course_id)
  return history_ids

def compare_academic_history(person_object, major_objects, course_objects, bucket_objects):
  #major_objects is the dictionary of major objects 
  hour_counter = 0
  max_number_of_hours = 0
  # check in every major 
  copy_major_objects = major_objects
  history_ids = processing_course(course_objects=course_objects, person_object=person_object)
  for i in major_objects.keys():
    # do not check against their current major
    if(major_objects[i].major_id == person_object.major):
      continue
    else:
      # check their courses ?
      for course_taken in history_ids:
        # see if it is in the course_ids set for this major 
        if course_taken in major_objects[i].course_ids:
          hour_counter += course_objects[course_taken].hours
          #  delete major_objects[i].course_ids
          del copy_major_objects[i]
          continue
        # see if this course is in their bucket objects 
        for bucket_id in bucket_objects.keys():
          if course_taken in bucket_objects.course_ids:
            hour_counter += course_objects[course_taken].hours
            if(bucket_id.num_hours > 0):
              bucket_objects[course_taken].num_hours -= course_objects[course_taken].num_hours
            # delete the bucket?
          #somewhere in here we need to check if it is part of a bucket
        # if(course_taken in bucket_objects)
        #if("person_object.classes_array[course_taken]" in bucket_objects.values()):
            #pseudo code : 
            # if this course name appears in the bucket objects' course names 
            #if()
            # then you need to see if this one class will fill the entire requirement via the course table hours !! 
            # if it does not fill the entire requirement, manually subtract the hours required for that bucket
            # if it does fill the whole requirement add that number to hour_counter
        # look up the course id in the major dictionary at this i 
        if hour_counter > max_number_of_hours:
          max_number_of_hours = hour_counter
          major = i
          array_of_highest = major_objects[i].course_ids
  return max_number_of_hours, major

def print_course_obj(course_object):
  course_name = course_object.names
  course_hrs = course_object.hours
  course_prereq_id = course_object.prereq_courseids
  print_statement = "Courses: "
  for y in course_name:
    print_statement += y + " "

  if course_object.description == "NULL":
    print_statement += "\nDescription: N/A" + "\nRequires " + course_hrs + " hours"
  else:
    print_statement += "\nDescription: " + course_object.description + "\nRequires " + course_hrs + " hours"
  
  if len(course_prereq_id) != 0:
    print_statement += ", these prereqs "
    for x in course_prereq_id:
      print_statement += x
      
  return print(print_statement)


def print_bucket_obj(bucket_object):
  bucket_name = bucket_object.name
  num_hrs = bucket_object.num_hours

  courses = bucket_object.course_names

  print_statement = "Bucket: " + bucket_name + " has these courses "
  for x in courses:
    print_statement += x + " "
  if num_hrs == -1:
    print_statement += "\n"
  else:
    print_statement += "\nFor a total of " + str(num_hrs) + " hours"
  return print(print_statement) 

def print_major_obj(major_object): 
  #set this up to take in course_obj so we can find them based on course_id set that this has
  maj_cour_ids = major_object.course_ids
  maj_buck_ids = major_object.bucket_ids
  name = major_object.name
  print_statement = name
  for x in maj_cour_ids:
    #print_course_obj(course_object=course_obj[x])
    print(x)
  #print(name)
  return print_statement

def main():
  course_objects = build_course_objects()
  for course_obj in course_objects.values():
    print("Course Names: ", course_obj.names)
    print("Course ID: ", course_obj.course_id)
    print("Prereq IDs: ", course_obj.prereq_courseids)
    print("Coreq IDs: ", course_obj.coreq_courseids)

  bucket_objects = build_bucket_objects(course_objects)
  for bucket_obj in bucket_objects.values():
    print("Name: ", bucket_obj.name)
    print("Course Names: ", bucket_obj.course_names)
    print("Course IDs: ", bucket_obj.course_ids)
    if bucket_obj.other_bucket_ids != set():
      print("Other Bucket IDs: ", bucket_obj.other_bucket_ids)


  major_objects = build_major_objects(course_objects=course_objects, bucket_objects=bucket_objects)
  for major_obj in major_objects.values():
    print("Name: ", major_obj.name)
    print("Course IDs: ", major_obj.course_ids)
    if major_obj.bucket_ids != set():
      print("Bucket IDs: ", major_obj.bucket_ids)

  for i in course_objects:
    print_course_obj(course_object=course_objects[i])
  for i in bucket_objects:
    print_bucket_obj(bucket_object=bucket_objects[i])
  for i in major_objects:
    print_major_obj(major_object=major_objects[i])

  majorid = 1
  classes_array = ["EF 151", "EF 230", "MATH 141"]
  quiz_results = "ME"
  person_object = Person(major=majorid, classes_array=classes_array, quiz_results=quiz_results)
  major_objects = build_major_objects(course_objects=course_objects, bucket_objects=bucket_objects)
  print(major_objects)
  compare_academic_history(person_object=person_object, major_objects=major_objects, course_objects=course_objects, bucket_objects=bucket_objects)

#optional
main()