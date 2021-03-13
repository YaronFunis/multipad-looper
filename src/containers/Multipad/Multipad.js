import React, { useState, useEffect, useRef } from 'react';
import Pad from '../Pad/Pad'
import './Multipad.css';

const Multipad = ({ pads }) => {
    const [playlist, setPlaylist] = useState([]);
    const [tracklist, setTracklist] = useState([]);
    const [isPlaying, setIsPLaying] = useState(false);
    const [intervalId, setIntervalId] = useState('');
    const listRef = useRef([]);
    useEffect(() => {
        listRef.current = tracklist;
    }, [tracklist])


    //Updates every audio loop every 8 seconds.
    useEffect(() => {
        if (isPlaying) {
            listRef.current.map(t => loopAudio(t));
            const interval = setInterval(() => {
                console.table(listRef.current);
                listRef.current.map(t => pauseAudio(t));
                listRef.current.map(t => loopAudio(t));
                console.log("This will run every 8 second!");
            }, 8000);
            setIntervalId(interval);
            return () => {
                //clearInterval(interval);
            }
        } else {
            // pause
            listRef.current.map(t => pauseAudio(t));
            clearInterval(intervalId);
        }
    }, [isPlaying]);

    //updates the playlist constantly on changes in the tracklist array
    // useEffect(() => {
    //     tracklist.forEach((track) => {
    //         if (!playlist.find(t => t === track)) {
    //             setPlaylist((prevTracks) => [...prevTracks, track]);
    //         }
    //     });
    // }, [tracklist, playlist])

    // recieves a pad and assigning it an audio track
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
        // setPlaylist(playlist.filter(t => t !== track))
    }

    // triggers the first audio loop when play button is clicked
    const togglePlay = () => {
        setIsPLaying(true);
        //playlist.map(t => loopAudio(t))
    }

    // pausing all active audio tracks when pause button is clicked
    const togglePause = () => {
        console.log("paused")
        //     tracklist.map(t => pauseAudio(t));
        setIsPLaying(false);
    }

    // handles every click on a pad. recieves status and pad.
    const padClickedHandler = (track) => (status) => {
        // if the pad is turned on
        if (status) {

            // if the pad is not in the tracklist
            if (!tracklist.find(t => t.id === track.id)) {
                //assign the pad to the tracklist
                setTracklist(prevTracks => [...prevTracks, track])
            }
            // if the pad is turned off
        } else {
            // if pad is already playing
            if (tracklist.find(t => t.id === track.id)) {
                pauseAudio(track);
            }
            // removes pad from the tracklist
            setTracklist(tracklist.filter(t => t.id !== track.id))

        }
    }

    return (
        <>
            <button className="button-play" onClick={togglePlay} disabled={isPlaying}>Play</button>
            <button className="button-pause" onClick={togglePause} disabled={!isPlaying}>Pause</button>
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
