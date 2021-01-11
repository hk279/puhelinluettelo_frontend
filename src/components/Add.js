import React from "react";

export const Add = ({ nameChangeHandler, numberChangeHandler, clickHandler }) => {
    return (
        <div>
            <form onSubmit={(e) => clickHandler(e)}>
                <div className="input-line">
                    <p>Name:</p>
                    <input onChange={(e) => nameChangeHandler(e)} />
                </div>
                <div className="input-line">
                    <p>Number:</p>
                    <input onChange={(e) => numberChangeHandler(e)} />
                </div>
                <button className="add-button" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
};

export default Add;
