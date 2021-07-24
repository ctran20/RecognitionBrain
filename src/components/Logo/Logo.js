import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
    //<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    return (
        <div>
            <div className="ma4">
                <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner pa3">
                        <img style={{ paddingTop: '1px' }} src={brain} alt='logo' />
                    </div>
                </Tilt>
            </div>
        </div>

    );
};

export default Logo;