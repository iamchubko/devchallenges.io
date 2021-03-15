import styles from '../styles/Button.module.css'
import { useState, useEffect } from 'react'

export default function Button(props) {
	const [btnClass, setBtnClass] = useState('')
	const [correctCount, setCorrectCount] = useState(0)

	useEffect(function setClassForCorrectAnswer() {
		// loops through all instances of buttons; truthy for one with corresponding country
		if (props.isAnswerPicked && props.correctAnswer.name === props.country) {
			setBtnClass(styles.true)
		} else if (!props.isAnswerPicked && btnClass !== '') {
			setBtnClass('')
		}
	}, [props.isAnswerPicked])

	function handleClick() {
		if (props.correctAnswer.name === props.country) {
			setBtnClass(styles.true)
			setCorrectCount(correctCount + 1)
		} else if (props.correctAnswer.name !== props.country) {
			setBtnClass(styles.false)
		}

		props.isAnswered(true)
	}

	return (
		<button
			className={`${styles.initial} ${btnClass}`}
			onClick={() => {
				handleClick()
				console.log(correctCount)
				props.correctCount(correctCount)
			}}
			disabled={props.isAnswerPicked}
		>
			{props.country}
		</button>
	);
}