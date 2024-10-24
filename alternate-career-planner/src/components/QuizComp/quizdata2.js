/* quizdata2.js
 * Description: Stores quiz questions and their options.
 */

export const QuizData = [
    {
        path:     '*',
        id:        0,

        question: 'Which of the following topics are you '
                + 'most interested in studying?',

        options:  ['Hardware and software aspects of computer systems',
                   'Challenges in biology and medicine',
                   'Designing and building systems and machines',
                   'Properties of materials at the atomic level'],

        newPath:  ['A', 'B', 'C', 'D']
    },
    {
        path:     'A',
        id:        1,

        question: 'How do you like to pass your time?',

        options: ['Building computers',
                  'Playing video games',
                  'Playing with electronics',
                  'Solving puzzles'],

        newPath: ['E', 'I', 'E', 'I']
    },
    {
        path:     'B',
        id:        1,

        question: 'How do you like to pass your time?',

        options: ['Trying new recipes',
                  'Reviewing academic journals',
                  'Lifting weights',
                  'Working in the garden'],

        newPath: ['K', 'J', 'J', 'K']
    },
    {
        path:     'C',
        id:        1,

        question: 'How do you like to pass your time?',

        options: ['Playing sports',
                  'Volunteering',
                  'Building something in the shed',
                  'Working on a project car'],

        newPath: ['F', 'F', 'G', 'G']
    },
    {
        path:     'D',
        id:        1,

        question: 'How do you like to pass your time?',

        options: ['Working outdoors',
                  'Trying new recipes',
                  'Watching documentaries',
                  'Sewing'],

        newPath: ['L', 'H', 'L', 'H']
    },
    {
        path:     'E',
        id:        2,

        question: 'Would you rather ...',

        options: ['Design computer systems',
                  'Develop new radar and communication systems',
                  'Work on machines that control power plants',
                  'Create new software'],

        newPath: ['M', 'N', 'N', 'M']
    },
    {
        path:     'F',
        id:        2,

        question: 'Would you rather ...',

        options: ['Improve the productivity of systems and processes',
                  'Collaborate with many different people',
                  'Build a bridge',
                  'Work on a construction site'],

        newPath: ['O', 'O', 'P', 'P']
    },
    {
        path:     'G',
        id:        2,

        question: 'Would you rather ...',

        options: ['Travel to space',
                  'Work on air-conditioning systems',
                  'Build a robot',
                  'Design a jet engine'],

        newPath: ['Q', 'R', 'R', 'Q']
    },
    {
        path:     'H',
        id:        2,

        question: 'Would you rather ...',

        options: ['Manufacture gasoline',
                  'Develop new materials for computer chips',
                  'Improve waste water systems',
                  'Test the durability of golf clubs'],

        newPath: ['S', 'T', 'S', 'T']
    }
]
