import { useState, useEffect } from 'react'
import styles from '../styles/QuizScreen.module.css'
import AnswerButton from './AnswerButton'

export default function QuizScreen(props) {
  const [isAnswered, setIsAnswered] = useState(false) // boolean to display 'next' button
  const [callToAction, setCallToAction] = useState('Next')
  const [counter, setCounter] = useState(1)
  const [correctCount, setCorrectCount] = useState(0)

  useEffect(function generateQuestion() {
    if (!isAnswered) {
      props.correctCount(correctCount)

      // if one type is chosen
      if (props.quizType.length === 1) {
        if (props.quizType.includes('capital')) {
          setQuestionPara(capitalPara)
        } else if (props.quizType.includes('flag')) {
          setQuestionPara(flagPara)
        }

      } else if (props.quizType.includes('capital' && 'flag')) {
        // if current country w/o capital, set flag question automatically
        if (props.mainObject.capital === '') {
					setQuestionPara(flagPara)
        } else {
          // https://stackoverflow.com/a/36756480/13285338
          const randomBoolean = Math.random() < 0.5 // generates random boolean
          setQuestionPara(randomBoolean ? capitalPara : flagPara)
        }
				
      } else {
        alert('props.quizType must be empty')
      }
    }

    if (counter === props.quizQuantity) {
      setCallToAction('Show results')
    }

    if (counter > props.quizQuantity) {
      props.showResults('results')
    }
  }, [props.mainObject])


  const [questionPara, setQuestionPara] = useState()
  
  const capitalPara = (
    <p className={styles.question}>{props.mainObject.capital} is the capital of</p>
  )
    
  const flagPara = (
    <>
      <img src={props.mainObject.flag} className={styles.flag} alt={`Didn't you think it would be that easy, huh?`} />
      <p className={styles.question}>Which country does this flag belong to?</p>
    </>
  )
  
  const nextBtn = (
    <button
      className={styles.nextBtn}
      onClick={() => {
        props.generateObjects()
        setIsAnswered(false)
        setCounter(counter + 1)
      }}
    >{callToAction}</button>
  )

  
  return (
    <>
      <p className={styles.counter}>#{counter} of {props.quizQuantity}</p>
      <p className={styles.counter}>{correctCount} is correct</p>

      {questionPara}

      {props.shuffledAnswers.map((country, i) => 
        <AnswerButton
          country={country}
          correctAnswer={props.mainObject}
          correctCount={correctCount}
          setCorrectCount={(number) => setCorrectCount(number)}
          setIsAnswered={(boolean) => setIsAnswered(boolean)}
          isAnswered={isAnswered}
          key={i}
        />
      )}

      {isAnswered ? nextBtn : null}
    </>
  )
}
