import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '../components/Button'

// this is done on a server-side
export async function getStaticProps() {
  const url = 'https://restcountries.eu/rest/v2/'
  const countryCapital = 'all?fields=name;capital;'
  const res = await fetch(url + countryCapital)
  const data = await res.json()
  // https://www.geeksforgeeks.org/how-to-implement-a-filter-for-objects-in-javascript/
  const filteredData = data.filter(country => { // if curly braces, use `return`
    const regExp = /^([a-z-,. '()A-Z]{0,})$/;
    // ^ $ - beginning and end of a string. if smth doesn't match, whole test is falsy
    // {0,} - matches 0 or more. if omit, rules in brackets would be only for one char

    if ( regExp.test(country.name) && regExp.test(country.capital) && country.capital !== '' ) {
      return true
    } else {
      return false
    }
  })

  
  return {
    props: {
      filteredData // list of 124 objects with a country and its capital
    }
  }
}

export default function Home({ filteredData }) {
  // console.log(filteredData) // checks if an object is working

  const [randomCapital, setRandomCapital] = useState({}) // object with country and capital
  const [shuffledAnswers, setShuffledAnswers] = useState([]) // array to display as answers

  function generateQuiz() {
    // picks a random object with a country and its capital
    const pickedObject = filteredData[Math.floor(Math.random() * filteredData.length)]
    setRandomCapital(pickedObject) // state for a question (it doesn't set until effect is over)
    console.log(pickedObject)

    let answersList = [pickedObject.name]; // sets up an array with a randomly picked country
    
    for (let i = 0; i < 3; i++) { // a loop to add 3 more variants to the quiz
      const randomCountry = filteredData[Math.floor(Math.random() * filteredData.length)]
      answersList = [...answersList, randomCountry.name]
    }
    
    console.log(answersList) // array with 4 variants of countries (1 is true)

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    setShuffledAnswers(answersList.sort(() => Math.random() - 0.5))
  }
  // console.log(shuffledAnswers) // shuffled array with 4 variants

  useEffect(() => { // runs only on mounting
    generateQuiz()
  }, [])

  const [isAnswered, setIsAnswered] = useState(false) // boolean to display 'next' button
  // console.log(isAnswered)

  const nextBtn = (
    <button
      className={styles.nextBtn}
      onClick={() => {
        generateQuiz()
        setIsAnswered(false)
      }}
    >Next</button>
  )

  return (
    <>
      <Head>
        <title>Country Quiz</title>
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <main>
        <p className={styles.header}>{randomCapital.capital} is the capital of</p>

        {shuffledAnswers.map((country, i) => 
          <Button
            country={country}
            inQuestion={randomCapital}
            isAnswered={(value) => setIsAnswered(value)}
            isAnswerPicked={isAnswered}
            key={i}
          />
        )} {/* passes `onClick` w/ an argument (to store value in `isAnswered`) as a prop */}

        {isAnswered ? nextBtn : null}
      </main>
    </>
  )
}
