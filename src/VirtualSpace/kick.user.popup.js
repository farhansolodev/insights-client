import { useState, useEffect } from "react";
// import { db } from "../Firebase/firebase";
// import { getDoc, doc } from "firebase/firestore"; 
import { io } from "socket.io-client"
import styles from '../styles/form.module.css';

const KickUserPopup = ({ username, roomDetails, onSubmit, onCancel }) => {
    const [kickMessage, setKickMessage] = useState(null)
    var uId = null
    var username = ''
    var roomId = ''
    
    const s = io("https://insights--server.herokuapp.com")
    const onKick = (e) => {
        e.preventDefault();
        username = "Susan"
        uId = "FW4DICcvw8fqVB2P7iKrDxPdzNm1"
        roomId = "e9fae1d3-aacd-460b-a89b-6ca4cea5aefe"

        
        onSubmit(e);
	}
    useEffect(() => {
        s.emit("kick-user", {
            uId,
            username,
            roomId
        })

        s.on("user-kicked", ({ userId: uId, username: uname }) => {
            setKickMessage(uId)
            s.emit("send-kick-message", ({ uId, uname }))
        })

    }, [])
    return (
        <>
            {/* {(kickMessage!=null) && <KickMessage/>} */}
            <div className={styles["container"]}>
                <h2>Kick {username}</h2>
                <div className={styles["form_group"]}>
                    <h4>Are you sure you want to kick this user?</h4>
                </div>
                <div className={styles["footer"]}>
                    <button name="kick-user" onClick={onKick} type="button" className={styles["submit"]}>YES</button>
                    <button name="kick-user" onClick={onCancel} type="button" className={styles["cancel"]}>Cancel</button>
                </div>
            </div>
        </>
     );
}

export default KickUserPopup;