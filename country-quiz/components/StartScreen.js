import { useEffect, useState, useRef } from 'react'
import styles from '../styles/StartScreen.module.css'

export default function StartScreen(props) {
	const [type, setType] = useState(['capital'])

	function handleType(e) {
		let value

		if (e.target.checked) {
			// gets previous state and adds new value
			value = [...type, e.target.value]
		} else if (!e.target.checked) {
			value = [...type] // creates a shallow copy of the array
			value.splice(type.indexOf(e.target.value), 1)
		}

		setType(value)
		props.setQuizType(value)
	}

	
	const [quantity, setQuantity] = useState(30)
	
	function handleQuantity(e) {
		if (e.target.value !== '') {
			const inNumber = Math.round(Number(e.target.value))
			props.setQuizQuantity(inNumber)
			setQuantity(inNumber)
		}
	}
	
	
	const [isRadio, setIsRadio] = useState(true)
	const radioRef1 = useRef(null)
	const radioRef2 = useRef(null)
	const radioRef3 = useRef(null)
	const radioRef4 = useRef(null)
	const [inputClass, setInputClass] = useState(null)

	useEffect(function handleRadio() {
		if (isRadio) {
			setInputClass(null)
		} else {
			radioRef1.current.checked = false
			radioRef2.current.checked = false
			radioRef3.current.checked = false
			radioRef4.current.checked = false
			setInputClass(styles.number__chosen)
		}
	}, [isRadio])

	function handleNumber(e) {
		if (e.target.value !== '' && e.target.value <= props.filteredLength) {
			setIsRadio(false)
		}
	}
	

	function handleSubmit(e) {
		e.preventDefault()
		if (type.length !== 0 && quantity > 0 && quantity <= props.filteredLength) {
			props.changeScreen('quiz')
			props.generateObjects()
		} else if (type.length === 0) {
			alert('Please, choose the type of questions')
		} else {
			alert(`Please, type a number between 1 and ${props.filteredLength}`)
		}
	}

	const [buttonText, setButtonText] = useState()
	const [buttonClass, setButtonClass] = useState()

	useEffect(function acceptInput() {
		if (type.length !== 0 && quantity > 0 && quantity <= props.filteredLength) {
			setButtonClass(styles.startBtn__true)
			setButtonText('Start a game')
		} else {
			setButtonClass(styles.startBtn__false)
			setButtonText('Set up your game')
		}
	}, [type, quantity])

	return (
		<>
			<form className={styles.form}>
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Choose the type of questions</legend>
					<label className={styles.label} htmlFor='capital'>
						<input
							className={styles.checkbox}
							type='checkbox'
							defaultChecked
							id='capital'
							value='capital'
							onChange={(e) => handleType(e)}
						/>
						<span className={styles.customCheckbox}></span>
					Capital of a country</label>
					<label className={styles.label} htmlFor='flag'>
						<input
							className={styles.checkbox}
							type='checkbox'
							id='flag'
							value='flag'
							onChange={(e) => handleType(e)}
						/>
						<span className={styles.customCheckbox}></span>
					Flag of a country</label>
				</fieldset>

				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>How many questions do you want in total?</legend>
					{/* https://flaviocopes.com/react-forms/ */}
					<label className={styles.label} htmlFor='ultimate'>
						<input
							type='radio'
							name='quantity'
							value={props.filteredLength}
							onChange={(e) => {
								handleQuantity(e)
								setIsRadio(true)
							}}
							id='ultimate'
							className={styles.radio}
							ref={radioRef1}
						/>
						<span className={styles.customRadio}></span>
					Ultimate — {props.filteredLength}</label>

					<label className={styles.label} htmlFor='half'>
						<input
							type='radio'
							name='quantity'
							value='120'
							onChange={(e) => {
								handleQuantity(e)
								setIsRadio(true)
							}}
							id='half'
							className={styles.radio}
							ref={radioRef2}
						/>
						<span className={styles.customRadio}></span>
					Half marathon — 120</label>

					<label className={styles.label} htmlFor='quarter'>
						<input
							type='radio'
							name='quantity'
							value='60'
							onChange={(e) => {
								handleQuantity(e)
								setIsRadio(true)
							}}
							id='quarter'
							className={styles.radio}
							ref={radioRef3}
						/>
						<span className={styles.customRadio}></span>
					Quarter mile — 60</label>

					<label className={styles.label} htmlFor='oneEighth'>
						<input
							type='radio'
							name='quantity'
							value='30'
							defaultChecked
							onChange={(e) => {
								handleQuantity(e)
								setIsRadio(true)
							}}
							id='oneEighth'
							className={styles.radio}
							ref={radioRef4}
						/>
						<span className={styles.customRadio}></span>
					Geography teacher — 30</label>

					<label className={styles.label} htmlFor='yours'>
						0 &lt; 
						<input
							className={`${styles.number} ${inputClass}`}
							type='number'
							name='quantity'
							onChange={(e) => {
								handleNumber(e)
								handleQuantity(e)
							}}
							onClick={(e) => {
								handleNumber(e)
								handleQuantity(e)
							}}
							id='yourNumber'
							min='1'
							max={props.filteredLength}
							placeholder='or type yours'
						/>
						 &lt; {props.filteredLength}
					</label>
				</fieldset>

				<button
					className={`${styles.startBtn} ${buttonClass}`}
					onClick={(e) => handleSubmit(e)}
				>{buttonText}</button>
			</form>
		</>
	)
}