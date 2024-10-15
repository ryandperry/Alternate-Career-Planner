/* JobsList.js
 * Description: Lists job titles and descriptions for a given major
 */

import React from 'react';
import './JobsList.css';

// Jobs for each major
const jobsData = {
    // Example data from source: https://joinhandshake.com/blog/students/top-10-jobs-for-computer-science-majors/
    'Computer Science': [
      {
        title: 'Software Developer',
        description: 'Software Developers are tasked with creating and developing websites, programs, and other applications that run on computers or other devices.',
      },
      {
        title: 'Web Developer',
        description: 'Web Developers are programmers that are concentrated on coding, designing, and building out the layout of a website.',
      },
      {
        title: 'IT Project Manager',
        description: 'IT Project Managers are in charge of planning, budgeting, and basically running an organization’s IT goals and initiatives.',
      },
    ],

    // Example data from source: https://www.indeed.com/career-advice/finding-a-job/aerospace-engineering-career
    'Aerospace Engineering': [
      {
        title: 'Pilot',
        description: 'Pilots manipulate the controls of vehicles like airplanes and jets to ensure safe takeoff, flight and landing. They create flight plans to transport passengers and cargo to their destination.',
      },
      {
        title: 'Aerospace Drafter',
        description: 'Drafters create blueprints and other technical drawings to assist in the engineering process for products and equipment. Aerospace drafters interpret technical specifications to create visual representations of aircraft like missiles and planes.',
      },
      {
        title: 'Communications Officer',
        description: 'In the aerospace industry, communications officers help maintain contact between the passengers of an aircraft and team members at ground control. Communications officers monitor transmission systems, receive mission updates and remotely transmit information to aircraft crew members. ',
      },
    ],

    // Example data from source: https://joinhandshake.com/blog/students/biomedical-engineering-jobs/
    'Biomedical Engineering': [
        {
          title: 'Clinical engineer',
          description: 'A clinical engineer performs tasks like managing and testing medical equipment, designing tools that help doctors perform different medical procedures, and conducting quality checks to ensure medical devices are safe. ',
        },
        {
          title: 'Research engineer',
          description: 'Research engineering is a highly active role requiring you to collect data, analyze it using statistical software, interpret results, and share them with relevant stakeholders. You also build prototypes for testing and develop concepts for upcoming products and technologies.',
        },
        {
          title: 'Product development engineer',
          description: 'In this role, you must research industry trends and consumer demand, design products to fill the gap, test prototypes, and market them to potential users. You are also involved in quality control to ensure products meet safety guidelines.',
        },
      ],

    // Example data from source: https://www.indeed.com/career-advice/finding-a-job/best-chemical-engineering-degree-jobs
    'Chemical Engineering': [
        {
          title: 'Chemical Technician',
          description: 'A clinical engineer performs tasks like managing and testing medical equipment, designing tools that help doctors perform different medical procedures, and conducting quality checks to ensure medical devices are safe. ',
        },
        {
          title: 'Research engineer',
          description: 'Research engineering is a highly active role requiring you to collect data, analyze it using statistical software, interpret results, and share them with relevant stakeholders. You also build prototypes for testing and develop concepts for upcoming products and technologies.',
        },
        {
          title: 'Product development engineer',
          description: 'In this role, you must research industry trends and consumer demand, design products to fill the gap, test prototypes, and market them to potential users. You are also involved in quality control to ensure products meet safety guidelines.',
        },
    ],

    // Example data from source: https://www.indeed.com/career-advice/finding-a-job/jobs-with-electrical-engineering
    'Electrical Engineering': [
        {
          title: 'Electrical Technician',
          description: 'Electrical technicians construct and maintain machines and equipment that use electricity to operate. They install and repair wiring, fabricate product parts, assemble machines, test electrical output and troubleshoot functional issues.',
        },
        {
          title: 'Equipment engineer',
          description: 'Equipment engineers focus on developing machinery and other mechanical devices that organizations use as operational equipment. They assess what kinds of equipment their clients need, then design solutions that fir their specifications.',
        },
        {
          title: 'Hardware engineer',
          description: 'Hardware engineer create designs for computer hardware and other physical equipment. They design and compile components like computer processors, hard drives, circuit boards, fans, routers, graphics cards and memory chips. Hardware engineers ensure that a machine has the essential components and power supply to complete its digital functions without overheating the system.',
        },
    ],
};

// Lists courses, their description, and their number of credit hours
const JobsList = ({ majorname }) => {
    const jobs = jobsData[ majorname ] || [];

    return (
        <div>
            {/* Show data as long as there are jobs listed */}
            {jobs.length > 0 ? ( 
                <>
                <h2> Potential Careers </h2>
                    <ul>
                        {jobs.map((job, index) => (
                             <li key={index} className="job-item">
                                <h3>{job.title}</h3>
                                <p className="job-description">{job.description}</p>
                             </li>
                        ))}
                    </ul>
                </>
            ) : (<></>)}
            
        </div>
    )
}

export default JobsList;