import beat1 from '../src/assets/audio/beat1.mp3'
import beat2 from '../src/assets/audio/beat2.mp3'
import beat3 from '../src/assets/audio/beat3.mp3'
import drums1 from '../src/assets/audio/drums1.mp3'
import drums2 from '../src/assets/audio/drums2.mp3'
import drums3 from '../src/assets/audio/drums3.mp3'
import ebguitar from '../src/assets/audio/ebguitar.mp3'
import eguitar from '../src/assets/audio/eguitar.mp3'
import organ from '../src/assets/audio/organ.mp3'

export const trackList = [
    {
        id: 1,
        name: 'Breakbeat',
        sound: beat1,
        color: 'red',
        isActive: false
    },
    {
        id: 2,
        name: 'Future Beat',
        sound: beat2,
        color: 'orange',
        isActive: false
    },
    {
        id: 3,
        name: 'Distorted Beat',
        sound: beat3,
        color: 'yellow',
        isActive: false
    },
    {
        id: 4,
        name: 'Funky Drums',
        sound: drums1,
        color: 'greenyellow',
        isActive: false
    }, 
    {
        id: 5,
        name: 'Groovey Drums',
        sound: drums2,
        color: 'green',
        isActive: false
    },
    {
        id: 6,
        name: 'Tanggu Drums',
        sound: drums3,
        color: 'darkolivegreen',
        isActive: false
    },
    {
        id: 7,
        name: 'Bass Guitar',
        sound: ebguitar,
        color: 'blue',
        isActive: false
    },
    {
        id: 8,
        name: 'Electric Guitar',
        sound: eguitar,
        color: 'purple',
        isActive: false
    },
    {
        id: 9,
        name: 'Organ',
        sound: organ,
        color:'cyan',
        isActive: false
    },
];

export default trackList;