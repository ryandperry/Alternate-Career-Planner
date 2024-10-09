/* Course.java
 * Description: Implements 'Course' class
 */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;

public class course {
  private String courseCode;
  private double creditHours;
  private String grade;
  private String title;

  /*
   * Default course constructor.
   */
  public course() {}

  /*
   * Returns a Course's course code.
   */
  public String 
  getCourseCode() 
  {
    return courseCode;
  }

  /*
   * Returns a Course's credit hours.
   */
  public double
  getCreditHours()
  {
    return creditHours;
  }

  /*
   * Returns a Course's grade.
   */
  public String
  getGrade()
  {
    return grade;
  }

  /*
   * Returns a Course's title.
   */
  public String
  getTitle()
  {
    return title;
  }

  /*
   * Sets a Courses's member variables given 
   * an unformatted course block.
   */
  public void 
  setCourseInfo(String block)
  {
    BufferedReader read = new BufferedReader(new StringReader(block)) ;
    String line;

    try {
      for (int i = 1; i < 30; i++) {
        line = read.readLine();

        if (i == 14) {
          /* Course codes are stored on line 14 of every course block.
           * We must add a space between the letters and numbers of 
           * course codes to align with the naming conventions in 
           * our database.
           */
          courseCode = line.trim().replaceAll("\\s+", "")
                       .replaceAll("([A-Z]+)([0-9]+)", "$1 $2");
          this.courseCode = courseCode;
        } else if (i == 19) {
          // Course credit hours are stored on line 19 of every course block.
          String creditHoursStr = line.trim();
          creditHours = Double.parseDouble(creditHoursStr);
          this.creditHours = creditHours;
        } else if (i == 24) {
          // Course grades are stored on line 24 of every course block.
          grade = line.trim();
          this.grade = grade;
        } else if (i == 29) {
          // Course titles are stored on line 29 of every course block. 
          title = line.trim();
          this.title = title;
        }
      }
    } catch (IOException e) {
        e.printStackTrace();
    }
  }
}
