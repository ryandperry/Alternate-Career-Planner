/* JobsList.js
 * Description: Lists job titles and descriptions for a given major
 */

import React from 'react';
import './JobsList.css';

// Jobs for each major
const jobsData = {
  'Computer Science': [
    {
      title: 'Software Developer',
      description: 'Software developers build applications, websites, and software solutions for various devices, focusing on creating functional, user-friendly, and efficient products.',
    },
    {
      title: 'Web Developer',
      description: 'Web developers specialize in designing and coding websites, ensuring that they are both visually appealing and technically sound to offer a smooth user experience.',
    },
    {
      title: 'IT Project Manager',
      description: 'IT project managers oversee the planning and execution of IT projects, ensuring that technological goals align with organizational needs and are completed on time and within budget.',
    },
  ],

  'Aerospace Engineering': [
    {
      title: 'Pilot',
      description: 'Pilots operate aircraft, including planes and helicopters, ensuring safe navigation and transport of passengers or cargo from departure to destination based on flight plans.',
    },
    {
      title: 'Aerospace Drafter',
      description: 'Aerospace drafters create detailed technical drawings and schematics used in the design and production of aircraft components, relying on engineering guidelines.',
    },
    {
      title: 'Communications Officer',
      description: 'Communications officers in aerospace handle the flow of information between aircraft and ground control, ensuring all mission updates and flight communications are transmitted accurately.',
    },
  ],

  'Biomedical Engineering': [
      {
        title: 'Clinical Engineer',
        description: 'Clinical engineers maintain and improve medical devices and technologies, ensuring their proper function in clinical settings and contributing to advancements in healthcare solutions.',
      },
      {
        title: 'Research Engineer',
        description: 'Research engineers in biomedical fields gather and analyze experimental data, develop new medical devices, and prototype technologies to improve healthcare and treatment methods.',
      },
      {
        title: 'Product Development Engineer',
        description: 'These engineers focus on designing innovative medical products, testing prototypes, and conducting market analysis to meet industry standards and user needs.',
      },
  ],

  'Chemical Engineering': [
      {
        title: 'Chemical Technician',
        description: 'Chemical technicians assist in the research, development, and testing of chemical products and processes, working closely with engineers to ensure safety and efficiency.',
      },
      {
        title: 'Process Engineer',
        description: 'Process engineers design and optimize chemical manufacturing processes, aiming to increase production efficiency and minimize waste while maintaining safety standards.',
      },
      {
        title: 'Quality Control Specialist',
        description: 'Quality control specialists monitor and test chemical products to ensure they meet required specifications, identifying any defects and suggesting improvements.',
      },
  ],

  'Electrical Engineering': [
      {
        title: 'Electrical Technician',
        description: 'Electrical technicians build, install, and maintain electrical systems, ensuring that devices and machinery operate efficiently and safely in various settings.',
      },
      {
        title: 'Equipment Engineer',
        description: 'Equipment engineers design and develop machinery for industrial use, ensuring that machines meet operational needs and perform optimally in their respective environments.',
      },
      {
        title: 'Hardware Engineer',
        description: 'Hardware engineers develop and test computer components, such as processors and circuit boards, aiming to create reliable hardware solutions for electronic devices.',
      },
  ],

  'Civil Engineering': [
    {
      title: 'Surveyor',
      description: 'Surveyors analyze land features and boundaries, collecting data used in the planning and construction of infrastructure projects like roads, bridges, and buildings.',
    },
    {
      title: 'Structural Engineer',
      description: 'Structural engineers focus on designing buildings and structures that can withstand various forces, ensuring they are safe, stable, and durable over time.',
    },
    {
      title: 'Urban Planner',
      description: 'Urban planners develop plans for land use in urban areas, considering factors like population growth, infrastructure needs, and sustainable development to create efficient cities.',
    },
  ],

  'Environmental Engineering': [
    {
      title: 'Environmental Consultant',
      description: 'Environmental consultants analyze environmental data and advise organizations on how to minimize their environmental impact and comply with regulations.',
    },
    {
      title: 'Water Resources Engineer',
      description: 'Water resources engineers design systems for managing water resources, such as stormwater management, wastewater treatment, and irrigation systems, ensuring sustainable use.',
    },
    {
      title: 'Air Quality Specialist',
      description: 'Air quality specialists monitor and assess pollution levels, developing strategies to reduce air contaminants and improve environmental health and safety standards.',
    },
  ],

  'Mechanical Engineering': [
    {
      title: 'Mechanical Design Engineer',
      description: 'Mechanical design engineers create detailed designs and prototypes for mechanical systems, ensuring that they function as intended in various applications.',
    },
    {
      title: 'Manufacturing Engineer',
      description: 'Manufacturing engineers optimize production processes and develop techniques to improve efficiency, reduce waste, and maintain product quality in manufacturing environments.',
    },
    {
      title: 'Automotive Engineer',
      description: 'Automotive engineers design and develop vehicle components and systems, focusing on enhancing performance, safety, and fuel efficiency for different types of vehicles.',
    },
  ],

  'Materials Science and Engineering': [
    {
      title: 'Materials Engineer',
      description: 'Materials engineers analyze and develop new materials for various applications, studying their properties to create products with enhanced performance and durability.',
    },
    {
      title: 'Metallurgist',
      description: 'Metallurgists focus on the properties and performance of metals, developing processes to extract, refine, and shape metals for use in a variety of industries.',
    },
    {
      title: 'Polymer Scientist',
      description: 'Polymer scientists study the chemical properties of polymers, designing new plastic and rubber materials for use in manufacturing and technology industries.',
    },
  ],

  'Industrial Engineering': [
    {
      title: 'Industrial Manufacturing Engineer',
      description: 'As an Industrial Manufacturing Engineer, you will play a pivotal role in ensuring the efficiency, quality, and reliability of our manufacturing processes.',
    },
    {
      title: 'Field Engineer',
      description: 'As a Field Engineer for our Industrial construction, you will have the opportunity to work on a wide variety of projects around the country to build your career with opportunities to grow and advance into higher level positions as your advance your knowledge. You bring your big ideas, commitment to top quality and safety and unwavering work ethic.',
    },
  ],

  'Nuclear Engineering': [
    {
      title: 'Nuclear Facility Safety Engineer',
      description: 'Perform, document, and maintain technical nuclear safety analyses for new and/or existing nuclear facilities/activities, including hazard identification, hazard categorization, hazard analysis, accident analysis, and establishment of hazard controls and their functional requirements',
    },
    {
      title: 'Nuclear Project Engineer',
      description: 'Work to support the mechanical/electrical design, engineering and maintenance needs of the reactor and associated facilities. Participate in the development of major facility systems and experimental instruments.',
    },
  ],

  'Computer Engineering': [
    {
      title: 'Embedded Systems Engineer',
      description: 'Embedded systems engineers design software and hardware systems that operate within larger machines, such as automotive controls or home appliances.',
    },
    {
      title: 'Network Engineer',
      description: 'Network engineers design, implement, and maintain computer networks, ensuring reliable communication between devices and optimal data flow.',
    },
    {
      title: 'Robotics Engineer',
      description: 'Robotics engineers develop robotic systems for industrial and consumer applications, integrating computer engineering and mechanical components to create automated solutions.',
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