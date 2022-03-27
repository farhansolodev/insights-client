// import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useClickAway } from '../utils'
// import { db } from "../Firebase/firebase";
// import { getDoc, doc } from "firebase/firestore"; 
import styles from '../styles/form.module.css';

const ShareRoomPopup = ({ writeID, readID, onCopy, onCancel }) => {
    const [copied, setCopied] = useState(false);
    const [IDVal, setIDVal] = useState();
    // const { id } = useParams()   //uncomment when vs room done
    // const id = "1d880431-2a99-4e39-a5a6-6e4a9ff9c340"
    const onClickHandler = (e) => {
        const target = e.target
        navigator.clipboard.writeText(e.target.value)
        // !!onCopy && onCopy(e)
        setIDVal(target.name)
        setCopied(true)
    }

    const wrapperRef = useClickAway(() => {
        onCancel({ target: { name: "share-code"}})
    })
    
    return (
        <div ref={wrapperRef} className={styles["container"]}>
            <h2>Join Code</h2>
            <div className={styles["form_group"]}>
                {copied && <p style={{color: "green"}}>{IDVal} Invite Copied to clipboard!</p>}
                <label htmlFor="roomname">Invite a Writer:</label>
                <input readOnly style={{ marginBottom: "20px" }} htmlFor="Room Name" onClick={onClickHandler} value={writeID} name="Writer"></input>
                <label htmlFor="roomname">Invite a Reader:</label>
                <input readOnly style={{ marginBottom: "20px" }} htmlFor="Room Name" onClick={onClickHandler} value={readID} name="Reader"></input>
            </div>
            <div className={styles["footer"]}>
                <button name="share-code" onClick={onCancel} type="button" className={styles["cancel"]}>Cancel</button>
            </div>
        </div>
     );
}

export default ShareRoomPopup;