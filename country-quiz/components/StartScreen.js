import { useState, useEffect } from 'react'
import styles from '../styles/StartScreen.module.css'

export default function StartScreen(props) {
	const [quantity, setQuantity] = useState('');
	function handleQuantity(e) {
		setQuantity(e.target.value)

	}

	const [mode, setMode] = useState([])
	function handleMode(e) {
		// console.log(e.target.checked)

		if (e.target.checked) {
			setMode([...mode, e.target.value])
		} else if (!e.target.checked && mode.includes(e.target.value)) {
			// console.log('unchecked')
			mode.splice(mode.indexOf(e.target.value), 1)
		}

	}
	// console.log(mode)

	function handleSubmit() {
		props.isSubmited(false, quantity, mode)
	}

	return (
		<>
			<div>{quantity}</div>

			<p>How many questions do you want?</p>
				{/* https://flaviocopes.com/react-forms/ */}
				<label className={styles.label} htmlFor='ultimate'>
					<input
						type='radio'
						name='quantity'
						value='ultimate'
						onChange={e => handleQuantity(e)}
						id='ultimate'
						className={styles.radioBtn}
					 />
				Ultimate (220+)</label>

				<label className={styles.label} htmlFor='half'>
					<input
						type='radio'
						name='quantity'
						value='half'
						onChange={e => setQuantity(e.target.value)}
						id='half'
						className={styles.radioBtn}
					/>
				Half marathon</label>

				<label className={styles.label} htmlFor='quarter'>
					<input
						type='radio'
						name='quantity'
						value='quarter'
						onChange={e => setQuantity(e.target.value)}
						id='quarter'
						className={styles.radioBtn}
					/>
				Quarter mile</label>

				{/* <label class={styles.label} htmlFor='yourNumber'>Choose your number:
					<input
						type='number'
						name='quantity'
						onChange={e => setQuantity(e.target.value)}
						id='yourNumber'
						min='1'
						max={props.objectsNumber}
					/>
				</label> */}

			<p>Choose the type of questions</p>
				<label className={styles.label} htmlFor='capital'>
					<input
						type='checkbox'
						id='capital'
						value='capital'
						onChange={(e) => handleMode(e)}
					/>
				Capital of a country</label>
				<label className={styles.label} htmlFor='flag'>
					<input
						type='checkbox'
						id='flag'
						value='flag'
						onChange={(e) => handleMode(e)}
					/>
				Flag of a country</label>

				<button
					className={styles.startBtn}
					onClick={() => handleSubmit()}
				>Start a game</button>
		</>
	)
}