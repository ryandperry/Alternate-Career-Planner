/* Main.java
 * Description: Parses information from the user's academic history
 * HTML webpage and stores taken courses in a vector of course objects
 */

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class main {
  public static void 
  main(String[] args)
  {
    if (args.length != 1) {
      System.err.println("Academic history HTML not specified");
      System.exit(-1);
    }

    List<course> coursesTaken = readCourseInfo(args[0]);
    
    for (int i = 0; i < coursesTaken.size(); i++) {
      course current = coursesTaken.get(i);
      System.out.println("Title: " + current.getTitle() +
                         "\nCourse Code: " + current.getCourseCode() +
                         "\nCredit Hours: " + current.getCreditHours() +
                         "\nGrade: " + current.getGrade() + "\n");
    }
  }

  /*
   * This function reads the academic history HTML and stores all
   * the courses the student has completed or is taking.
   */
  public static List<course> 
  readCourseInfo(String html)
  {
    List<course> coursesTaken = new ArrayList<>();
    StringBuilder courseBlock = new StringBuilder();

    String even = "class=\"even\">";
    String odd = "class=\"odd\">";
  
    try (BufferedReader history = new BufferedReader(new FileReader(html))) {
      String line;
      while ((line = history.readLine()) != null) {
        // Check if line contains a start delimeter
        if (line.contains(even) || line.contains(odd)) {
          // Store the next 30 lines in courseBlock
          courseBlock.append(line).append("\n");
          for (int i = 0; i < 30; i++) {
            if ((line = history.readLine()) != null) {
              courseBlock.append(line).append("\n");
            } else {
              break; // break at end of file
            }
          }
          course newCourse = new course();
          newCourse.setCourseInfo(courseBlock.toString());
          coursesTaken.add(newCourse);
          courseBlock.setLength(0); // clear the StringBuilder
        }
      }
    } catch (IOException e) {
        e.printStackTrace();
        System.exit(1);
    }
    return coursesTaken;
  }
}
