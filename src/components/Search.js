import React from "react";

const Search = ({ changeHandler }) => {
    return (
        <div>
            Filter: <input onChange={(e) => changeHandler(e)} />
        </div>
    );
};

export default Search;
