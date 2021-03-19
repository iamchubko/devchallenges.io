import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

import Head from 'next/head'
import StartScreen from '../components/StartScreen'
import ResultsScreen from '../components/ResultsScreen'
import QuizScreen from '../components/QuizScreen'

// this is done on a server-side
export async function getStaticProps() {
  const response = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;flag;')
  const data = await response.json()

  return {
    props: {
      data // array of 250 objects with country, capital and flag
    }
  }
}

export default function Home({ data }) {
  const [dataCopy, setDataCopy] = useState(data)
  const [quizQuantity, setQuizQuantity] = useState(30)
  const [quizType, setQuizType] = useState(['capital']) // array with types of questions

  const [mainObject, setMainObject] = useState({}) // object with country, capital and flag
  const [shuffledAnswers, setShuffledAnswers] = useState([]) // array to display as answers

  useEffect(function filterData() {
    // https://holycoders.com/javscript-copy-array/
    let filteredData = data.slice()

    // if only 'capital` checkbox is checked, data will be filtered
    // otherwise, copy of the original data will be set
    if (quizType.length === 1 && quizType.includes('capital')) {
      // https://www.geeksforgeeks.org/how-to-implement-a-filter-for-objects-in-javascript/
      filteredData = filteredData.filter(country => { // if curly braces, use `return`
        if (country.capital !== '') {
          return true
        } else {
          return false
        }
      })
    }
    
    setDataCopy(filteredData)
  }, [quizType]) // triggers when types of questions change

  function generateObjects() {
    // picks a random object w/ country, capital and flag
    const randomIndex = Math.floor(Math.random() * dataCopy.length)
    const pickedObject = dataCopy[randomIndex]
    // console.log(`%c${pickedObject.name}`, 'font-size:1rem;color:green')
    dataCopy.splice(randomIndex, 1) // removes picked object from array
    setMainObject(pickedObject) // state for a question (it doesn't set until effect is over)
    
    let answersList = [pickedObject.name]; // sets up an array with a randomly picked country
    
    for (let i = 0; i < 3; i++) { // a loop to add 3 more variants to the quiz
      const randomCountry = dataCopy[Math.floor(Math.random() * dataCopy.length)]
      answersList = [...answersList, randomCountry.name]
    }
    
    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    // argument is a function that generates a number > or < than 0; sorts accordingly 
    setShuffledAnswers(answersList.sort(() => Math.random() - 0.5))
  }

  const [currentScreen, setCurrentScreen] = useState('start')
  const [currentScreenElement, setCurrentScreenElement] = useState()

  const [correctCount, setCorrectCount] = useState(0)

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
          setCorrectCount={(number) => setCorrectCount(number)}
        />
      )
    } else if (currentScreen === 'start') {
      setCurrentScreenElement(
        <StartScreen
          dataLength={data.length}
          filteredLength={dataCopy.length}
          setQuizType={(type) => setQuizType(type)}
          setQuizQuantity={(quantity) => setQuizQuantity(quantity)}
          changeScreen={(string) => setCurrentScreen(string)}
          generateObjects={() => generateObjects()}
        /> 
      )
    } else if (currentScreen === 'results') {
      setCurrentScreenElement(
        <ResultsScreen
          correctCount={correctCount}
          setCurrentScreen={(string) => setCurrentScreen(string)}
          setQuizType={(string) => setQuizType(string)}
          setQuizQuantity={(string) => setQuizQuantity(string)}
          resetCounter={(number) => setCorrectCount(number)}
        />
      )
    } else {
      alert(`There's an error in displaying current screen`)
    }
  }, [currentScreen, mainObject, dataCopy])


  return (
    <>
      <Head>
        <title>Country Quiz</title>
        <meta name='description' content='Country quiz with 200+ questions and different variations' />
        <link rel="icon" href="/devchallenges.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&Montserrat:wght@500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <h1
          className={styles.header}
          onClick={() => {
            setCurrentScreen('start')
            setQuizType(['capital'])
            setQuizQuantity(30)
            setCorrectCount(0)
          }}
          tabIndex={0}
        >Country quiz</h1>
        <article className={styles.article}>
          {currentScreenElement}
        </article>
        <footer className={styles.footer}>
          coded by <span className={styles.footer__github}><a href='https://github.com/iamchubko'>Kirill Chubko</a></span> - <a href='https://devchallenges.io/'>devChallenges.io</a>
        </footer>
      </main>
    </>
  )
}
