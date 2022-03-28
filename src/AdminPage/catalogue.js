import styles from "./catalogue.module.css"
import Search from "./search";
import { useState } from "react";
import Card1 from "./Cards/card1"
import Card2 from "./Cards/card2"
import Card3 from "./Cards/card3"

const Catalogue = () => {

    const users = ["id1abc", "id123", "abc123", "aaaa", "afafa"];
    const collabs = ["abcd", "1234", "!@#$%"];
    const report = [];
    const [data, setData] = useState({catalogue: "users", datum: users});


    const userCatalogue = (e) => { 
        e.preventDefault();
        setData(prevState => { 
            return {...prevState , catalogue: "users", datum: users}
        });
    }

    const collabCatalogue = (e) => {
        e.preventDefault();
        setData(prevState => {
            return {...prevState , catalogue: "collabs", datum: collabs}
        });
    }

    const reportCatalogue = (e) => { 
        e.preventDefault();
        setData(prevState => {
            return {...prevState , catalogue: "report", datum: report}
        });
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
            <div className={styles["feed"]}>
                {data.datum.map( () => {
                    if(data.catalogue ==="users")
                        return(<Card1/>)
                    if(data.catalogue ==="collabs")
                        return(<Card2/>)
                    if(data.catalogue ==="report")
                        return(<Card3/>)
                    return("error")
                })} 
            </div>
        </div>
     );
}
 
export default Catalogue;