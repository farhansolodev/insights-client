import { useState, useEffect } from "react";
// import { db } from "../Firebase/firebase";
// import { getDoc, doc } from "firebase/firestore"; 
import { io } from "socket.io-client"
import styles from '../styles/form.module.css';

const KickMessagePopup = ({ username, onSubmit, onCancel }) => {
    const userId = null
    const s = io("http://localhost:3000")
    // useEffect(() => {
    //     s.on("user-kicked", ({ uId, uname }) => {
    //         userId = uId
    //     })

    //     return () => {
	// 		if (!userId) return
	// 		console.log("Disconnecting from Virtual Space with socket: ", s)
	// 		s.disconnect()
	// 	}
    // }, [userId])

    onSubmit(e);
    
    return (
        <>
            <div className={styles["container"]}>
                <h2>Message</h2>
                <div className={styles["form_group"]}>
                    <h4>You are being kicked from this Virtual Space</h4>
                </div>
            </div>
        </>
     );
}

export default KickMessagePopup;