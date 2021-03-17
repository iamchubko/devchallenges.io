import { useState } from 'react'
import styles from '../styles/StartScreen.module.css'

export default function StartScreen(props) {
	const [type, setType] = useState(['capital'])

	function handleType(e) {
		let value

		if (e.target.checked) {
			// gets previous state and adds new value
			value = [...type, e.target.value]
		} else if (!e.target.checked) {
			value = [...type] // 
			value.splice(type.indexOf(e.target.value), 1)
		}

		setType(value)
		props.quizType(value)
	}

	const [removeRadio, setRemoveRadio] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()
		if (type.length !== 0) {
			props.changeScreen('quiz')
			props.generateObjects()
		} else {
			alert('please, choose the type of questions')
		}
	}

	return (
		<>
			<form>
				<fieldset>
					<legend>Choose the type of questions</legend>
					<label className={styles.label} htmlFor='capital'>
						<input
							type='checkbox'
							defaultChecked
							id='capital'
							value='capital'
							onChange={(e) => handleType(e)}
						/>
					Capital of a country</label>
					<label className={styles.label} htmlFor='flag'>
						<input
							type='checkbox'
							id='flag'
							value='flag'
							onChange={(e) => handleType(e)}
						/>
					Flag of a country</label>
				</fieldset>

				<fieldset>
				<legend>How many questions do you want in total?</legend>
					{/* https://flaviocopes.com/react-forms/ */}
					<label className={styles.label} htmlFor='ultimate'>
						<input
							type='radio'
							name='quantity'
							onChange={() => props.quizQuantity(props.filteredLength)}
							id='ultimate'
							className={styles.radioBtn}
						/>
					Ultimate ({props.filteredLength})</label>

					<label className={styles.label} htmlFor='half'>
						<input
							type='radio'
							name='quantity'
							onChange={() => props.quizQuantity(Math.round(props.dataLength / 2))} // rounds off if props.dataLength is odd 
							id='half'
							className={styles.radioBtn}
						/>
					Half marathon ({Math.round(props.dataLength / 2)})</label>

					<label className={styles.label} htmlFor='quarter'>
						<input
							type='radio'
							name='quantity'
							onChange={() => props.quizQuantity(Math.round(props.dataLength / 4))}
							id='quarter'
							className={styles.radioBtn}
						/>
					Quarter mile ({Math.round(props.dataLength / 4)})</label>

					<label className={styles.label} htmlFor='oneEighth'>
						<input
							type='radio'
							name='quantity'
							defaultChecked
							onChange={() => props.quizQuantity(Math.round(props.dataLength / 8))}
							id='oneEighth'
							className={styles.radioBtn}
						/>
					Geography teacher ({Math.round(props.dataLength / 8)})</label>

					<label className={styles.label} htmlFor='your'>
						<input
							type='radio'
							name='quantity'
							id='your'
							className={styles.radioBtn}
						/>
						Choose your number:
						<input
							type='number'
							name='quantity'
							onChange={e => props.quizQuantity(Math.round(Number(e.target.value)))}
							id='yourNumber'
							min='1'
							max={props.filteredLength}
						/>
					</label>
				</fieldset>

				<button
					className={styles.startBtn}
					onClick={(e) => handleSubmit(e)}
				>Start a game</button>
			</form>
		</>
	)
}