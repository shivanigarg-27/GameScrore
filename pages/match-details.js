import React from 'react';
import CricketScrore from '../components/CricketScore/CricketScrore';
import KabaddiScore from '../components/KabaddiScore/KabaddiScrore';

//container for sub component
const MatchDetails = () => (
    <div>
        <CricketScrore />       
        <KabaddiScore />
        <style jsx>
        {
            `
            button {
                background-color: aqua;
                border-color: aqua;
                padding: 10px 20px;
            }
            
            `
        }
        </style>
    </div>
)

export default MatchDetails