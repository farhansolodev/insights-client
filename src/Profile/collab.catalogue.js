import { useState, useEffect } from "react";
import CollabCard from "./collab.card"
import styles from './collab.catalogue.module.css'
import { useUser } from '../context/user'
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore"; 

// ==== PUBLISH COLLAB ====
// When publishing a collab, it's 'published' field is set to true
// and it's name and displayPic are updated.

const CollabCatalogue = ({ data, onDataLoad }) => {
    // const [collabs, setCollabs] = useState([]);
    const { userData } = useUser();

    // console.log("Collab Catalogue component - context: ", userData)
    // console.log("Collab Catalogue component - collab data: ", data)

    useEffect(() => {
        if(data.length !== 0) return
        // console.log("getting data")
        // for every collab id, get the collab data from the collab collection
        const q = query(collection(db, "collabs"), where("published", "==", true), where("owners", "array-contains", userData.id))
        getDocs(q).then((snapshot) => {
            // let collabs = []
            // for (const doc of snapshot) {
            //     collabs.push(doc.data())
            // }
            // onDataLoad(collabs)
            snapshot.forEach((doc) => {
                onDataLoad(prev => [...prev, doc.data()])
            });
        })
    },[data, onDataLoad, userData.id])

    return ( 
        <div className={styles["all-collabs"]}>
            {
                // collabs.map((collab, index) => {
                //     // console.log("collab: ", collab);
                //     return <p key={index}>{JSON.stringify(collab)}</p>
                // })
                data.map(({ displayPic, name, communityPosted }, index) => {
                    const ownerpic = require("../assets/default.images").default.user
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