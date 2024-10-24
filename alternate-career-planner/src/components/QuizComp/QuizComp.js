/* QuizComp.js
 * Description: Implements Quiz Component used on the quiz screen.
 * Users answer questions from quizdata.js. Redirects to results
 * screen on completion.
 */

import React, { Component } from 'react'
import { QuizData } from './quizdata2.js'
import { Navigate } from 'react-router-dom'

const majorMapping = {
    I: "Computer Science",
    M: "Computer Engineering",
    N: "Electrical Engineering",
    Q: "Aerospace Engineering",
    J: "Biomedical Engineering",
    K: "Environmental Engineering",
    S: "Chemical Engineering",
    O: "Industrial Engineering",
    R: "Mechanical Engineering",
    L: "Nuclear Engineering",
    P: "Civil Engineering",
    T: "Materials Science and Engineering"
}

export class QuizComp extends Component {
  
    state = {
        currentIndex: 0,
        currentPath: '*',
        options: [],
        userAnswer: null,
        disabled: true,
        quizEnd: false,
        finalMajor: null
    };

    /*
     *  Loads the current question and its options 
     *  into the state based on the current path.
     */
    loadQuiz = () => {
        const { currentPath } = this.state;
        const currentQuestion = QuizData.find(q => q.path === currentPath);

        if (currentQuestion) {
            this.setState({
                question: currentQuestion.question,
                options: currentQuestion.options,
                currentIndex: currentQuestion.id,
                disabled: true,
                userAnswer: null
            });
        }
    };

    /*
     * Handles the user selecting an answer.
     * Updates the userAnswer in state and enables the "Next" button.
     */
    checkAnswer = (selectedAnswer) => {
        const { currentPath } = this.state;
        const currentQuestion = QuizData.find(q => q.path === currentPath);

        const selectedAnswerIndex =
            currentQuestion.options.indexOf(selectedAnswer);

        const newPath = currentQuestion.newPath[selectedAnswerIndex];

        this.setState({
            userAnswer: selectedAnswer,
            disabled: false,
            nextPath: newPath
        });
    };

    /*
     * Moves to the next question.
     * Ends the quiz if the next path is a major.
     */
    nextQuestionHandler = () => {
        const { nextPath } = this.state;

        if (majorMapping[nextPath]) {
            const finalMajor = majorMapping[nextPath];

            localStorage.setItem('finalMajor', finalMajor);

            this.setState({
                quizEnd: true,
                finalMajor: finalMajor
            });
        } else {
            // Otherwise, update the path and load the next question
            this.setState({ currentPath: nextPath }, this.loadQuiz);
        }
    };

    /*
     * Loads the first quiz question.
     * Runs after the component mounts.
     */
    componentDidMount() {
        this.loadQuiz();
    };

    /*
     * Renders the quiz intereface.
     * Displays the final major if the quiz ends.
     */
    render() {
        const { question, options, quizEnd, 
                userAnswer, disabled, finalMajor} = this.state;

        if (quizEnd) {
            return <Navigate to="/results" state={{ finalMajor }} />;
        }

        return (
            <div>
                <h4>{`Question ${this.state.currentIndex + 1}`}</h4>
                <h2>{question}</h2>

                {options.map((option, index) => (
                    <p
                        key={index}
                        className={`options ${userAnswer === option 
                                                ? 'selected' : null}`}
                        onClick={() => this.checkAnswer(option)}
                    >
                        {option}
                    </p>
                ))}

                <button disabled=
                    {disabled} onClick={this.nextQuestionHandler}>
                    Next Question
                </button>
            </div>
        );
    }
}

export default QuizComp
