import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {

  const [search,setSearch] = useState('Naruto');
  const [animeData,setAnimeData]=useState();

  const getData = async() => {
    const res = await fetch("https://api.jikan.moe/v4/anime?q=naruto&sfw");
    const resData = await res.json();
    setAnimeData(resData.data);
  }

  useEffect(()=>{
    getData()
  },[])
   
    
  return (
    <div className="App">
      <h3>MyAnimeList</h3>
      <div className='search-box'>
        <input type="search" placeholder="Type anime name here" 
        onChange={(e)=>setSearch(e.target.value)}/>
      </div>
    </div>
  );
}

export default App;
