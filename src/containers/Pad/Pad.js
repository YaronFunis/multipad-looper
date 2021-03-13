import React, { useState } from 'react';
import './Pad.css'

const Pad = (props) => {
    //State tracking whether pad is ON/OFF
    const [isActive, setIsActive] = useState(false);

    return (
        <div >
            <div className="pad"
                onClick={() => {
                    setIsActive(!isActive);
                    props.toggle(!isActive);
                }}>
                <div className="color"
                    style={isActive ? { backgroundColor: props.color } : { backgroundColor: 'dimgray' }}>
                </div>
                <div className="text"
                   style={isActive ? { color: 'white' } : { color: 'red' }}>                    
                    {props.name}
                </div>
            </div>
        </div>
    );
}
export default Pad;