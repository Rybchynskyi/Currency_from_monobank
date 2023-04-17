import React from "react";
import {useState} from 'react';
import Table from "./Table";
import TableHeader from "./TableHeader";

const App = () => {
    const [currency, setCurrency] = useState({})
    const [actionButton, setActionButton] = useState('Start webSocket')
    const [mainText, setMainText] = useState('Currency')
    const [isOnline, setIsOnline] = useState(false)

    const myWs = new WebSocket('ws://localhost:8080');

    myWs.onopen = function () {
        setIsOnline(true)
    };

    myWs.onmessage = function (message) {
        let res = JSON.parse(message.data);
        console.log(res);
        setCurrency(res)
    };

    myWs.onclose = function () {
        setIsOnline(false)
    };

    function sendRequest() {
        if(actionButton === 'Start webSocket'){
            if (isOnline){
                myWs.send('sendRequest');
                setActionButton('Stop webSocket');
                setMainText('Actual currency');
            }
            else {
                return false;
            }
        }
        else if(actionButton === 'Stop webSocket'){
            setActionButton('Start webSocket')
            setMainText('Currency')
        }
    }

    return (
        <div className="App">
            <button className="fancy" onClick={sendRequest}>
                <span className="top-key"></span>
                <span className="text">{actionButton}</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
            </button>

            <TableHeader mainText={mainText} isOnline={isOnline}/>

            <Table currency={currency}/>
        </div>
    )
}

export default App
