#include <iostream>
#include <iomanip>
#include <utility>
#include <algorithm>
#include <sstream>
#include <stdio.h>
#include <string>
#include <fstream>
#include <vector>

std::vector<std::string> ReadCourseInformation(std::ifstream &);
std::string TrimWhiteSpace(std::string &);
std::pair<std::string, int> GetCourseInfo(std::string);

int main(int argc, char *argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " academic_history.html" << std::endl;
        return 1;
    }

    std::ifstream academic_history;
    academic_history.open(argv[1]);
    if (!academic_history.is_open()) {
        perror(argv[1]);
        return 1;
    } 

    std::vector<std::string> course_blocks = ReadCourseInformation(academic_history);
    academic_history.close();

    std::vector<std::pair<std::string, int>> courses_taken;

    for (int i = 0; i < (int) course_blocks.size(); i++) {
        courses_taken.push_back(GetCourseInfo(course_blocks[i]));
    }
    
    sort(courses_taken.begin(), courses_taken.end(), [](auto &a, auto &b) {
            return b.second < a.second; // credit hours descending
         });

    int total_credit_hours = 0;
    std::vector<std::pair<std::string, int>>::iterator pair;
    for (pair = courses_taken.begin(); pair != courses_taken.end(); pair++) {
        total_credit_hours += pair->second;
        std::cout << std::setw(11) << pair->first << " - "
                  << pair->second << std::endl;
    } 

    std::cout << "Total Credit Hours: " << total_credit_hours 
              << "/121" << std::endl;

    return 0;
}

/*
 * This function reads the academic history HTML and stores all 
 * the courses the student has completed or is taking
 * as unformatted strings or "course blocks."
 */
std::vector<std::string>
ReadCourseInformation(std::ifstream &academic_history)
{
    std::vector<std::string> course_blocks;
    std::string line, course_block;
    std::string start_delimeter_even = "class=\"even\">";
    std::string start_delimeter_odd = "class=\"odd\">";

    while(getline(academic_history, line)) {
        // Check if line contains a start delimiter
        if (line.find(start_delimeter_even) != std::string::npos ||
                line.find(start_delimeter_odd) != std::string::npos) {
            // Store the next 30 lines in course_block
            course_block = line + "\n";
            for (int i = 0; i < 30; i++) {
                if (getline(academic_history, line)) {
                    course_block += line + "\n";
                } else {
                    break; // break at end of file
                }
            }
            course_blocks.push_back(course_block);
        }
    }
    return course_blocks;
}

/*
 * This function trims whitespace from a string.
 */
std::string
TrimWhiteSpace(std::string &str)
{
    str.erase(std::remove_if(str.begin(), str.end(), ::isspace),
              str.end()); 

    return str;
}

/*
 * This functions reads the course code
 * and credit hours from a course block. 
 * Returns a pair of the format:
 * <course code, credit hours>
 */
std::pair<std::string, int>
GetCourseInfo(std::string course_block)
{
    std::istringstream stream(course_block);
    std::string line;
    std::string course_code;
    int credit_hours = 0;

    for (int i = 0; i < 19; i++) {
        if (!getline(stream, line)) {
            return {"", 0};  
        }
        if (i == 13) {
            // Course codes are stored on line 14 of every course block
            course_code = TrimWhiteSpace(line);
        } else if (i == 18) {
            // Credit hours are stored on line 19 of every course block
            std::string credit_hours_str = TrimWhiteSpace(line);
            credit_hours = std::stoi(credit_hours_str);
        }
    }
    return {course_code, credit_hours};
}

