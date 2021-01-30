import React from "react";

export const Add = ({ nameChangeHandler, numberChangeHandler, clickHandler }) => {
    return (
        <div className={"m-4"}>
            <form onSubmit={(e) => clickHandler(e)}>
                <div>
                    <p>Name:</p>
                    <input className="input" onChange={(e) => nameChangeHandler(e)} />
                </div>
                <div>
                    <p>Number:</p>
                    <input className="input" onChange={(e) => numberChangeHandler(e)} />
                </div>
                <button className="primary" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
};

export default Add;
