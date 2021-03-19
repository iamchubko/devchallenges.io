import styles from '../styles/AnswerButton.module.css'
import { useState, useEffect, useRef } from 'react'

export default function Button(props) {
	const [btnClass, setBtnClass] = useState('')

	useEffect(function setClassesForButtons() {
		// loops through all instances of buttons;

		// if answer is picked and it is correct one
		if (props.isAnswered && props.correctAnswer.name === props.country) {
			setBtnClass(styles.true)
		} 
		
		// if answer isn't picked
		if (!props.isAnswered) {
			setBtnClass('')
		}
	}, [props.isAnswered])

	function handleColoring() { // colors clicked answer
		if (props.correctAnswer.name === props.country) {
			setBtnClass(styles.true)

      // sets value to callback because each instance has its own state
			props.setCorrectCount(props.correctCount + 1)
		} else {
			setBtnClass(styles.false)
		}
	}

  const answerBtnRef = useRef(null)

  useEffect(function focusOnButton() {
    if (!props.inAnswered && answerBtnRef.current.id == 0) {
      answerBtnRef.current.focus()
    }
  }, [props.isAnswered])

	return (
    <li className={styles.li}>
      <button
        id={props.id}
        className={`${styles.button} ${btnClass}`}
        onClick={() => {
          handleColoring()
          props.setIsAnswered(true)
        }}
        disabled={props.isAnswered}
        ref={answerBtnRef}
		  >
        {props.country}
      </button>
    </li>
	)
}