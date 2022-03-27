import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AppBar from "../AppBar/bar"
import styles from "./community.module.css"
import { AppBarButtons } from "./appbar.buttons";
import Posts from "./community.posts";

const communityName = "some shit idk"

const Commmunity = () => {

    const [appBarStatus, setAppBarStatus] = useState('');
    const [isMember, setIsMember] = useState(false);
    const history = useHistory();
    //const location = useLocation();

    function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
		setAppBarStatus(val)

        appBarStatus==="join-community" ? setIsMember(true) : setIsMember(false);
	}

    return (
        <>
            <AppBar title={communityName} buttons={isMember ? [AppBarButtons.leave] : [AppBarButtons.join]} onClickHandler={onStatusChange} />
            <div className={styles["community-container"]}>
                <div className={styles.image}>
                    {/* <img src="/horizon.png"/> */}
                </div>
                <div className={styles["posts-container"]}>
                    <Posts />{/* map the community published collabs */}
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                </div>
                <div className={styles["about-container"]}>
                    <div className={styles["about-box"]}>
                        <div className={styles["header"]}>
                            About community
                        </div>
                        <div className={styles["description"]}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </div>
                        <div className={styles["members"]}>
                            Members: 
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}

export default Commmunity;