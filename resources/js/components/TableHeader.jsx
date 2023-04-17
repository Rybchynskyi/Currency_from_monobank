import React from 'react';

const TableHeader = (props) => {
    return (
        <div>
            <h1>{props.mainText}</h1>
            <p className={(props.isOnline)?"textGreen":"textRed"}> • Websocket port is {(props.isOnline)?"online":"offline"}</p>
        </div>
    );
};

export default TableHeader;
