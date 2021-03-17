import styles from '../styles/ResultsScreen.module.css'

export default function ResultsScreen(props) {
	return (
		<>
			<h2>Results</h2>
			<p>You got {props.correctCount} correct answers</p>
			<button
				onClick={() => {
					props.currentScreen('start')
					props.quizType(['capital']) // resets data to original state
					props.resetCounter(0)
				}}
			>Try again</button>
		</>
	)
}