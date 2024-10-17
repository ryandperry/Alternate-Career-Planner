/* QuizComp.js
 * Description: Implements Quiz Component used on the quiz screen.
 * Users answer questions from quiszdata.js. Their answers are displayed
 * after finishing the quiz.
 */

import React, { Component } from 'react'
import { QuizData } from './quizdata.js'
import { Link } from 'react-router-dom'

export class QuizComp extends Component {
  
    state = {
        currentIndex: 0,
        options: [],
        score: 0,
        disabled: true,
        quizEnd: false,
        userAnswer: null,
        userAnswers: []
    }

    loadQuiz = () => {
        const {currentIndex} = this.state
        this.setState(() => {
            return {
                question: QuizData[currentIndex].question,
                options: QuizData[currentIndex].options,
            }
        })
    }

    checkAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            disabled: false
        })
    }

    nextQuestionHandler = () => {
        const {userAnswer, score, userAnswers, currentIndex} 
            = this.state;
        userAnswers[currentIndex] = userAnswer
        this.setState ({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null,
            disabled: true,
            userAnswers: userAnswers
        })
    }

    prevQuestionHandler = () => {
        this.setState ({
            currentIndex: this.state.currentIndex - 1,
            userAnswer: null,
            disabled: true 
        }) 
    }

    finishHandler = () => {
        const {userAnswer, score, userAnswers, currentIndex} 
            = this.state;
        userAnswers[currentIndex] = userAnswer

        this.setState({
            quizEnd: true,
            userAnswers: userAnswers    
        })
    }

    componentDidMount() {
        this.loadQuiz();
    }

    componentDidUpdate(prevProps, prevState) {
        const {currentIndex} = this.state

        if (this.state.currentIndex !== prevState.currentIndex) {
            this.setState(() => {
                return {
                    question: QuizData[currentIndex].question,
                    options: QuizData[currentIndex].options,
                }
            })
           
        }
    }

    render() {
          const {question, options, currentIndex, userAnswer, quizEnd,
                 userAnswers} = this.state
          
          if (quizEnd) {
              return (
                  <div>
                      <h2>You finished the quiz!</h2>
                      <p>Here's how you answered:</p>

                      <ul>
                          {QuizData.map((item, index) => (
                              <li key={index}>
                                  <strong>Q: {item.question}</strong>
                                  <br />
                                  {userAnswers[index]}
                              </li>
                          ))}
                      </ul>
                      
                      <div className='buttons'>
                          <Link to='/'>
                              <button className='upload-button'>
                                  Return Home
                              </button>
                          </Link>

                          <button className='quiz-button'
                            onClick={() => window.location.reload()}>
                              Retake Quiz
                          </button>
                      </div>
                  </div>
              )
          }

          return (
              <div>
                  <h2>{question}</h2>
                  <h4>{`Question ${currentIndex+1} of 
                       ${QuizData.length}`}</h4>
                  
                  {
                      options !== null? options.map(option =>
                          <p key={option.id} className={`options 
                          ${userAnswer == option?  "selected": null}`}
                          onClick={() => this.checkAnswer(option)}>
                              {option}   
                          </p>
                      ): <span>...</span>
                  }
                  {currentIndex < QuizData.length && 
                      currentIndex > 0 &&
                      <button
                      onClick={this.prevQuestionHandler}>
                          Previous Question
                      </button>
                  }
                  {currentIndex < QuizData.length - 1 &&
                      <button disabled = {this.state.disabled}
                      onClick={this.nextQuestionHandler}>
                          Next Question
                      </button>
                  }
                  {currentIndex === QuizData.length - 1 &&
                      <button disabled = {this.state.disabled}
                      onClick={this.finishHandler}>
                          Finish Quiz
                      </button>
                  }

              </div>
          )
    }
}

export default QuizComp
