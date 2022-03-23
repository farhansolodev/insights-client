import { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, collection, query, where, getDoc, getDocs } from "firebase/firestore"; 
import styles from '../styles/form.module.css';
import { useUser } from "../context/user";


const Publish = ({ collabId, onSubmit, onCancel, community }) => {
    const [pfp, setPfp] = useState(require("../assets/default.images").default.collab);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { userData } = useUser();

    // async function findCommunityId() {
    //     console.log("FOUND THE FUNCTION");
    //     try {
    //         const coms = collection(db, "communities");
    //         const q = query(coms, where("name", "==", community));
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             console.log("community" + community + ": " + doc.data())
    //         });
            
    //     } catch(e) {
    //         console.log("error" + e);
    //     }
    // }

    const UploadPic = (e) => {
        console.log('button to upload clicked')
        const file = e.target.files[0]
        const reader = new FileReader(); 
        reader.onload = (e) => {
            console.log('file value: ', file)
            if(reader.readyState === 2){
                setPfp(reader.result);
            }
            reader.abort()
        }
        file && reader.readAsDataURL(file);
    }

    async function publishCollab(e) {
        e.preventDefault();

        try {
            // eslint-disable-next-line no-throw-literal
            if(name === '') throw "Please enter a name for your collab"
            
            const communityId = false;//findCommunityId();

            const updateCollabPromise = updateDoc(doc(db, "collabs", collabId), {
                name: name,
                displayPic: pfp,
                published: true
            });

            const updateUserCollabsPromise = updateDoc(doc(db, "users", userData.id), {
                publishedCollabs: arrayUnion(collabId)
            });

            const updateCommunityPostsPromise = updateDoc(doc(db,"communities",communityId), {
                posts: arrayUnion(collabId)
            });

            await Promise.all([updateCollabPromise, updateUserCollabsPromise, updateCommunityPostsPromise])

            onSubmit(e);
            
        } catch (error) {
            setError(error)
        }

    }

    return (
        <div className={styles["container"]}>
            <div className={styles["form"]}>
                <h1>PUBLISH</h1>
                <div className={styles["form_group"]}>
                    {error && <div className={styles["error-handle"]}>{error}</div>}
                    Name your Collab
                    <input type="text" name="bio" placeholder="Name" value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (!error) return
                            setError('')
                        }}
                        onKeyPress={(e) => {
                            e.key === "Enter" && publishCollab(e);
                        }}
                    ></input>
                </div>
                <div className={styles["form_group"]}>
                    <p>Add a cover image</p>
                    <input type="file" accept="image/*" name="image-upload" id="input" onChange={UploadPic}></input>
                </div>
                <div className={styles["footer"]}>
                    <button onClick={publishCollab} value="publish" type="button" className={styles["submit"]}>Publish</button>
                    <button value="publish" type="button" onClick={onCancel} className={styles["cancel"]}>Cancel</button>
                </div>
            </div>
        </div>
     );
}
 
export default Publish;