import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "../AppBar/bar"
import styles from "./community.module.css"

const Commmunity = () => {

    const history = useHistory();

    return(
        <>
            <AppBar /> 
            <div className={styles["image"]}>
                
            </div>
            <div className={styles["container"]}>
                <div className={styles["posts"]}>
                    
                </div>
                <div className={styles["about"]}>

                </div>
            </div>    
        </>
    )
}

export default Commmunity;