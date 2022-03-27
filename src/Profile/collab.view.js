import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import {  doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import AppBar from '../AppBar/bar';
import { AppBarButtons } from "./appbar.buttons.leave.collab"
import TextViewer from "./text.viewer"
import styles from "../VirtualSpace/vspage.module.css"

const CollabView = () => {
    const { name: roomName } = useParams()
    const [collabData, setCollabData] = useState()
    const [ready, setReady] = useState(false)
    const history = useHistory()

    roomName = roomName.replace('%20',' ')

    useEffect(() => {
		const q = query(collection(db, "collabs"), where("name", "==", roomName));
        getDocs(q).then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                getData(doc.id)
            })
        })

        async function getData(id) {
            const docSnap = await getDoc(doc(db, "collabs", id));
            setCollabData(docSnap.data())
        }
	}, [roomName])

    useEffect(() => {
        if(collabData!==undefined) {
            setReady(true)
        }
    }, [collabData])

    const onLeaveCollab = () => { 
		history.push("/app/profile")
	}

    return (
        <>
        <AppBar onClickHandler={onLeaveCollab} buttons={AppBarButtons} title={roomName}/>
        <div className={styles["text-editor"]}>
            {console.log("r",ready)}{console.log(collabData)}
            {ready && <TextViewer reader={true} content={collabData} />}
        </div>
        </>
    )
}

export default CollabView;
