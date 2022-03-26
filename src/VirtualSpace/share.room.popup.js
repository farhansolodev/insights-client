// import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useClickAway } from '../utils'
// import { db } from "../Firebase/firebase";
// import { getDoc, doc } from "firebase/firestore"; 
import styles from '../styles/form.module.css';

const ShareRoomPopup = ({ id, onCopy, onCancel }) => {
    const [copied, setCopied] = useState(false);

    const [copiedView, setCopiedView] = useState(false);
    // const { id } = useParams()   //uncomment when vs room done
    // const id = "1d880431-2a99-4e39-a5a6-6e4a9ff9c340"

    const onClickHandler = (e) => {
        navigator.clipboard.writeText(e.target.value)
        // !!onCopy && onCopy(e)
        setCopied(true)
    }

    const wrapperRef = useClickAway(() => {
        onCancel({ target: { name: "share-code"}})
    })
    
    return (
        <div ref={wrapperRef} className={styles["container"]}>
            <h2>Join Code</h2>
            <div className={styles["form_group"]}>

                <h5>Write ID (Editing purpose)</h5>                

                {copied && <p style={{color: "green"}}>Copied to clipboard!</p>}
                <input readOnly style={{ marginBottom: "20px", marginTop: "0px" }} htmlFor="Room Name" onClick={onClickHandler} value={id} name="share-code"></input>
            </div>

            <div className={styles["form_group"]}>

                <h5>Read ID (Viewing purpose)</h5> 

                {copiedView && <p style={{color: "green", border:"black"}}>Copied to clipboard!</p>}
                <input readOnly style={{ marginBottom: "20px", marginTop: "0px" }} htmlFor="Room Name" onClick={onClickHandlerView} value={id} name="share-code"></input>
            </div>

            <div className={styles["footer"]}>
                <button name="share-code" onClick={onCancel} type="button" className={styles["cancel"]}>Cancel</button>
            </div>
        </div>
     );
}

export default ShareRoomPopup;