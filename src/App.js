import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quotes from "./components/quotes/Quotes"
import { Loader } from "react-feather";
import "./App.css";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import Message from "./components/Message";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setfavoriteQuotes] = useState(JSON.parse(window.localStorage.getItem("favoriteQuotes")) || []); 
  const [messageText, setMessageText] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  
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

  useEffect(() => {
    window.localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
    }, [favoriteQuotes]);
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  };

  const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;

  const addToFavorites = (quoteId, Message) => {
    const selectedQuote = quotes.find((quote) => quote.id === quoteId);
  

    const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id);
    
      if (alreadyFavorite) {
        setMessageText("This quote is already in your favorite! Choose another.");
        setShowMessage(true);
      } else if (favoriteQuotes.length < maxFaves) {
        setMessageText("Added to favorites!");
        setShowMessage(true);
        setfavoriteQuotes([...favoriteQuotes, selectedQuote]);
      } else {
        setMessageText("You have reached your max.")
        setShowMessage(true);
      }
     };  
    
    const removeFromFavorites = (quoteId) => {
      const updatedFavorites = favoriteQuotes.filter((quote) => quote.id !== quoteId);
      setfavoriteQuotes(updatedFavorites);
    };

    const removeMessage = () => {
      setShowMessage(false);
    };

   
  return (
    <div className='App'>
      {showMessage && <Message messageText={messageText} removeMessage={removeMessage} />}
      <Header />
      <main>
        <FavoriteQuotes favoriteQuotes={favoriteQuotes} maxFaves={maxFaves} removeFromFavorites={removeFromFavorites}/>
        {loading ? (<Loader />) : (<Quotes 
        categories={categories} 
        category={category} 
        handleCategoryChange={handleCategoryChange}
        filteredQuotes={filteredQuotes}
        addToFavorites={addToFavorites}
        favoriteQuotes={favoriteQuotes} />)}
      </main>
      <Footer />
    </div>
  );
}
export default App;
