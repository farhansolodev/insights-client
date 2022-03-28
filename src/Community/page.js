import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import AppBar from "../AppBar/bar"
import styles from "./community.module.css"
import { AppBarButtons } from "./appbar.buttons"
import Posts from "./community.posts"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import { useUser } from "../context/user"


const Commmunity = ({name}) => {
    
    const {id: comName } = useParams();
    const [comId, setComId] = useState();
    const [comData, setComData] = useState([]);
    const [collabData, setCollabData] = useState([]);
    const { userData } = useUser();
    const [appBarStatus, setAppBarStatus] = useState('');

    //this should be run when someone opens the community page to check if user is a member or not to initialise the isMember field
    function setMembership() {
        if (comData.members.includes(userData.id)) {
            setIsMember(true)
        } else {
            setIsMember(false)
        }
    }

    const [isMember, setIsMember] = useState(false); 
    
    const history = useHistory();

    //what i couldnt do :(
    useEffect( () => {
        // if(comData) return
        const q = query(collection(db, "communities"), where("name", "==", comName))
        getDocs(q).then((snapshot) => {
            snapshot.forEach(async (doc) => {
                setComId(doc.id)
                setComData(doc.data())
                // setComData(prev => [...prev,doc.data()])
                // console.log(doc.data())
            });
        })
    }, [comName])

    useEffect(() => {
        // console.log(comData)
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
    
    // console.log(comData);

    function join() {
        //comData.members append user.id
        setIsMember(true);
    }

    function leave() {
        //comData.members remove user.id
        setIsMember(false);
    }

    function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
		setAppBarStatus(val)

        appBarStatus==="join-community" ? join() : leave();
	}

    return (
        <>
            <AppBar title={comName} buttons={isMember ? [AppBarButtons.leave] : [AppBarButtons.join]} onClickHandler={onStatusChange} />
            <div className={styles["community-container"]}>
                <div style={{backgroundImage: `url(${comData?.image})`}} className={styles.image}/>
                {/* <div className={styles.body}> */}
                <div className={styles["posts-container"]}>
                    {console.log("Content",collabData)}
                    {
                        collabData && collabData.map(({ id, name, virtualSpaceId, content, likes, usersLiked }, index) => {
                            // return <div key={index} >{`${name} ${JSON.stringify(content)}`}</div>
                            return <Posts virtualSpaceId={virtualSpaceId} isMember key={index} id={id} name={name} content={JSON.stringify(content)} likeVal={likes} usersLiked={usersLiked} />
                        })
                    }
                    {/* map the community published collabs and pass each collab id for posts*/}
                </div>
                <div className={styles["about-container"]}>
                    <div className={styles["about-box"]}>
                        <div className={styles["header"]}>
                            About community
                        </div>
                        <div className={styles["description"]}>
                            {comData.description}
                        </div>
                        <div className={styles["members"]}>
                            Members: {comData.members?.length}
                        </div>
                    </div>
                </div>
                {/* </div>  */}
            </div>
        </>
    )
}

export default Commmunity;