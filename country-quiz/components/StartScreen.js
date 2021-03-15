import { useState, useEffect } from 'react'
import styles from '../styles/StartScreen.module.css'

export default function StartScreen(props) {
	const [quantity, setQuantity] = useState(Math.round(props.length / 8));

	const [type, setType] = useState([])
	function handleType(e) {
		// console.log(e.target.checked)
		if (e.target.checked) {
			// console.log(e.target.value + ' checked')
			setType([...type, e.target.value])
		} else if (!e.target.checked && type.includes(e.target.value)) {
			// console.log(e.target.value + ' unchecked')
			type.splice(type.indexOf(e.target.value), 1)
		}
	}

	console.log(type)

	const [removeRadio, setRemoveRadio] = useState(false)


	function handleSubmit(e) {
		e.preventDefault()
		if (type.length !== 0) {
			console.log(quantity)
			props.generateObjects()
			props.gatherInput('quiz', quantity, type)
		} else {
			alert('please, choose the type of questions')
		}
	}

	return (
		<>
			<form>
				<fieldset>
				<legend>How many questions do you want in total?</legend>
					{/* https://flaviocopes.com/react-forms/ */}
					<label className={styles.label} htmlFor='ultimate'>
						<input
							type='radio'
							name='quantity'
							value='ultimate'
							onChange={() => setQuantity(props.length)}
							id='ultimate'
							className={styles.radioBtn}
						/>
					Ultimate ({props.length})</label>

					<label className={styles.label} htmlFor='half'>
						<input
							type='radio'
							name='quantity'
							value='half'
							onChange={() => setQuantity(Math.round(props.length / 2))} // rounds off if props.length is odd 
							id='half'
							className={styles.radioBtn}
						/>
					Half marathon ({Math.round(props.length / 2)})</label>

					<label className={styles.label} htmlFor='quarter'>
						<input
							type='radio'
							name='quantity'
							value='quarter'
							onChange={() => setQuantity(Math.round(props.length / 4))}
							id='quarter'
							className={styles.radioBtn}
						/>
					Quarter mile ({Math.round(props.length / 4)})</label>

					<label className={styles.label} htmlFor='oneEighth'>
						<input
							type='radio'
							name='quantity'
							value='58585'
							defaultChecked
							onChange={() => setQuantity(Math.round(props.length / 8))}
							id='oneEighth'
							className={styles.radioBtn}
						/>
					Geography teacher ({Math.round(props.length / 8)})</label>

					<label className={styles.label} htmlFor='your'>
						<input
							type='radio'
							name='quantity'
							value='your'
							id='your'
							className={styles.radioBtn}
						/>
						Choose your number:
						<input
							type='number'
							name='quantity'
							onChange={e => {
								setQuantity(Math.round(Number(e.target.value)))
							}}
							id='yourNumber'
							min='1'
							max={props.length}
						/>
					</label>
				</fieldset>

				<fieldset>
					<legend>Choose the type of questions</legend>
					<label className={styles.label} htmlFor='capital'>
						<input
							type='checkbox'
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

				<button
					className={styles.startBtn}
					onClick={(e) => handleSubmit(e)}
				>Start a game</button>
			</form>
		</>
	)
}