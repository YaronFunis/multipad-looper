import React, { useState, useEffect, useRef } from 'react';
import Pad from '../Pad/Pad'
import './Multipad.css';
import playIcon from '../../assets/images/playIcon.png'
import pauseIcon from '../../assets/images/pauseIcon.png'

const Multipad = ({ pads }) => {
    const [playlist, setPlaylist] = useState([]);
    const [isPlaying, setIsPLaying] = useState(false);
    //Used to track the current play interval (8 seconds)
    const [intervalId, setIntervalId] = useState('');
    //used to track current updated playlist
    const listRef = useRef([]);

    //Listens to changes in the playlist array
    useEffect(() => {
        listRef.current = playlist;
    }, [playlist])


    //Updates every audio loop every 8 seconds.
    useEffect(() => {
        if (isPlaying) {
            //Plays the waiting playlist when play button is triggered
            listRef.current.map(t => loopAudio(t));
            const interval = setInterval(() => {
                //Pauses all active audio first - then plays the updated playlist
                listRef.current.map(t => pauseAudio(t));
                listRef.current.map(t => loopAudio(t));
            }, 8000);
            //Tracks the current interva; (8 seconds)
            setIntervalId(interval);
        } else {
            //Pauses the audio when pause button is triggered
            listRef.current.map(t => pauseAudio(t));
            clearInterval(intervalId);
        }
        // Disable dependency warning for intervalId.
        // eslint-disable-next-line
    }, [isPlaying]);

    // recieves a pad and assigning it with an audio track
    const loopAudio = (track) => {
        track.audio = new Audio(track.sound);
        track.audio.loop = true;
        track.audio.play();
    }

    // recieves a pad and pausing its audio track and removing it from the playlist arrary
    const pauseAudio = (track) => {
        if (track.audio) {
            track.audio.pause();
        }
    }

    // triggers the first audio loop when play button is clicked
    const togglePlay = () => {
        setIsPLaying(true);
    }

    // pausing all active audio tracks when pause button is clicked
    const togglePause = () => {
        console.log("paused")
        setIsPLaying(false);
    }

    // handles every click on a pad. recieves status and pad.
    const padClickedHandler = (track) => (status) => {
        // if the pad is turned on
        if (status) {
            // if the pad is not in the playlist
            if (!playlist.find(t => t.id === track.id)) {
                //assign the pad to the playlist
                setPlaylist(prevTracks => [...prevTracks, track])
            }
            // if the pad is turned off
        } else {
            // if pad is already playing
            if (playlist.find(t => t.id === track.id)) {
                pauseAudio(track);
            }
            // removes pad from the playlist
            setPlaylist(playlist.filter(t => t.id !== track.id))
        }
    }
    return (
        <>
            <div className="panel">
                <img src={playIcon} alt="play" onClick={togglePlay} hidden={isPlaying} />
                <img src={pauseIcon} alt="pause" onClick={togglePause} hidden={!isPlaying} />
            </div>
            <div className="controller">
                {pads.map((pad) => {
                    return (
                        <Pad
                            key={pad.id}
                            name={pad.name}
                            color={pad.color}
                            toggle={padClickedHandler(pad)}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Multipad;
