import './App.css';
import { useEffect, useState } from 'react';
import { AnimeList } from './AnimeList';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function App() {
  const [search, setSearch] = useState('');
  const [animeData, setAnimeData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`);
      const resData = await res.json();
      setAnimeData(resData.data);
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
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
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
