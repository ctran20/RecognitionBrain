import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma2'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='600px' height='auto' />
                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} />
            </div>
        </div>
    );
};

export default FaceRecognition;