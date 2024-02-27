import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const App = ()=> {

  const data_URL= "https://www.omdbapi.com/?apikey=bc280d2c";
  const [data, setData]=useState([]);
  const [searchTerm, setSearchTerm]=useState('');

  const searchMovie = async(title)=>{
    const response= await fetch(`${data_URL}&s=${title}`);
    const {Search}= await response.json();
    setData(Search);
  };
  useEffect(()=>{
    searchMovie("Avengers");
  },[]);

  return (
    <div className='app'>
    <h1>MovieLand</h1>

    <div className="search">
      <input 
      type="text" 
      placeholder='Enter the movie name' 

      onChange={(e)=>{setSearchTerm(e.target.value)}}
      />

      
      <img 
      src={SearchIcon}
      alt="search" 
      onClick={()=>{searchMovie(searchTerm)}} />
    </div>

    {data?.length > 0 ? 
      ( <div className="container">
        {data.map(moviedata => <MovieCard movie={moviedata}/> )}
      </div>)
    :(
      <div className="empty">
        <h2>No Movies Found</h2>
      </div>
    )}
   
    </div>
  );
}

export default App