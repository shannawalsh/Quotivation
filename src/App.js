import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quotes from "./components/quotes/Quotes"
import { Loader } from "react-feather";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setfavoriteQuotes] = useState([]); 
  
 const maxFaves = 3;

  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  
  const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];


  const fetchQuotes = async () => {
    try {
      setLoading(true);
       const response = await fetch
       (quotesUrl);
       const results = await response.json();
       setQuotes(results);
      } catch (error) {
       console.log("Something went wrong", error);
      }
      setLoading(false);
    };

  useEffect(() => {
    fetchQuotes();
  }, []);
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  };

  const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;

  const addToFavorites = (quoteId) => {
    const selectedQuote = quotes.find((quote) => quote.id === quoteId);
    //console.log(selectedQuote);

    const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id);
    
      if (alreadyFavorite) {
        console.log("This quote is already in your favorite! Choose another.")
      } else if (favoriteQuotes.length < maxFaves) {
        console.log("Added to favorites!");
        setfavoriteQuotes([...favoriteQuotes, selectedQuote]);
      } else {
        console.log("Max reached.")
      }
     };  

  return (
    <div className='App'>
      <Header />
      <main>
        <section className="favorite-quotes">
          <div className="wrapper quotes">
            <h3>Top 3 favorite quotes</h3>
            {favoriteQuotes.length > 0 && JSON.stringify(favoriteQuotes)}
            <div className="favorite-quotes-description">
              <p>You can add up to 3 favorites by selecting from the options below. 
              <br/>
              Once you choose, they will appear here:</p>
            </div>
          </div>
        </section>
        {loading ? (<Loader />) : (<Quotes 
        categories={categories} 
        category={category} 
        handleCategoryChange={handleCategoryChange}
        filteredQuotes={filteredQuotes}
        addToFavorites={addToFavorites} />)}
      </main>
      <Footer />
    </div>
  );
}
export default App;
