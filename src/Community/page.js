import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AppBar from "../AppBar/bar"
import styles from "./community.module.css"
import { AppBarButtons } from "./appbar.buttons";

const communityName = "some shit idk"

const Commmunity = () => {

    
    const [appBarStatus, setAppBarStatus] = useState('');
    const [isMember, setIsMember] = useState(false);
    const history = useHistory();
    const location = useLocation();
    
    function join() {
        console.log("reach");
        setIsMember(true);
    }

    function leave() {
        console.log("FFF");
        setIsMember(false);
    }

    function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
		setAppBarStatus(val)

        appBarStatus==="leave-community" ? leave() : join();
	}

    return(
        <>
            <AppBar title={communityName} buttons={isMember ? [AppBarButtons.leave] : [AppBarButtons.join]} onClickHandler={onStatusChange} />
            <div className={styles["community-container"]}>
                <div className={styles.image}>
                    {/* <img src="/horizon.png"/> */}
                </div>
                <div className={styles["posts-container"]}>
                    POSTS
                </div>
                <div className={styles["about-container"]}>
                    <div className={styles["about-box"]}>
                        BOXBOX
                    </div>
                </div>    
            </div>
        </>
    )
}

export default Commmunity;