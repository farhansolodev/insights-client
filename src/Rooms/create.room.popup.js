import RiArrowDropDownLine from 'react-icons/ri';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import {v4 as uuidv4} from 'uuid';
import { useUser } from '../context/user'
import { useClickAway } from "../utils"
import styles from '../styles/form.module.css';

function createRoom(options) {
    const { RId, collabId, CId, readId, writeId, RName, CommName, Uid} = options
    
    //Create Virtual Space record in database
    const vsPromise = setDoc(doc(db, "virtual-spaces", RId), {
        collabId,
        name: RName,
        communityName: CommName,
        readId,
        writeId,
        editors: [],
        owners: [Uid],
        readers: []
    })

    //Create Collab record in database
    const collabPromise = setDoc(doc(db, "collabs", collabId), {
        name: "", 
        displayPic: require("../assets/default.images").default.collab,
        communityPosted: [CommName],
        content: {},
        likes: 0,
        usersLiked: [],
        contributors: [],
        owners: [Uid],
        virtualSpaceId: RId,
        published: false,
    })

    //Update Community Record with prev. Rooms and prev. Collabs
    const communityPromise = updateDoc(doc(db, "communities", CId), {
        previousRooms: arrayUnion(RId),
        previousCollabs: arrayUnion(collabId) 
    });

    //Update User Record with rooms, community and collab ids.
    const userPromise = updateDoc(doc(db, "users", Uid), { ///get data from context
        previousRooms: arrayUnion(RId),
        previousCollabs: arrayUnion(collabId)
    });

    return Promise.all([vsPromise, collabPromise, communityPromise, userPromise])
}

export const CreateRoomPopup = ({ onCancel }) => {
    const [RName, setRName] = useState('');
    const [CName, setCName] = useState();
    const [CId, setCId] = useState();
    const [error, setError] = useState(false);
    const [communityData, setCommunityData] = useState({});
    const {userData, setUserData} = useUser();
    const history = useHistory()

    useEffect(() => {
		userData.data?.previousCommunities.forEach(communityRef => { 
			getDoc(communityRef).then(snap => {
				const community = snap.data()
				setCommunityData(prev => {
					return {
						...prev,
						[communityRef.id]: community
					}
				})
			})
		})
	}, [userData.data?.previousCommunities]);

    const handleSubmit = (e) =>{
        try{
            const collabId = uuidv4()
            let RId = uuidv4()
            const readId = uuidv4()
            const writeId = uuidv4()
            createRoom({RId, collabId, CId, RName, readId, writeId, CommName: CName, Uid: userData.id}).catch((err) => { 
                throw err
            }).then(() => {
                setUserData((prev) => {
                    return {
                        ...prev,
                        data: {
                            ...prev.data,
                            previousRooms: [...new Set([...prev.data?.previousRooms, RId])],
                            previousCollabs: [...new Set([...prev.data?.previousCollabs, collabId])]
                        }
                    }
                })
                console.clear()
                history.push(`/app/vs/${RId}`)
            })
        } catch(e) {
            // console.log("DIDNT WORK", e);
        }
    }

    //Function run when a community is selected from dropdown
    const selectCommunity = (e) => {
        setCName(e.target.title)
        setCId(e.target.id)
	}
    
    const checkError = (e) => {
        if(userData.data?.previousCommunities.length == 0) {
            setError(true)
        }
	}

    const wrapperRef = useClickAway(onCancel)

    return (
        <div ref={wrapperRef} className={styles["container"]}>
            {error && <div className={styles["error-handle"]}>No Communites Joined!</div>}
            <h2>Create Room</h2>
            <div className={styles["form_group"]}>
                <label htmlFor="roomname">Room Name</label>
                <input type="text" name="roomname" placeholder="What will your room be called?" onChange={(e) => setRName(e.target.value)} className={styles["name_textBox"]} required></input>
            </div>
            <div className={styles["form_group"]}>
                <label htmlFor="roomname">Community Name</label>
                <div className={styles["dropdown"]}>
                    <button className={styles["dropbtn"]} onClick={checkError}>{(CName==null) ? "Where will this be published?" : CName}</button>
                    <div className={styles["dropdown-content"]}>
                        {
                            userData.data?.previousCommunities.map((communityRef, index) => {
                                const prevCommunity = communityData[communityRef.id]?.name
                                return (
                                    <div id={communityRef.id} title={communityData[communityRef.id]?.name}  key={index} onClick={selectCommunity}>{communityData[communityRef.id]?.name}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
                <div className={styles["footer"]}>
                <button onClick={handleSubmit} type="button" className={styles["submit"]}>Create Room</button>
                <button type="button" onClick={onCancel} className={styles["cancel"]}>Cancel</button>
            </div>
        </div>
     );
}

export default CreateRoomPopup;