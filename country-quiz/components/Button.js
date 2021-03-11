import styles from '../styles/Button.module.css'
import { useState, useEffect } from 'react'

export default function Button(props) {
	const [btnClass, setBtnClass] = useState('')

	useEffect(function setClassForCorrectAnswer() {
		// loops through all instances of buttons, truthy for one with corresponding country
		if (props.isAnswerPicked && props.inQuestion.name === props.country) {
			setBtnClass(styles.true)
		} else if (!props.isAnswerPicked && btnClass !== '') {
			setBtnClass('')
		}
		// console.log('this nigga should run 4 times in a row ' + props.isAnswerPicked)
	}, [props.isAnswerPicked])

	function handleClick() {
		if (props.inQuestion.name === props.country) {
			setBtnClass(styles.true)
		} else if (props.inQuestion.name !== props.country) {
			setBtnClass(styles.false)
		}

		props.isAnswered(true)
	}

	return (
		<button
			className={`${styles.initial} ${btnClass}`}
			onClick={() => handleClick()}
			disabled={props.isAnswerPicked}
		>
			{props.country}
		</button>
	);
}