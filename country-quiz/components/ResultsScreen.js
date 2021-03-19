import { useEffect, useState, useRef } from 'react'
import styles from '../styles/ResultsScreen.module.css'

export default function ResultsScreen(props) {
	const [word, setWord] = useState('answers')

	useEffect(function setPlural() {
		if (props.correctCount === 1) {
			setWord('answer')
		} else {
			setWord('answers')
		}
	}, [props.correctCount])

	const [counterColor, setCounterColor] = useState('')
	const [isDisplayed, setIsDisplayed] = useState(true)
	const vector = (
		<img className={styles.vector} src='/images/winners.svg' alt='vector image of happy people near a golden cup' />
	)

	useEffect(function displayImage() {
		if (props.correctCount === 0) {
			setCounterColor(styles.low)
			setIsDisplayed(false)
		} else {
			setCounterColor('')
			setIsDisplayed(true)
		}
	}, [props.correctCount])

	
	const tryAgainBtnRef = useRef(null)

	useEffect(function focusOnButton() {
		tryAgainBtnRef.current.focus()
	})


	return (
		<>
			{isDisplayed ? vector : null}
			<h2 className={styles.header}>Results</h2>
			<p className={styles.para}>You got 
				<span className={`${styles.counter} ${counterColor}`}>
					{' '}{props.correctCount}{' '}
				</span>
			 correct {word}</p>
			<button
				className={styles.button}
				onClick={() => {
					props.setCurrentScreen('start')
					props.setQuizType(['capital']) // resets type to the original state
					props.setQuizQuantity(30) // resets quantity to the original state
					props.resetCounter(0)
				}}
				ref={tryAgainBtnRef}
			>Try again</button>
		</>
	)
}