const Notification = ({ error, message }) => {
    if (message === null) {
        return null;
    }

    return <p className={`${error ? "error" : "success"}`}>{message}</p>;
};

export default Notification;
