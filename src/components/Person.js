import React from "react";

const Person = ({ name, number, clickHandler }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td>
                <button className="danger" onClick={() => clickHandler()}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default Person;
