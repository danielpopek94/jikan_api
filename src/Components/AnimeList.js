import React from "react";
import { AnimeInfo } from "./AnimeInfo";

export const AnimeList = ({animelist}) => {

    const [selectedAnime, setSelectedAnime] = React.useState(null);

    const handleClick = (anime) => {
        setSelectedAnime(anime);
        props.onSelectAnime(anime);
    }

    return (
        <>
        {
            animelist ?(
                animelist.map((anime,index)=>{
                    return(
                <div key={anime.mal_id} className="card" onClick={()=>handleClick(anime)}>
                    <img src={anime.images.webp.image_url}/>
                    <div className="anime-info">
                    <h4>{anime.title}</h4>
                    </div>
                </div>
                    )
                })
            ):"Not Found"
        }  
        {selectedAnime && <AnimeInfo animeInfo={selectedAnime} />} 
        </>
    )
}