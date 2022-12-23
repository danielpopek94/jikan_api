import React from "react";

export const AnimeList = ({animelist}) => {
    return (
        <>
        {
            animelist ?(
                animelist.map((anime,index)=>{
                    return(
                <div key={anime.mal_id} className="card">
                    <img src={anime.images.webp.image_url}/>
                    <div className="anime-info">
                    <h4>{anime.title}</h4>
                    </div>
                </div>
                    )
                })
            ):"Not Found"
        }   
        </>
    )
}