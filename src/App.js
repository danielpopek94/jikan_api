import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { AnimeList } from './AnimeList';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function App() {

  const [search,setSearch] = useState('Naruto');
  const [animeData,setAnimeData]=useState();

  const getData = async() => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`);
    const resData = await res.json();
    setAnimeData(resData.data);
  }

  useEffect(()=>{
    getData()
  },[search])
   
  const items = animeData;

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string);
    setSearch(string);
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    console.log('chuj');
    /*let animeTitles = new Array;

    animeData.array.forEach(e => {
      animeTitles.push(e.title);
    })*/
  
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>title: {item.title}</span>
      </>
    )
  }
  console.log(animeData);
  return (
    <div className="App">
      <header>
        <h3>MyAnimeList</h3>
        <div className='search-box'>
           <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            placeholder = "Type anime title"
            formatResult={formatResult}
          />
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
