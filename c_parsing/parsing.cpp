#include <iostream>
#include <cctype>
#include <sstream>
#include <algorithm>
#include <fstream>

#include "parsing.h"

/*
 * Returns a Course's course code.
 */
std::string Course::
get_course_code()
{
    return course_code;
}

/*
 * Returns a Course's credit hours.
 */
int Course::
get_credit_hours()
{
    return credit_hours;
}

/*
 * Returns a Course's grade.
 */
std::string Course::
get_grade()
{
    return grade;
}

/*
 * Returns a Course's title.
 */
std::string Course::
get_title()
{
    return title;
}

/*
 * Sets a Courses's member variables given 
 * an unformatted course block.
 */
void Course::
set_course_info(std::string course_block)
{
    std::istringstream stream(course_block);
    std::string line, course_code, grade, title;
    int credit_hours = 0; 

    for (int i = 1; i < 30; i++) {
        getline(stream, line);

        if (i == 14) {
            // Course codes are stored on line 14 of every course block.
            course_code = TrimWhiteSpace(line);
            this->course_code = course_code;
        } else if (i == 19) {
            // Course credit hours are stored on line 19 of every course block.
            std::string credit_hours_str = TrimWhiteSpace(line);
            credit_hours = std::stoi(credit_hours_str);
            this->credit_hours = credit_hours;
        } else if (i == 24) {
            // Course grades are stored on line 24 of every course block.
            grade = TrimWhiteSpace(line);
            this->grade = grade;
        } else if (i == 29) {
            /*
             * Course titles are stored on line 29 of every course block. 
             * For titles, only remove leading whitespace so that 
             * there are spaces between words.
             */
            std::string::iterator start;
            start = std::find_if(line.begin(), line.end(), [](unsigned char c) {
                                     return !std::isspace(c); 
                                 });
            line.erase(line.begin(), start);

            this->title = line;
        } 
    } 
}

/*
 * This function reads the academic history HTML and stores all
 * the courses the student has completed or is taking.
 */
std::vector<Course>
ReadCourseInfo(char * academic_history_html, Course course)
{
    std::ifstream academic_history;
    academic_history.open(academic_history_html);
    if (!academic_history.is_open()) {
        perror(academic_history_html);
        exit(1);
    } 

    std::vector<Course> courses_taken;
    std::string line, course_block;

    std::string start_delim_even = "class=\"even\">";
    std::string start_delim_odd = "class=\"odd\">";

    while(getline(academic_history, line)) {
        // Check if line contains a start delimiter
        if (line.find(start_delim_even) != std::string::npos ||
            line.find(start_delim_odd) != std::string::npos) {
            // Store the next 30 lines in course_block
            course_block = line + "\n";
            for (int i = 0; i < 30; i++) {
                if (getline(academic_history, line)) {
                    course_block += line + "\n";
                } else {
                    break; // break at end of file
                }
            }
            course.set_course_info(course_block);
            courses_taken.push_back(course);
        }
    }
    academic_history.close();

    return courses_taken;
}

/*
 * This function removes all whitespace from a stringk.
 */
std::string
TrimWhiteSpace(std::string &str)
{
    str.erase(std::remove_if(str.begin(), str.end(), ::isspace),
              str.end()); 

    return str;
}
