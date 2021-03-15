import { useState, useEffect } from 'react'
import styles from '../styles/QuizScreen.module.css'
import AnswerButton from './AnswerButton'
// import StartScreen from '../components/StartScreen'
// import ResultsScreen from '../components/ResultsScreen'

export default function QuizScreen(props) {
  const [isAnswered, setIsAnswered] = useState(false) // boolean to display 'next' button
  const [callToAction, setCallToAction] = useState('Next')
  const [counter, setCounter] = useState(1)
  const [correctCount, setCorrectCount] = useState()

  useEffect(function generateQuestion() {
    if (!isAnswered) {
      props.correctCount(correctCount)

      // process type (capital, flag)
      if (props.quizType.length === 1) {
        if (props.quizType.includes('capital')) {
          setQuestionPara(capitalPara)
        } else if (props.quizType.includes('flag')) {
          setQuestionPara(flagPara)
        }

      } else if (props.quizType.includes('capital' && 'flag')) {
        // https://stackoverflow.com/a/36756480/13285338
        const randomBoolean = Math.random() < 0.5 // generates random boolean
        setQuestionPara(randomBoolean ? capitalPara : flagPara)
        console.log('array length more that 1, includes both')

      } else {
        console.log('props.quizType must be empty')
      }
    }

    if (counter === props.quizQuantity) {
      setCallToAction('Show results')
    }

    if (counter >= props.quizQuantity) {
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

      {questionPara}

      {props.shuffledAnswers.map((country, i) => 
        <AnswerButton
          country={country}
          correctAnswer={props.mainObject}
          isAnswered={(boolean) => setIsAnswered(boolean)}
          correctCount={(number) => setCorrectCount(number)}
          isAnswerPicked={isAnswered}
          key={i}
        />
      )}

      {isAnswered ? nextBtn : null}
    </>
  )
}
