import { useState, useEffect } from "react";
// import { db } from "../Firebase/firebase";
// import { getDoc, doc } from "firebase/firestore"; 
import { io } from "socket.io-client"
import styles from '../styles/form.module.css';

const KickUserPopup = ({ username, onSubmit, onCancel }) => {
    
    const s = io("https://insights--server.herokuapp.com")
    const onKick = (e) => {
        e.preventDefault();
        console.log("yesss")
        const username = "Susan"
        const userId = "FW4DICcvw8fqVB2P7iKrDxPdzNm1"
        const roomId = "e9fae1d3-aacd-460b-a89b-6ca4cea5aefe"
		s.on('disconnect', () => {
            s.to(roomId).emit("user-disconnected", { username, userId })
            console.log("User [" + username + ":"+s.id+"] disconnected")
        })
        onSubmit(e);
	}
    
    return (
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
     );
}

export default KickUserPopup;