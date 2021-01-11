const Notification = ({ type, message }) => {
    let notificationStyle;

    if (message === null) {
        return null;
    }
    if (type === "error") {
        notificationStyle = styles.error;
    } else {
        notificationStyle = styles.success;
    }

    return <p style={notificationStyle}>{message}</p>;
};

const styles = {
    error: {
        width: "fit-content",
        color: "red",
        padding: "1em",
        fontWeight: "bold",
        backgroundColor: "whitesmoke",
        border: "2px solid red",
    },
    success: {
        width: "fit-content",
        color: "darkgreen",
        padding: "1em",
        fontWeight: "bold",
        backgroundColor: "lightgreen",
        border: "2px solid darkgreen",
    },
};

export default Notification;
