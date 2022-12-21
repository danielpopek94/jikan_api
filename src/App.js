import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { AnimeList } from './AnimeList';

function App() {

  const [search,setSearch] = useState('Naruto');
  const [animeData,setAnimeData]=useState();

  const getData = async() => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`);
    const resData = await res.json();
    setAnimeData(resData.data);
    console.log(resData.data);
  }

  useEffect(()=>{
    getData()
  },[search])
   
    
  return (
    <div className="App">
      <header>
        <h3>MyAnimeList</h3>
        <div className='search-box'>
          <input type="search" placeholder="Type anime name here" 
          onChange={(e)=>setSearch(e.target.value)}/>
        </div>
      </header>

      <div className='anime-row'>
        <h2 className='text-heading'>Anime</h2>
        <div className='row'>
          <AnimeList animelist={animeData}/>
        </div>
      </div>

    </div>   
  );
}

export default App;
