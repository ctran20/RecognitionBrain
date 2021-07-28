import React from 'react';
import Tilt from 'react-tilt';
import brain from './logo.png'
import './Logo.css';

const Logo = () => {

    return (
        <div>
            <div className="ma4">
                <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner pa2">
                        <img src={brain} alt='logo' />
                    </div>
                </Tilt>
            </div>
        </div>

    );
};

export default Logo;