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
        const newPerson = { name: newName, number: newNumber };

        // Shows an error if a field is empty.
        if (newPerson.name === "" || newPerson.number === "") {
            setError("true");
            setMessage("Missing data");
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
        // If the name already exists, asks if user wants to update.
        else if (!persons.every((person) => person.name !== newName)) {
            const match = persons.find((i) => i.name === newPerson.name);
            if (window.confirm("A phone number with this name already exists. Do you want to update the number?")) {
                handleUpdate(match, newPerson);
            }
        }
        // If the number already exists, asks if user wants to update.
        else if (!persons.every((person) => person.number !== newNumber)) {
            const match = persons.find((i) => i.number === newPerson.number);
            if (window.confirm("This phone number is already assigned to a person. Do you want to update the name?")) {
                handleUpdate(match, newPerson);
            }
        } else {
            service
                .create(newPerson)
                .then(() => service.getAll())
                .then((result) => {
                    setPersons(result);
                    setError(false);
                    setMessage("Added " + newPerson.name);
                    setTimeout(() => {
                        setMessage(null);
                    }, 3000);
                });
        }
    };

    const handleUpdate = (person, data) => {
        service
            .update(person.id, data)
            .then(() => service.getAll())
            .then((res) => {
                setPersons(res);
                setError(false);
                setMessage(`Updated: ${data.name} - ${data.number}`);
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            })
            .catch(() => {
                setError(true);
                setMessage(person.name + " is already deleted.");
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
        notification = <Notification type="error" message={message} />;
    } else {
        notification = <Notification type="success" message={message} />;
    }

    return (
        <div>
            <h2>Phonebook</h2>
            {notification}
            <Search changeHandler={handleSearchChange} />
            <h3>Add a new person</h3>
            <Add
                nameChangeHandler={handleNameChange}
                numberChangeHandler={handleNumberChange}
                clickHandler={handleAddClick}
            />
            <h2>Numbers</h2>
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
        </div>
    );
};

export default App;
