import RiArrowDropDownLine from 'react-icons/ri';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import {v4 as uuidv4} from 'uuid';
import styles from '../styles/form.module.css';
import { useUser } from '../context/user'

function createRoom(options) {
    const { RId, collabId, CId, readId, writeId, RName, CommName, Uid} = options
    console.log("options when creating room: ",options)
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

    const collabPromise = setDoc(doc(db, "collabs", collabId), {
        name: "", 
        displayPic: require("../assets/default.images").default.collab,
        communityPosted: [CommName],
        content: {},
        contributors: [],
        owners: [Uid],
        virtualSpaceId: RId, // maybe could get rid of this
        published: false,
    })

    const communityPromise = updateDoc(doc(db, "communities", CId), {
        previousRooms: arrayUnion(RId),
        previousCollabs: arrayUnion(collabId) 
    });

    const userPromise = updateDoc(doc(db, "users", Uid), { ///get data from context
        previousRooms: arrayUnion(RId),
        previousCommunities: arrayUnion(CId),
        previousCollabs: arrayUnion(collabId)     //okay u got 2 options either: create doc with setDoc   ORRR   store the real id into user prev array fields
    });

    return Promise.all([vsPromise, collabPromise, communityPromise, userPromise])
}

export const CreateRoomPopup = ({ onCancel }) => {
    const [RName, setRName] = useState('');
    const [CName, setCName] = useState();
    const [CId, setCId] = useState();
    // const [choice, setChoice] = useState();
    const [communityData, setCommunityData] = useState({});
    const {userData, setUserData} = useUser();
    const history = useHistory()

    useEffect(() => {
		userData.data?.previousCommunities.forEach(communityId => { 
			getDoc(doc(db, "communities", communityId)).then(snap => {
				const community = snap.data()
				setCommunityData(prev => {
					return {
						...prev,
						[communityId]: community
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
                // setFormSubmitted(true)
                console.clear()
                history.push(`/app/vs/${RId}`) //uncomment when vs room done
            })
        } catch(e) {
            console.log("DIDNT WORK", e);
        }
    }

    const filterByCommunityChoiceStatus = (x, y) => {
		if (CName == null) {
            return x
        } else {
            return y
        }
	}

    const selectCommunity = (e) => {
        setCName(e.target.value)
        setCId(e.target.id)
	}

    return (
        <div className={styles["container"]}>
            <h2>Create Room</h2>
            <div className={styles["form_group"]}>
                <label htmlFor="roomname">Room Name</label>
                <input type="text" name="roomname" placeholder="Room Name" onChange={(e) => setRName(e.target.value)} className={styles["name_textBox"]} required></input>
            </div>
            <div className={styles["form_group"]}>
                <label htmlFor="Community Name">Community</label>
                <select name="dog-names" id="dog-names">
                    {/* {RiArrowDropDownLine: Icon} -- Need to select option value and put in dropdown text && get the value insert in db--link collab and vs */}
                    <option value="rigatoni">Rigatoni</option>
                    <option value="dave">Dave</option>
                    <option value="pumpernickel">Pumpernickel</option>
                    <option value="reeses">Reeses</option>
                </select>
                {/* <input type="text" name="community" placeholder="Community Name" onChange={(e) => setCName(e.target.value)} className={styles["name_textBox"]}></input> */}
            </div>
            <div className={styles["form_group"]}>
                <label htmlFor="roomname">Community Name</label>
                <div className={styles["dropdown"]}>
                    <button className={styles["dropbtn"]}>{(CName==null) ? "Choose a Community" : CName}</button>
                    <div className={styles["dropdown-content"]}>
                        <div className={styles["dropdown-content"]} /*{filterByCommunityChoiceStatus(styles["dropdown-content"], styles["choice-selected"])}*/ >
                            {
                                userData.data?.previousCommunities.map((communityId, index) => {
                                    // if (!communityData[communityId]) return <p key={index} >Loading...</p>
                                    const prevCommunity = communityData[communityId]?.name
                                    console.log(communityData[communityId], prevCommunity)
                                    return (
                                        <option id={communityId} value={communityData[communityId]?.name}  key={index} onClick={selectCommunity}>{communityData[communityId]?.name}</option>
                                    )
                                })
                            }
                        </div>
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