import React from "react";

export const AnimeList = ({ animelist, setAnimeInfo }) => {
  
    return (
      <>
        {animelist ? (
          animelist.map((anime) => {
            return (
              <div key={anime.mal_id} className="card" onClick={() => setAnimeInfo(anime)}>
                <img src={anime.images.webp.image_url} alt={anime.title} />
                <div className="card-text">
                  <h3>{anime.title}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <p>No anime found</p>
        )}
      </>
    );
  };
  