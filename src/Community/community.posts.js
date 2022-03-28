import React, { useState } from "react";
import styles from "./posts.module.css";
import { AiOutlineLike as Like, AiFillLike as Liked} from "react-icons/ai";

const Posts = ({name, content}) => {

    const [like, setLike] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(32); //delete this once collab (down) works

    //get collabs data here FIREBASE STUFF
    const [collab, setCollab] = useState([]); // separate heading, descrition and number of likes


    //replace number of likes with collab.likes
    function handleLike(e) {
        setLike(!like);
        like ? setNumberOfLikes(numberOfLikes-1) : setNumberOfLikes(numberOfLikes+1)
        console.log("liked? : " + like)
    }

    return (
        <div className={styles["collab-container"]}>
            <div className={styles["heading"]}>
                {/*collab.heading*/}{name}THE WHEEL OF TIME
            </div>
            <div className={styles["collab-content"]}>
                {/*collab.content*/} Content :- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur mollit anim Lorem ipsum dolor sit amet, 
                consectetur mollit anim
            </div>
            <div className={styles["likes"]}>
                <button className={styles["like-button"]} onClick={handleLike}>
                    {like ? <Liked /> : <Like />} 
                </button>
                <p className={styles["text"]}> {/*collab.likes */} likes</p>
            </div>
        </div>
    )
}

export default Posts;