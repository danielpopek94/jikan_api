import { useEffect } from 'react';

function App() {
  const getData = async() => {
    const res = await fetch("https://api.jikan.moe/v4/anime?q=naruto&sfw");
    const resData = await res.json();
    console.log(resData);
  }

  useEffect(()=>{
    getData()
  },[])
   
    
  return (
    <div className="App">
      <h3>fsdfsdf</h3>
      <div>{getData}</div>
    </div>
  );
}

export default App;
