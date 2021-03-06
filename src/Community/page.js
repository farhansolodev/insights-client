import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import AppBar from "../AppBar/bar"
import styles from "./community.module.css"
import { AppBarButtons } from "./appbar.buttons"
import Posts from "./community.posts"
import { collection, doc, getDoc, getDocs, query, updateDoc, arrayUnion, arrayRemove, where } from "firebase/firestore"
import { db } from "../firebase"
import { useUser } from "../context/user"


const Commmunity = () => {
    
    const { id: comName } = useParams();
    const [ comId, setComId] = useState();
    const [ comExists, setComExists] = useState();
    const [ comData, setComData] = useState({});
    const [ collabData, setCollabData] = useState([]);
    const [ isMember, setIsMember] = useState();
    const { userData } = useUser();
    const history = useHistory()

    //Query the database to get the data of the community using the name
    useEffect(() => {
        const q = query(collection(db, "communities"), where("name", "==", comName))
        getDocs(q).then((snapshot) => {
            let exists = false
            // console.log('here')
            snapshot.forEach(async (doc) => {
                exists = true
                setComId(doc.id)
                setComData({...doc.data(), id: doc.id})
                // console.log(doc.data())
            });
            setComExists(exists)
        })
    }, [comName])

    //Check if user is a member of this community
    useEffect(() => {
        if(comData == {}) return
        if (!comData.members) return

        if (comData.members.includes(userData.id)) {
            setIsMember(true)
        } else {
            setIsMember(false)
        }
    }, [comData, userData.id])


    //Get list of Collab ids along with their data to display
    useEffect(() => {
        // console.log('this runs: ', comData, comName)
        if(collabData.length !== 0) return
        // console.log('this runs 2')
        if(!comData?.publishedCollabs) return
        // console.log('this runs 3')
        comData.publishedCollabs.forEach(collabId => {
            getDoc(doc(db, "collabs", collabId)).then(snap => {
				const collab = snap.data()
				setCollabData(prev => {
					return [
						...prev,
						{ id: collabId, ...collab }
                    ]
				})
			})
        })
    }, [comData, comName])
    
    //Run function when user wants to JOIN community, update the database of communities and users with the right field values
    function join() {
        updateDoc(doc(db, "users", userData.id), {
            previousCommunities: arrayUnion(doc(db, "communities", comId))
        })
        updateDoc(doc(db, "communities", comId), {
            members: arrayUnion(userData.id)
        })
        setIsMember(true);
        setComData(prev => ({...prev, members: [...prev.members, userData.id]}))
    }

    //Run function when user wants to LEAVE community, update the database
    function leave() {
        //comData.members remove user.id
        updateDoc(doc(db, "users", userData.id), {
            previousCommunities: arrayRemove(doc(db, "communities", comId))
        })
        updateDoc(doc(db, "communities", comId), {
            members: arrayRemove(userData.id)
        })
        setIsMember(false);
        setComData(prev => ({...prev, members: prev.members.filter(user => user != userData.id)}))
    }

    function admin() {
        history.push('/app/communities/' + comName + '/admin', { detail: comData})
    }

    //Handle the case to render either join or leave button depending on user membership
    function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
        val === "join-community" && join()
        val === "leave-community" && leave()
        val === "admin-dashboard" && admin()
	}

    return (
        <>
            <AppBar title={comExists && comName} buttons={comExists && (comData.admin != userData.id ? (isMember ? [AppBarButtons.leave] : [AppBarButtons.join]) : [AppBarButtons.admin])} onClickHandler={onStatusChange} />
            {comExists != undefined && (comExists ? <div className={styles["community-container"]}>
                <div style={{backgroundImage: `url(${comData?.image})`}} className={styles.image}/>
                <div className={styles["posts-container"]}>
                    {/* map the community published collabs and pass each collab id for posts*/}
                    {
                        collabData && collabData.length != 0 ? collabData.map(({ id, name, content, usersReported, likes, usersLiked }, index) => {
                            return <Posts setComData={setComData} usersReported={usersReported} comId={comId} isMember={isMember} key={index} id={id} name={name} content={JSON.stringify(content)} likeVal={likes} usersLiked={usersLiked} />
                        }) : <h1>No collabs yet...</h1>
                    }
                </div>
                <div className={styles["about-container"]}>
                    <div className={styles["about-box"]}>
                        <div className={styles["header"]}>About community</div>

                        <div className={styles["description"]}>{comData.description}</div>
                        
                        <div className={styles["members"]}>Members: {comData.members?.length}</div>
                    </div>
                </div>
            </div> : <h1 style={{padding: "5rem"}}>This is not the community you are searching for...</h1>)}
        </>
    )
}

export default Commmunity;