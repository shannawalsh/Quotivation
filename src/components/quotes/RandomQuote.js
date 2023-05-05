import React from "react";
import QuoteCard from "./QuoteCard";

const RandomQuote = ({ randomQuote, addToFavorites, displayAnotherRandomQuote }) => (
  <section className='random-quote'>
    <header>
      <h3>Random Quote</h3>
      <button onClick={displayAnotherRandomQuote}>Another!</button>
    </header>
    <QuoteCard quote={randomQuote} addToFavorites={addToFavorites} />
  </section>
);

export default RandomQuote;
