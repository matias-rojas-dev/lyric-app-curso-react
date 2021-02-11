import React, { createContext, useState, useEffect } from "react";
import { chartTracksGet, trackSearch } from "./../constants";

export const SongsContext = createContext();
// SongsContext será la encargada de crear el context 

const SongsContextProvider = ({ children }) => { // siempre que se trabaja con contexts necesitamos una props 
  const [doneFetch, setDoneFetch] = useState(); // -> verifica si está hecha la carga de datos
  const [currentQTrack, setCurrentQTrack] = useState(""); // -> manejamos la consulta (query)
  const [text, setText] = useState("Top Songs In Us"); // -> da un texto inicial
  const [tracks, setTracks] = useState([]); // -> arreglo de los tracks

  // life cycle: montado, actualizado, desmontado
  useEffect(() => getTopTracks(), []);

  const getTopTracks = () => { // función para obtener la lista de mejores tracks
    fetch(chartTracksGet())
      .then((res) => res.json())
      .then((data) => {
        setDoneFetch(true); //actualizamos la carga
        setTracks(data.message.body.track_list); //actualizamos los datos de las tracks
      })
      .catch((err) => console.log(err));
  };

  const getTracks = (q_track) => {
    fetch(trackSearch(q_track))
      .then((res) => res.json())
      .then((data) => {
        const { track_list } = data.message.body;
        setDoneFetch(true);
        setText(track_list.length ? "Results" : "No Results");
        setTracks(track_list);
      })
      .catch((err) => console.log(err));
  };

  const validateQTrack = (e, q_track = document.querySelector('#q_track').value.toLowerCase().trim()) => {
    if (e.type === 'keypress' && e.key !== 'Enter') return;
    const words = q_track.match(/\w+/g);
    q_track = words && words.join(' ');
    if (q_track && q_track !== currentQTrack) {
      setCurrentQTrack(q_track);
      setDoneFetch(false);
      getTracks(q_track);
    }
  }

  return (
    <SongsContext.Provider value={{ doneFetch, text, tracks, validateQTrack }}>
      { children}
    </SongsContext.Provider>
  );
};

export default SongsContextProvider;