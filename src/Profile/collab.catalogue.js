import { useState, useEffect } from "react";
import CollabCard from "./collab.card"
import styles from './collab.catalogue.module.css'
import { useUser } from '../context/user'
import { db } from "../firebase";
import { collection, getDocs, getDoc, query, doc, where } from "firebase/firestore"; 

const CollabCatalogue = () => {
    const [collabData, setCollabData] = useState([]);
    const [searching, setSearching] = useState(true);
    const { userData } = useUser();
    
    useEffect(() => {
        if(!userData.data) return
        if(collabData.length !== 0) return
        
        for (const collabId of userData.data.publishedCollabs) {
            (async () => {
                const collab = (await getDoc(doc(db, "collabs", collabId))).data()
                const collabOwner = (await getDoc(doc(db, "collabs", collab.owners[0]))).data()
                console.log(collab, collabOwner)
            })()
        }
        console.log('done')
        // setSearching(false)
        // console.log(userData.data)
        // for every collab id, get the collab data from the collab collection
        // const q = query(collection(db, "collabs"), where("published", "==", true))
        // getDocs(q).then((snapshot) => {
        //     snapshot.forEach(async (document) => {
        //         let collab = document.data()
        //         if (collab.owners.includes(userData.id)) {
        //             collab.ownerpic = userData.data.pfp
        //         } else {
        //             const vs_snap = await getDoc(doc(db, "virtual-spaces", collab.virtualSpaceId))
        //             const vs = vs_snap.data()
        //             if (!vs)
        //             { 
        //                 setSearching(false)
        //                 return
        //             }
        //             if (!vs && !vs.editors)
        //             { 
        //                 setSearching(false)
        //                 return
        //             }
        //             if (!vs.editors.includes(userData.id)) 
        //             { 
        //                 setSearching(false)
        //                 return
        //             }
        //             const snap = await getDoc(doc(db, "users", vs.owners[0]))
        //             collab.ownerpic = snap.data().pfp
        //         }
        //         setCollabData(prev => [...prev, collab])
        //         setSearching(false)
        //     })
        // })
    },[collabData, userData.username ])

    return ( 
        <div className={styles["all-collabs"]}>
            {
                collabData.length == 0 ? (searching ? <h1>Loading...</h1> : <h1>No collabs here</h1>) :
                collabData.map(({ displayPic, name, ownerpic, communityPosted }, index) => {
                    // const ownerpic = require("../assets/default.images").default.user
                    return <CollabCard
                        key={index}
                        img={displayPic}
                        title={name}
                        ownerIcon={ownerpic}
                        body={communityPosted}
                    />
                })
            }
        </div>
     );
}

export default CollabCatalogue;