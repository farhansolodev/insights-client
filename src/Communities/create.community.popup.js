import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/user";
import { db } from "../firebase"
import styles from "../styles/form.module.css";

const createCommunity = (parameters) => {
    const {CId, ComName, ComDescription, displayImg, UID, mods} = parameters
    const communityPromise = setDoc(doc(db, "communities", CId), {
        name: ComName,
        description: ComDescription,
        displayImg,
        admin: [UID],
        mods: [],
        followers: [],
    })

    return Promise.all([communityPromise])
}

const CreateCommunityPopup = (onCancel) => {

    const [ComName, setComName] = useState('');
    const [ComDescription, setComDescription] = useState('');
    const [ComImage, setComImage] = useState('');
    const {userData, setUserData} = useUser();
    const history = useHistory();

    const handleSubmit = (e) => {

    }
    
    return(
        <div className={styles["container"]}>
            <h2>Create Room</h2>
            <div className={styles["form_group"]}>
                <label htmlFor="Community Name">Community Name</label>
                <input type="text" name="community" placeholder="Community Name" onChange={(e) => setComName(e.target.value)} className={styles["name_textBox"]}></input>
            </div>
            <div className={styles["form_group"]}>
                <label htmlFor="Community Description">Description</label>
                <input type="text" name="communitydescription" placeholder="Description" onChange={(e) => setComDescription(e.target.value)} className={styles["name_textBox"]}></input>
            </div>
            <div className={styles["form_group"]}>
                <label htmlFor="Image">Image</label>
                <input type="image" name="communityImage"></input>
            </div>
                <div className={styles["footer"]}>
                <button onClick={handleSubmit} type="button" className={styles["submit"]}>Create Community</button>
                <button type="button" onClick={onCancel} className={styles["cancel"]}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateCommunityPopup;