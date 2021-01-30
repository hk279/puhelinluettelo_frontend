import "./App.css";
import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Add from "./components/Add";
import Person from "./components/Person";
import Notification from "./components/Notification";
// Separate module for server operations.
import service from "./crud_service";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        service.getAll().then((res) => {
            setPersons(res);
        });
    }, []);

    const handleAddClick = (e) => {
        e.preventDefault();

        service
            .create({ name: newName, number: newNumber })
            .then(() => service.getAll())
            .then((result) => {
                setPersons(result);
                setError(false);
                setMessage("Added " + newName);
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            })
            .catch((err) => {
                let errorMessage = err.response.data.errorMessage;

                // If exact match exists
                if (errorMessage === "Duplicate name. Duplicate number.") {
                    errorMessage = "Identical entry already exists.";
                }
                // If the name already exists, asks if user wants to update.
                else if (errorMessage === "Duplicate name.") {
                    const match = persons.find((i) => i.name === newName);
                    if (
                        window.confirm(
                            "A phone number with this name already exists. Do you want to update the number?"
                        )
                    ) {
                        handleUpdate(match, { name: newName, number: newNumber });
                        return;
                    }
                }
                // If the number already exists, asks if user wants to update.
                else if (errorMessage === "Duplicate number.") {
                    const match = persons.find((i) => i.number === newNumber);
                    if (
                        window.confirm(
                            "This phone number is already assigned to a person. Do you want to update the name?"
                        )
                    ) {
                        handleUpdate(match, { name: newName, number: newNumber });
                        return;
                    }
                } else {
                    setError(true);
                    setMessage(errorMessage);
                    setTimeout(() => {
                        setMessage(null);
                    }, 3000);
                }
            });
    };

    const handleUpdate = (person, newData) => {
        service
            .update(person.id, newData)
            .then(() => service.getAll())
            .then((res) => {
                setPersons(res);
                setError(false);
                setMessage(`Update successful: ${newData.name} - ${newData.number}`);
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            })
            .catch(() => {
                setError(true);
                setMessage(person.name + " is already deleted.");
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            });
    };

    const handleDeleteClick = (id) => {
        const person = persons.find((n) => n.id === id);

        if (window.confirm("Confirm delete " + person.name)) {
            service
                .remove(id)
                .then(() => service.getAll())
                .then((result) => {
                    setPersons(result);
                    setError(false);
                    setMessage("Deleted " + person.name);
                    setTimeout(() => {
                        setMessage(null);
                    }, 3000);
                })
                .catch(() => {
                    setError(true);
                    setMessage(person.name + " is already deleted.");
                });
        }
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchWord(e.target.value);
    };

    let notification;
    if (error) {
        notification = <Notification error={true} message={message} />;
    } else {
        notification = <Notification error={false} message={message} />;
    }

    return (
        <div>
            <h2 className="main-header">Phonebook</h2>
            <Search changeHandler={handleSearchChange} />
            <h3 className="sub-header">Add a new person</h3>
            <Add
                nameChangeHandler={handleNameChange}
                numberChangeHandler={handleNumberChange}
                clickHandler={handleAddClick}
            />
            {notification}
            <h2 className="sub-header">Numbers</h2>
            <table className="m-4">
                {persons.map((person) => {
                    if (person.name.toLowerCase().includes(searchWord.toLowerCase())) {
                        return (
                            <Person
                                key={person.name}
                                name={person.name}
                                number={person.number}
                                clickHandler={() => handleDeleteClick(person.id)}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </table>
        </div>
    );
};

export default App;
