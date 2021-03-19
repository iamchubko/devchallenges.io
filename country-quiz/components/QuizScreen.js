import { useState, useEffect, useRef } from 'react'
import styles from '../styles/QuizScreen.module.css'
import AnswerButton from './AnswerButton'

export default function QuizScreen(props) {
  const [isAnswered, setIsAnswered] = useState(false) // boolean to display 'next' button
  const [callToAction, setCallToAction] = useState('Next')
  const [counter, setCounter] = useState(1)
  const [correctCount, setCorrectCount] = useState(0)

  useEffect(function generateQuestion() {
    if (!isAnswered) {
      props.setCorrectCount(correctCount)

      // if one type has been chosen
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
        alert(`Type of question hasn't been chosen`)
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
      <div className={styles.flagContainer}>
        <img src={props.mainObject.flag} className={styles.flag} alt={`Didn't you think it would be that easy, huh?`} />
      </div>
      <p className={styles.question}>Which country does this flag belong to?</p>
    </>
  )

  

  // sets up references for DOM elements
  // names should be empty until they're attached to their respective elements
  const nextBtnRef = useRef(null)
  
    useEffect(function focusOnButtons() {
      if (isAnswered) {
        nextBtnRef.current.focus()
      }
    }, [isAnswered])

  const nextBtn = (
    <button
      className={styles.nextBtn}
      onClick={() => {
        props.generateObjects()
        setIsAnswered(false)
        setCounter(counter + 1)
      }}  
      ref={nextBtnRef}
    >{callToAction}</button>    
  )    


  const [article, setArticle] = useState('are')

  useEffect(function changeArticle() {
    if (correctCount === 1) {
      setArticle('is')
    } else {
      setArticle('are')
    }
  }, [correctCount])

  
  return (
    <>
      <img className={styles.vector} src='/images/adventure.svg' alt='vector image of a man with a bagpack standing next to a big globe' />
      <p className={styles.totalCounter}>
        <span className={styles.currentCounter}>{counter}</span>
        {' '}/ {props.quizQuantity}  &#183; <span className={styles.correctCounter}>{correctCount}</span> {article} correct
      </p>

      {questionPara}

      <ol className={styles.buttonList}>
        {props.shuffledAnswers.map((country, i) => 
          <AnswerButton
            country={country}
            correctAnswer={props.mainObject}
            correctCount={correctCount}
            setCorrectCount={(number) => setCorrectCount(number)}
            setIsAnswered={(boolean) => setIsAnswered(boolean)}
            isAnswered={isAnswered}
            key={i}
            id={i}
          />
        )}
      </ol>

      {isAnswered ? nextBtn : null}
    </>
  )
}
