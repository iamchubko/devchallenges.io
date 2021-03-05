import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const url = 'https://quote-garden.herokuapp.com/api/v3/';
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const [updateRandomQuote, setUpdateRandomQuote] = useState(true); // generates random quote
  const [isFirstMount, setIsFirstMount] = useState(true);
  useEffect(() => {
    async function random() {
      const btn = document.getElementById('random');
      btn.classList.add('spin'); // adds spinning animation to pseudo-element
      
      const urlRandom = 'quotes/random';
      const response = await fetch(url + urlRandom);
      const object = await response.json();
      const {quoteText, quoteAuthor, quoteGenre} = object.data[0];
      
      // assigns fetched values to states
      setText(quoteText);
      setGenre(quoteGenre);
      setAuthor(quoteAuthor);

      setMoreFromAuthorBtn(true); // returns button with author and genre
      setQuoteArray([]); // removes added quotes if needed

      btn.classList.remove('spin'); // removes spinning animation from pseudo-element
      setUpdateRandomQuote(false);
      if (isFirstMount) setIsFirstMount(false);
    }

    if (updateRandomQuote) random(); // call the function if true
  }, [updateRandomQuote]); // use effect only when this state changes


  const [moreQuotes, setMoreQuotes] = useState(false);
  const [quoteArray, setQuoteArray] = useState([]);
  useEffect(() => {
    async function addMoreQuotes() {
      const urlMoreQuotes = 'quotes';
      const urlParam = `?author=${author}&limit=3`; // 3 because there can be repeated quote
      const response = await fetch(url + urlMoreQuotes + urlParam);
      const object = await response.json();

      let quoteArray = [];
      for (let i = 0; i < object.data.length; i++) {
        quoteArray[i] = object.data[i].quoteText;
      }

      setQuoteArray(quoteArray.filter(quote => quote !== text).splice(0, 2)); // removes repeated quote and leaves first 2 items

      setMoreQuotes(false);
      setMoreFromAuthorBtn(false);
    }

    if (moreQuotes) addMoreQuotes();
  }, [moreQuotes]);


  const [moreFromAuthorBtn, setMoreFromAuthorBtn] = useState(true);

  const header = (
    <h2 className='author'>{author}</h2>
  );

  const button = (
    <button id='more-quotes' onClick={() => setMoreQuotes(true)}>
      <span className='more-quotes__author'>{author}</span>
      <span className='more-quotes__genre'>{genre}</span>
    </button>
  );

  const firstQuote = (
    <blockquote>
      <p className='quote'>{text}</p>
    </blockquote>
  );

  return (
    <main>
      <button id='random' onClick={() => setUpdateRandomQuote(true)}>random</button>
      <article className='content'>
        {moreFromAuthorBtn ? null : header}
        {isFirstMount ? null : firstQuote}
        {moreFromAuthorBtn ? button : null} 
        {quoteArray.map((quote, i) => 
          <blockquote>
            <p className='quote' key={i}>{quote}</p>
          </blockquote>
        )}
      </article>
    </main>
  );
}
