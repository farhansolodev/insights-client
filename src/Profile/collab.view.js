import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import {  doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import AppBar from '../AppBar/bar';
import { AppBarButtons } from "./appbar.buttons.leave.collab"
import TextViewer from "./text.viewer"
import styles from "../VirtualSpace/vspage.module.css"

const CollabView = () => {
    const { name: collabName } = useParams()
    const [collabData, setCollabData] = useState()
    const [ready, setReady] = useState(false)
    const history = useHistory()

    //Query database to get data of collab with collabName, 
    // console.log('collabData: ',collabData)
    useEffect(() => {
        getDoc(doc(db, "collabs", collabName)).then(doc => {
            setCollabData(doc.data())
        })
		// const q = query(collection(db, "collabs"), where("name", "==", collabName));
        // getDocs(q).then(querySnapshot => {
        //     querySnapshot.forEach(function (doc) {
        //         setCollabData(doc.data())
        //     })
        // })
	}, [collabName])

    //Render TextViewer when we get data from database
    useEffect(() => {
        if(collabData!==undefined) {
            setReady(true)
        }
    }, [collabData])

    const onLeaveCollab = () => { 
        history.goBack()
	}

    return (
        <>
        <AppBar onClickHandler={onLeaveCollab} buttons={AppBarButtons} title={collabData?.name}/>
        <div className={styles["text-viewer"]}>
            {ready && <TextViewer reader={true} content={collabData} />}
        </div>
        </>
    )
}

export default CollabView;
