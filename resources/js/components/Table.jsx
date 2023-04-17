import React from 'react';

const Table = (props) => {

    return (
        <div>
            <table className="table">
                <tbody>
                <tr className="tableHead">
                    <th>currency Code-A</th>
                    <th>currency Code-B</th>
                    <th>date</th>
                    <th>rateBuy</th>
                    <th>rateCross</th>
                    <th>rateSell</th>
                </tr>
                {props.currency.length > 0 ? (
                    props.currency.map((item, index) =>
                        <tr key={index.toString()}>
                            <td>{item.currencyCodeA}</td>
                            <td>{item.currencyCodeB}</td>
                            <td>{item.date}</td>
                            <td>{item.rateBuy}</td>
                            <td>{item.rateCross}</td>
                            <td>{item.rateSell}</td>
                        </tr>
                    )
                ) : (
                    <tr>
                        <td colSpan="6">Press "Start websocket" for getting currecny</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
