import './App.css';
import { useEffect, useState, useRef } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { AnimeList } from './Components/AnimeList';
import { AddToList } from "./Components/AddToList";
import { AnimeInfo } from "./Components/AnimeInfo";
import { RemoveFromList } from "./Components/RemoveFromList";


function App() {
  const [search, setSearch] = useState('');
  const [animeData, setAnimeData] = useState([]);
  const [animeInfo,setAnimeInfo]=useState()
  const [myAnimeList,setMyAnimeList]=useState([])

  const addTo=(anime)=>{
    const index=myAnimeList.findIndex((myanime)=>{
        return myanime.mal_id === anime.mal_id
    })
    if(index < 0){
      const newArray=[...myAnimeList,anime]
      setMyAnimeList(newArray);
    }
    
  }
  const removeFrom=(anime)=>{
    const newArray=myAnimeList.filter((myanime)=>{
      return myanime.mal_id !== anime.mal_id
    })
    setMyAnimeList(newArray)
  }

   // przechowaj poprzednią wartość animeData za pomocą useRef
  const prevAnimeData = useRef();

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`);
      const resData = await res.json();
      
      // jeśli aktualna wartość animeData jest pusta lub niezdefiniowana, ustaw domyślną wartość za pomocą poprzedniej wartości
      setAnimeData(resData.data || prevAnimeData.current);
      prevAnimeData.current = animeData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleOnSearch = (string, results) => {
     setSearch(string);
  };
  const handleOnHover = (result) => {
  };
  const handleOnSelect = (item) => {
  };
  const handleOnFocus = () => {
  };
  const formatResult = (item) => {
    return (
      <>
        <span key={item.name} style={{ display: 'block', textAlign: 'left' }}>
          {item.name}
        </span>
      </>
    );
  };

  const items = animeData ? animeData.map((anime, index) => ({ name: anime.title, id: index })) : [];

  console.log(animeData);
  return (
    <div className="App">
      <header>
        <h3>MyAnimeList</h3>
        <div className="search-box">
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            placeholder="Type anime title"
            formatResult={formatResult}
          />
        </div>

      </header>
      <div className="container">
          <div className="animeInfo">
           {animeInfo && <AnimeInfo animeInfo={animeInfo}/>}
          </div>
          <div className="anime-row">
            <h2 className="text-heading">Anime</h2>
            <div className="row">
                <AnimeList 
                animelist={animeData}
                setAnimeInfo={setAnimeInfo}
                animeComponent={AddToList}
                handleList={(anime)=>addTo(anime)}
                />
            </div>
            <h2 className="text-heading">My List</h2>
            <div className="row">
                <AnimeList 
                animelist={myAnimeList}
                setAnimeInfo={setAnimeInfo}
                animeComponent={RemoveFromList}
                handleList={(anime)=>removeFrom(anime)}
                />
            </div>
          </div>
        </div>

    </div>   
  );
}

export default App;
