import { doc, setDoc, updateDoc, arrayUnion, collection, query, where, getDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/user";
import { db } from "../firebase"
import styles from "../styles/form.module.css";
import {v4 as uuidv4} from 'uuid';
import { async } from "@firebase/util";

const createCommunity = (parameters) => {
    const {CId, ComName, ComDescription, ComImage, UId} = parameters
    const communityPromise = setDoc(doc(db, "communities", CId), {
        name: ComName,
        description: ComDescription,
        image: ComImage,
        admin: UId,
        members: [],
        count: 0,
        publishedCollabs: [],
    })

    const userPromise = updateDoc(doc(db, "users", UId), {
        previousCommunities: arrayUnion(CId)
    });

    return Promise.all([communityPromise, userPromise])
}

/* Communities in firebase user data? so can add to name of communities part of */

const CreateCommunityPopup = ({onCancel}) => {

    const [denied, setDenied] = useState();
    const [error, setError] = useState();
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

    //To make sure no two communities have the same name
    async function checkPrevCommunities() {
        const q = query(collection(db, "communities"), where("name", "==", ComName));
        const querySnapshot = await getDocs(q);
        if(querySnapshot._snapshot.docChanges.length!=0) {
            setDenied(true)
            setError("There already exists a community with the same name.")

        } else{
            if(/^[A-Za-z1-9]{1,25}$/.test(ComName) && /^[A-Za-z1-9!,\s]{1,200}$/.test(ComDescription)) {
                handleSubmit();
                return
            }
            setError("Community name or description has invalid format.")
            setDenied(true)
        }
    }
    

    const handleSubmit = (e) => {
            try {
                e.preventDefault();        
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
                    onCancel();
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
            {denied && <div className={styles["error-handle"]}>{error}</div>}
                <label htmlFor="Community Name">Community Name</label>
                <input type="text" name="community" placeholder="Community Name" onChange={(e) => {
                    setComName(e.target.value)
                    if(!denied) return
                    setDenied(false)}} className={styles["name_textBox"]} required></input>
            </div>
            <div className={styles["form_group"]}>
                <label htmlFor="Community Description">Description</label>
                <input type="text" name="communitydescription" placeholder="Description" onChange={(e) => {
                    setComDescription(e.target.value)
                    if(!denied) return
                    setDenied(false)}} className={styles["name_textBox"]} required></input>
            </div>
            <div className={styles["form_group"]}>
                <label htmlFor="Image">Image</label>
                <input type="file" name="communityImage" accept="image/*" placeholder="Image" onChange={UploadPic} className={styles["name_textBox"]}></input>
            </div>
                <div className={styles["footer"]}>
                <button onClick={checkPrevCommunities} type="button" className={styles["submit"]}>Create Community</button>
                <button type="button" onClick={onCancel} className={styles["cancel"]}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateCommunityPopup;