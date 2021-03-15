import { useState, useEffect } from 'react'
import styles from '../styles/QuizScreen.module.css'

import Head from 'next/head'
import StartScreen from '../components/StartScreen'
import ResultsScreen from '../components/ResultsScreen'
import QuizScreen from '../components/QuizScreen'

// this is done on a server-side
export async function getStaticProps() {
  const response = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;flag;languages;')
  const data = await response.json()

  // https://www.geeksforgeeks.org/how-to-implement-a-filter-for-objects-in-javascript/
  const filteredData = data.filter(country => { // if curly braces, use `return`
    const regExp = /^([a-z-,. '()A-Z]{0,})$/;
    // ^ $ - beginning and end of a string. if smth doesn't match, whole test is falsy
    // {0,} - matches 0 or more. if omit, rules in brackets would be only for one char

    if (country.capital !== '') {
      return true
    } else {
      return false
    }
  })


  return {
    props: {
      filteredData // list of 124 objects with a country, capital and flag
    }
  }
}

export default function Home({ filteredData }) {
  const [mainObject, setMainObject] = useState({}) // object with country, capital and flag
  const [shuffledAnswers, setShuffledAnswers] = useState([]) // array to display as answers

  function generateObjects() {
    // picks a random object w/ country, capital and flag
    const randomIndex = Math.floor(Math.random() * filteredData.length)
    const pickedObject = filteredData[randomIndex]
    filteredData.splice(randomIndex, 1) // removes picked object from array
    console.log(pickedObject)
    setMainObject(pickedObject) // state for a question (it doesn't set until effect is over)
    
    let answersList = [pickedObject.name]; // sets up an array with a randomly picked country
    
    for (let i = 0; i < 3; i++) { // a loop to add 3 more variants to the quiz
      const randomCountry = filteredData[Math.floor(Math.random() * filteredData.length)]
      answersList = [...answersList, randomCountry.name]
    }
    
    console.log(answersList) // array with 4 variants of countries (1 is true)
    
    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    // argument is a function that generates  a number > or < than 0; sorts accordingly 
    setShuffledAnswers(answersList.sort(() => Math.random() - 0.5))
  }
  console.log(shuffledAnswers)


  const [currentScreen, setCurrentScreen] = useState('start')
  const [currentScreenElement, setCurrentScreenElement] = useState()

  const [quizQuantity, setQuizQuantity] = useState()
  const [quizType, setQuizType] = useState([]) // possibly multiple values

  const [correctCount, setCorrectCount] = useState()

  useEffect(function changeCurrentScreen() {
    if (currentScreen === 'quiz') {
      setCurrentScreenElement(
        <QuizScreen
          generateObjects={generateObjects}
          mainObject={mainObject}
          shuffledAnswers={shuffledAnswers}
          quizQuantity={quizQuantity}
          quizType={quizType}
          showResults={(string) => setCurrentScreen(string)}
          correctCount={(number) => setCorrectCount(number)}
        />
      )
    } else if (currentScreen === 'start') {
      setCurrentScreenElement(
        <StartScreen
          length={filteredData.length}
          generateObjects={() => generateObjects()}
          gatherInput={(string, quantity, type) => {
            setCurrentScreen(string)
            setQuizQuantity(quantity)
            setQuizType(type)
          }}
        /> 
      )
    } else if (currentScreen === 'results') {
      setCurrentScreenElement(
        <ResultsScreen
          correctCount={correctCount}
        />
      )
    } else {
      alert(`There's an error in displaying current screen`)
    }
  }, [mainObject, shuffledAnswers])


  return (
    <>
      <Head>
        <title>Country Quiz</title>
        <link rel="icon" href="/devchallenges.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.wrapper}>
        {currentScreenElement}
      </main>
    </>
  )
}
