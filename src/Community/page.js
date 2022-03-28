import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AppBar from "../AppBar/bar"
import styles from "./community.module.css"
import { AppBarButtons } from "./appbar.buttons"
import Posts from "./community.posts"
import { collection, doc, getDoc, getDocs, query, updateDoc, arrayUnion, arrayRemove, where } from "firebase/firestore"
import { db } from "../firebase"
import { useUser } from "../context/user"


const Commmunity = () => {
    
    const {id: comName } = useParams();
    const [comId, setComId] = useState();
    const [comData, setComData] = useState({});
    const [collabData, setCollabData] = useState([]);
    const [isMember, setIsMember] = useState();
    const { userData } = useUser();

    //Query the database to get the data of the community using the name
    useEffect( () => {
        const q = query(collection(db, "communities"), where("name", "==", comName))
        getDocs(q).then((snapshot) => {
            snapshot.forEach(async (doc) => {
                setComId(doc.id)
                setComData(doc.data())
            });
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
    }, [comData.members, userData.id])


    //Get list of Collab ids along with their data to display
    useEffect(() => {
        if(collabData.length !== 0) return
        if(!comData?.publishedCollabs) return
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
    }, [comData])
    
    //Run function when user wants to JOIN community, update the database of communities and users with the right field values
    function join() {
        setIsMember(true);

        updateDoc(doc(db, "users", userData.id), {
            previousCommunities: arrayUnion(doc(db, "communities", comId))
        })
        updateDoc(doc(db, "communities", comId), {
            members: arrayUnion(userData.id)
        })
    }

    //Run function when user wants to LEAVE community, update the database
    function leave() {
        //comData.members remove user.id
        setIsMember(false);
        updateDoc(doc(db, "users", userData.id), {
            previousCommunities: arrayRemove(doc(db, "communities", comId))
        })
        updateDoc(doc(db, "communities", comId), {
            members: arrayRemove(userData.id)
        })
    }

    //Handle the case to render either join or leave button depending on user membership
    function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
        val === "join-community" ? join() : leave();
	}

    return (
        <>
            <AppBar title={comName} buttons={isMember ? [AppBarButtons.leave] : [AppBarButtons.join]} onClickHandler={onStatusChange} />
            <div className={styles["community-container"]}>
                <div style={{backgroundImage: `url(${comData?.image})`}} className={styles.image}/>
                <div className={styles["posts-container"]}>
                    {/* map the community published collabs and pass each collab id for posts*/}
                    {
                        collabData && collabData.map(({ id, name, content, usersReported, likes, usersLiked }, index) => {
                            return <Posts usersReported={usersReported} comId={comId} isMember={isMember} key={index} id={id} name={name} content={JSON.stringify(content)} likeVal={likes} usersLiked={usersLiked} />
                        })
                    }
                </div>
                <div className={styles["about-container"]}>
                    <div className={styles["about-box"]}>
                        <div className={styles["header"]}>About community</div>

                        <div className={styles["description"]}>{comData.description}</div>
                        
                        <div className={styles["members"]}>Members: {comData.members?.length}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Commmunity;