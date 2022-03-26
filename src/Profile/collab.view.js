import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import {  doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import AppBar from '../AppBar/bar';
import { AppBarButtons } from "./appbar.buttons.copy"
import TextViewer from "./text.viewer"
import { useUser } from "../context/user";
import styles from "../VirtualSpace/vspage.module.css"

const CollabView = () => {
    const { userData } = useUser()
	const { id: userId } = userData
    const { name: roomName } = useParams()
    const [collabID, setCollabID] = useState()
    const [collabData, setCollabData] = useState()
    const history = useHistory()

    let nam = roomName.replace('%20',' ')
    let data = null
    let id = null

    useEffect(() => {
        getData()
		const q = query(collection(db, "collabs"), where("name", "==", "Magic Potion"));
        getDocs(q).then(querySnapshot => {
            // let data = null
            // let id = null
            querySnapshot.forEach(function (doc) {
                data = doc.data()
                id = doc.id
                getData()
                // hi()
                // console.log(data.content)
                // console.log(data)
            })
        })

        async function getData(e) {
            const docSnap = await getDoc(doc(db, "collabs", "c1b21153-653e-493d-814b-efddfa5b8ed3"));
            setCollabData(docSnap.data())
            console.log(collabData)
        }
        console.log(collabData)
	}, [roomName])

    const onLeaveRoom = () => { 
		history.push("/app/profile")
	}
    function hi() {
        console.log(collabData)
    }

    return (
        <>
        <AppBar onClickHandler={onLeaveRoom} buttons={AppBarButtons} title={roomName}/>
        <div className={styles["text-editor"]}>
            <TextViewer reader={true} collabId={id} onClick={hi()} content={collabData?.content} />
            {console.log(collabData.content)}
        </div>
        </>
    )
}

export default CollabView;
