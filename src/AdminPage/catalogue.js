import styles from "./catalogue.module.css"
import Search from "./search";
import Feed from "./feed";
import { useState } from "react";

const Boxes = () => {

    const [cataloguePicker, setCataloguePicker] = useState("users");

    const userCatalogue = (e) => { 
        setCataloguePicker("users");
        console.log("CLICKED");
        <Feed />
    }
    const collabCatalogue = (e) => { 
        setCataloguePicker("collabs");
    }
    const reportCatalogue = (e) => { 
        setCataloguePicker("report");
    }

    return (
        <div className={styles["box_cont"]}>
            <div className={styles["header"]}>
                <button onClick={userCatalogue} type="button" className={styles["admin_buttons"]}>
                    Users
                </button>
                <button onClick={collabCatalogue} type="button" className={styles["admin_buttons"]}>
                    Collabs
                </button>
                <button onClick={reportCatalogue} type="button" className={styles["admin_buttons"]}>
                    Report
                </button>
            </div> 
            <div className={styles["searchbar"]}>
                <Search></Search>
            </div>
            <Feed catalogue={cataloguePicker}/>
        </div>
     );
}
 
export default Boxes;