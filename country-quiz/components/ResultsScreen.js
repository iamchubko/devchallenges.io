import { useState, useEffect } from 'react'
import styles from '../styles/ResultsScreen.module.css'

export default function ResultsScreen(props) {

	return (
		<>
			<h2>Results</h2>
			<p>You got {props.correctCount} correct answers</p>
			<button>Try again</button>
		</>
	)
}