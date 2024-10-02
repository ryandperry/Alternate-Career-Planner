#include <iostream>
#include <vector>

#include "parsing.h"

int main(int argc, char *argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " academic_history.html"
                  << std::endl;
        return -1;
    } 

    Course course; 

    std::vector<Course> courses_taken = ReadCourseInfo(argv[1], course); 

    for (int i = 0; i < (int) courses_taken.size(); i++) {
        Course current = courses_taken[i];
        std::cout << "Title: " << current.get_title()
                  << "\nCourse Code: " << current.get_course_code()
                  << "\nCredit Hours: " <<  current.get_credit_hours()
                  << "\nGrade: " << current.get_grade()
                  << "\n\n";
    }

    return 0;
}
