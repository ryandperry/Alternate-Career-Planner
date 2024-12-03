
# Alternate Career Planner
![Logo](https://i.imgur.com/JPuGrjA.png)

## Project Description

Students in Tickle College of Engineering often get into their major and realize that they love engineering, but want a different specialty. Alternate Career Planner allows students to upload their DARS report webpage (in HTML) and view all other engineering majors ranked from the least number of remaining course requirements. Additionally, students can take a short quiz to determine what majors they would most enjoy based on their outside interests or hobbies.

## Screenshot
![Screenshot1](https://i.imgur.com/h3aoBGZ.jpeg)

## Installation
### Prerequisites

- npm
- Node.js
- Python
- Flask
- pandas
- flask-cors

### Buidling

Clone the GitHub repository.
```
git clone https://github.com/utk-cs340-fall24/Alternate-Career-Planner
```

Navigate to the `alternate-career-planner` directory within the repository. This contains the React.js project.
```
cd Alternate-Career-Planner/alternate-career-planner
```

Install the Node.js packages for the project.
```
npm install
```

Start the React application.
```
npm start
```

This should open a new browser window of Alternate Career Planner. This instance of ACP is running locally on your machine. If a browser window does not immediately appear, open a browser and visit `http://localhost:3000`.

Open a new terminal window and navigate to the `data_collection` directory.
```
cd Alternate-Career-Planner/data_collection
```

Start the Flask server.
```
flask run
```

Flask will now run in the background at `http://localhost:5000`.

### Usage

After running a local instance of Alternate Career Planner using the above instructions, users will be presented with instructions to upload a file or take an interest quiz. After completing an interest quiz, a suggested major will be presented alongside a list of all majors and their descriptions. After uploading a file, three majors will be returned that have the highest overlap. The ideal user is someone from catalog year 2023-2024 who began at UTK. Other transfer credits or undergraduate course histories of a graduate student may not be applicable to the database. 

## Technologies Used

![ReactBadge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JSBadge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTMLBadge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSSBadge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![PythonBadge](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![FlaskBadge](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)

This project was built with React.js, involving HTML, CSS, and JavaScript. Additionally, Python and Flask were used to analyze documents and determine suggested majors.


## Project Members

- Emily Constantin (Github ID: e4met)
- Kale Dodson (Github ID: KaleDod)
- Beatrice Eldridge (Github ID: bea-eldridge)
- Jack Minehan (Github ID: jckmnhn)
- Ryan Perry (Github ID: ryandavidperry)

## License and Usage of UTK Assets
This project uses the MIT license with additional terms for the usage of UTK assets. See `License.txt` for more details.
Please note that some assets from utk.edu, including images, descriptions, and colors, were used for the private scope of this project and are not intended to be used publicly without permission.
