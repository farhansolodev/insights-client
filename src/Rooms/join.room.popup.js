import { useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore"; 
import { useClickAway } from "../utils"
import { useUser } from '../context/user'
import styles from '../styles/form.module.css';

export const JoinRoomPopup = ({ onCancel }) => {
    const [joinId, setJoinId] = useState('');
    const [denied, setDenied] = useState(false);
    const { userData, setUserData } = useUser();
    const history = useHistory();

    const wrapperRef = useClickAway(onCancel)

    async function handleSubmit(e){
        e.preventDefault()
        try {
            const w = query(collection(db, "virtual-spaces"), where("writeId", "==", joinId));
            const r = query(collection(db, "virtual-spaces"), where("readId", "==", joinId));
            const wQuerySnapshot = await getDocs(w)
            const rQuerySnapshot = await getDocs(r)
            let data = null
            let id = null
            wQuerySnapshot.forEach(function (doc) {
                data = doc.data()
                id = doc.id
            })
            rQuerySnapshot.forEach(function (doc) {
                data = doc.data()
                id = doc.id
            })
            // eslint-disable-next-line no-throw-literal
            if (!data) throw {code:404, msg:"Room doesn't exist"}

            updateDoc(doc(db, "users", userData.id), {
                previousRooms: arrayUnion(id),
                previousCollabs: arrayUnion(data.collabId)
            })

            if(data.writeId == joinId) {
                updateDoc(doc(db, "virtual-spaces", id), {
                    editors: arrayUnion(userData.id),
                })
            } else {
                updateDoc(doc(db, "virtual-spaces", id), {
                    readers: arrayUnion(userData.id),
                })
            }

            setUserData((prev) => { 
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        previousRooms: [...new Set([...prev.data?.previousRooms, id])],
                        previousCollabs: [...new Set([...prev.data?.previousCollabs, data.collabId])]
                    },
                }
            })

            // setFormVisible(true)
            console.clear()
            history.push(`/app/vs/${id}`) //uncomment when vs room done
        } catch (error) {
            error.code && (error.code === 404 && setDenied(true))
            throw error
        }
    }

    return (
        <div ref={wrapperRef} className={styles["container"]}>
            <h1>Join Room</h1>
            <div className={styles["form_group"]}>
                {denied && <div className={styles["error-handle"]}>Room code invalid</div>}
                <label htmlFor="roomname">Enter a room code</label>
                    <input type="text" name="roomname" placeholder="Room Name" value={joinId} onChange={(e) => {
                        setJoinId(e.target.value)
                        if(!denied) return
                        setDenied(false)
                    }}></input>
            </div>
            {/* <div className={styles["form_group"]}>
                <label htmlFor="Community Name">Community</label>
                <input type="text" name="community" placeholder="Community Name" value={CName} onChange={(e) => setCName(e.target.value)} className={styles["name_textBox"]}></input>
            </div> */}
            <div className={styles["footer"]}>
                <button onClick={handleSubmit} type="button" className={styles["submit"]}>Join Room</button>
                <button type="button" onClick={onCancel} className={styles["cancel"]}>Cancel</button>
            </div>
        </div>
     );
}

export default JoinRoomPopup;