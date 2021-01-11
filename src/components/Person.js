import React from "react";

const Person = ({ name, number, clickHandler }) => {
    return (
        <p>
            {name} {number} <button onClick={() => clickHandler()}>Delete</button>
        </p>
    );
};

export default Person;
