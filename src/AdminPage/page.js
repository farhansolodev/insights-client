import Catalogue from "./catalogue";
import { useState } from "react";
import styles from "./admin.module.css"
import Appbar from "../AppBar/bar"
import { AppBarButtons } from "./appbar.buttons";
import { useHistory } from "react-router-dom";

const Dashboard = () => {

    const [appBarStatus, setAppBarStatus] = useState();
    const history = useHistory();

    function leave() {
        history.goBack();
    }

    function onStatusChange(e) {
        e.preventDefault();
        const val = e.target.id;
        setAppBarStatus(val)
        if(appBarStatus === "leave-dashboard")
            leave();
    }

    return ( 
        <>
            <Appbar buttons={AppBarButtons} onClickHandler={onStatusChange}/>
                <div className={styles["container"]}>
                    <div className={styles["container-position"]}>
                        <Catalogue />
                    </div>
                </div>
        </>
     );
}
 
export default Dashboard;