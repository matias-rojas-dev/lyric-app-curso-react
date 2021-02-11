import React, { createContext, useState, useEffect } from "react";
import { trackLyricsGet, trackGet } from "./../constants";

export const LyricsContext = createContext();

const LyricsContextProvider = ({ children }) => {
  const commontrack_id = window.location.pathname.split("/")[3]; // manejamos el contexto de la ventana y el path 
  const [doneFetchTrack, setDoneFetchTrack] = useState(false); // verificar si está cargado el track
  const [doneFetchLyrics, setDoneFetchLyrics] = useState(false); // verificar si está cargada la letra
  const [track, setTrack] = useState([]);
  const [lyrics, setLyrics] = useState([]);

  useEffect(() => getTrack(commontrack_id), [commontrack_id]);
  useEffect(() => getLyrics(commontrack_id), [commontrack_id]);

  const getTrack = (commontrack_id) => { // https://developer.musixmatch.com/documentation/api-reference/track-chart-get
    fetch(trackGet(commontrack_id))
      .then((res) => res.json())
      .then((data) => {
        const { body } = data.message; // extraigo el body 
        setDoneFetchTrack(true); // actualizamos el track
        !Array.isArray(body) && setTrack(body.track);
        console.log(!Array.isArray(body))
      })
      .catch((err) => console.log(err));
  };

  const getLyrics = (commontrack_id) => { // https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get
    fetch(trackLyricsGet(commontrack_id))
      .then((res) => res.json())
      .then((data) => {
        const { body } = data.message;
        setDoneFetchLyrics(true);
        !Array.isArray(body) && setLyrics(body.lyrics.lyrics_body); // obtenemos la lyric del track
      })
      .catch((err) => console.log(err));
  };

  return (
    <LyricsContext.Provider
      value={{ doneFetchTrack, doneFetchLyrics, track, lyrics }}
    >
      {children}
    </LyricsContext.Provider>
  );
};

export default LyricsContextProvider;