import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '../components/Button'

// this is done on a server-side
export async function getStaticProps() {
  const response = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;flag;languages;')
  const data = await response.json()

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
      filteredData // list of 124 objects with a country, capital and flag
    }
  }
}

export default function Home({ filteredData }) {
  // console.log(filteredData) // checks if an object is passed correctly
  
  const [isCapitalQuestion, setIsCapitalQuestion] = useState(false)
      
  const [randomObject, setRandomObject] = useState({}) // object with country, capital and flag
  const [shuffledAnswers, setShuffledAnswers] = useState([]) // array to display as answers

  function generateQuiz() {
    // https://stackoverflow.com/a/36756480/13285338
    const randomBoolean = Math.random() < 0.5 // generates random boolean
    setIsCapitalQuestion(randomBoolean)
    
    // picks a random object w/ country, capital and flag
    const pickedObject = filteredData[Math.floor(Math.random() * filteredData.length)]
    setRandomObject(pickedObject) // state for a question (it doesn't set until effect is over)
    console.log(pickedObject)

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
  // console.log(shuffledAnswers) // shuffled array with 4 variants

  useEffect(() => { // runs only on mounting
    generateQuiz()
  }, [])

  const capitalPara = (
    <p className={styles.question}>{randomObject.capital} is the capital of</p>
  )
    
  const flagPara = (
    <>
      <img src={randomObject.flag} className={styles.flag} alt={`Didn't you think it would be that easy, huh?`}></img>
      <p className={styles.question}>Which country does this flag belong to?</p>
    </>
  )


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

      <main className={styles.wrapper}>
        {isCapitalQuestion ? capitalPara : flagPara}

        {shuffledAnswers.map((country, i) => 
          <Button
            country={country}
            inQuestion={randomObject}
            isAnswered={(value) => setIsAnswered(value)}
            isAnswerPicked={isAnswered}
            key={i}
          />
        )}

        {isAnswered ? nextBtn : null}
      </main>
    </>
  )
}
