import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/user";
import { db } from "../firebase"
import styles from "../styles/form.module.css";
import {v4 as uuidv4} from 'uuid';

const createCommunity = (parameters) => {
    const {CId, ComName, ComDescription, ComImage, UId} = parameters
    const communityPromise = setDoc(doc(db, "communities", CId), {
        name: ComName,
        description: ComDescription,
        image: ComImage,
        admin: UId,
        members: [],
        posts: [],
    })

    const userPromise = updateDoc(doc(db, "users", UId), {
        previousCommunities: arrayUnion(CId)
    });

    return Promise.all([communityPromise])
}

/* Communities in firebase user data? so can add to name of communities part of */

const CreateCommunityPopup = ({onCancel}) => {

    const [ComName, setComName] = useState('');
    const [ComDescription, setComDescription] = useState('');
    const [ComImage, setComImage] = useState(require("../assets/default.images").default.collab);
    const {userData, setUserData} = useUser();
    const history = useHistory();

    const UploadPic = (e) => {
        const file = e.target.files[0]
        console.log("file:", file);
        const reader = new FileReader();
        reader.onload = (e) => {
            if(reader.readyState === 2) {
                setComImage(reader.result);
                console.log("state:", ComImage);
            }
            reader.abort();
        }
        file && reader.readAsDataURL(file)
    }

    const handleSubmit = (e) => {
        try {
            const CId = uuidv4()

            createCommunity({CId,ComName,ComDescription,ComImage,UId: userData.id}).catch((err) => {
                throw err
            }).then(() => {
                setUserData((prev) => {
                    return {
                        ...prev,
                        data: {
                            ...prev.data,
                            previousCommunities: [...new Set([prev.data?.previousCommunities, CId])]
                        }
                    }
                })
                history.push(`/app/communities/${ComName}`);
            })
        } catch (e) {
            console.log("failed",e);
        }
    }
    
    return(
        <div className={styles["container"]}>
            <h2>Create Community</h2>
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
                <input type="file" name="communityImage" accept="image/*" placeholder="Image" onChange={UploadPic} className={styles["name_textBox"]}></input>
            </div>
                <div className={styles["footer"]}>
                <button onClick={handleSubmit} type="button" className={styles["submit"]}>Create Community</button>
                <button type="button" onClick={onCancel} className={styles["cancel"]}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateCommunityPopup;