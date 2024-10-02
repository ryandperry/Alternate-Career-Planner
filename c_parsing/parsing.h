#ifndef PARSING_H
#define PARSING_H

class Course {
    private:
        std::string course_code;
        int credit_hours;
        std::string grade;
        std::string title;
    public:
        Course() = default;

        std::string get_course_code();
        int         get_credit_hours();
        std::string get_grade();
        std::string get_title();

        void set_course_info(std::string);
};

std::vector<Course> ReadCourseInfo(char *, Course);
std::string TrimWhiteSpace(std::string &);

#endif
