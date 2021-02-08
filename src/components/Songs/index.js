import React, { Fragment, useContext } from 'react';
import {SongsContext} from './../../contexts/SongsContext';
import SearchTracks from './SearchTracks';
import Tracks from './Tracks';
import ProgressBar from './../Common/ProgressBar';
import Message from './../Common/Message';
import ButtonPrimary from './../Common/ButtonPrimary';


const Songs = () => {
    const { validateQTrack, doneFetch, tracks, text } = useContext(SongsContext);
    
    return (
        <Fragment>
            <SearchTracks validateQTrack={validateQTrack} />
            {
                doneFetch ? 
                    (tracks.length ? <Tracks text={text} tracks={tracks} /> : <Message text={text} />)
                
                : 
                    <ProgressBar />
            }
            <ButtonPrimary type="back" to="/"/>
        </Fragment>
    )
};

export default Songs;