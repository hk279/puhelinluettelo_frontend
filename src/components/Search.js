import React from "react";

const Search = ({ changeHandler }) => {
    return (
        <div className="m-4">
            <p>Search:</p>
            <input className="input" onChange={(e) => changeHandler(e)} />
        </div>
    );
};

export default Search;
