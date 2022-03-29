import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Quill from "quill"
import styles from "./posts.module.css"
import { AiOutlineLike as Like, AiFillLike as Liked} from "react-icons/ai"
import { IoMdFlag as Report} from "react-icons/io"
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore"
import { db } from "../firebase"
import { useUser } from "../context/user"

const Post = ({id, name, comId, isMember, content, likeVal, setComData, usersLiked, usersReported}) => {

    const [like, setLike] = useState(false)
    const [reported, setReported] = useState(false)
    const [htmlText, setHtmlText] = useState()
    const [numberOfLikes, setNumberOfLikes] = useState()
    const { userData } = useUser()
    // console.log(userData)
    const history = useHistory()

    //To display meta-content of collab
    useEffect(() => {
        let qlContainerDiv = document.createElement("div")
        var editor = new Quill(qlContainerDiv)
        editor.setContents(JSON.parse(content))
        setHtmlText(editor.getText())
    }, [])

    //Set number of likes of collab, whether user has liked or reported this collab before
    useEffect(() => {
        setNumberOfLikes(likeVal)
        usersLiked && setLike(usersLiked.includes(userData.id))
        usersReported && setReported(usersReported.includes(userData.id))
    },[])

    //If like button is clicked accordingly increment or decrement the like value in the database
    function handleLike(e) {
        e.stopPropagation()
        const liked = !like

        if(liked) {
            /** add likes to firebase */
            updateDoc(doc(db, "collabs", id), {
                likes: increment(1),
                usersLiked: arrayUnion(userData.id)
            })

            setNumberOfLikes(numberOfLikes+1)
        } else {
            /** deduct likes from firebase */
            updateDoc(doc(db, "collabs", id), {
                likes: increment(-1),
                usersLiked: arrayRemove(userData.id)
            })
            
            setNumberOfLikes(numberOfLikes-1)
        }

        /* update state to cause post to rerender with new firebase data */
        setLike(liked);
    }

    function handleReport(e){
        e.stopPropagation()
        const isReported = !reported

        if(isReported) {
            //Add user's id to usersReported field in collab
            updateDoc(doc(db, "collabs", id), {
                reports: increment(1),
                usersReported: arrayUnion(userData.id)
            })
            
            //Add { username , collabId } to reportedCollabs field in communities
            updateDoc(doc(db, "communities", comId), {
                reportedCollabs: arrayUnion({ username: userData.data.username, collabId: id })
            })
            setComData(prev => ({...prev, reportedCollabs: [...prev.reportedCollabs, id]}))
        }
        else {
            //Remove user's id from usersReported field in collab
            updateDoc(doc(db, "collabs", id), {
                reports: increment(-1),
                usersReported: arrayRemove(userData.id)
            })

            //Remove { userId , collabId } from reportedCollabs field in communities
            updateDoc(doc(db, "communities", comId), {
                reportedCollabs: arrayRemove({ username: userData.data.username, collabId: id })
            })

            setComData(prev => ({...prev, reportedCollabs: [...prev.reportedCollabs.filter(collabid => id !== collabid)]}))
        }

        /* update state to cause post to rerender with new firebase data */
        setReported(isReported)
    }

    //If collab is clicked display the collab in seperate page
    const displayCollab = (name) => {
        history.push(`/app/collab/${name}`)
    }

    return (
        <div className={styles["collab-container"]} onClick={() => displayCollab(id)} >
            <div className={styles["heading"]}>{name}</div>

            <div className={styles["collab-content"]}>{htmlText}</div>
            
            <div className={styles["likes"]}>
                <button className={`${styles["like-button"]}`} onClick={isMember ? handleLike : undefined}>
                    {isMember && (like ? <Liked /> : <Like />)} 
                </button>
                <p className={styles["text"]}> {numberOfLikes} likes</p>
                <button className={`${styles['report-button']} ${reported ? styles['reported'] : ''}`} onClick={isMember ? handleReport : undefined}>
                    {isMember && <Report />} 
                </button>
            </div>
        </div>
    )
}

export default Post;