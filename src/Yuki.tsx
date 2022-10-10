import React from 'react';
import yukiImg from './img/yuki.png';

const Yuki: React.FC = () => {
    return (
        <>
            <div className="elementTitle">Yuki</div>
            <img src={yukiImg}></img>
        </>
    );
}

export default Yuki;