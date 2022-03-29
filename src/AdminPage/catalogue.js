import styles from "./catalogue.module.css"
import Search from "./search";
import { useState } from "react";
import Card1 from "./Cards/card1"
import Card2 from "./Cards/card2"
import Card3 from "./Cards/card3"
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Catalogue = ({ community }) => {
    
    const [users, setUsers] = useState([]);
    const [collabs, setCollabs] = useState([]);
    const [reports, setReports] = useState([]);
    const [data, setData] = useState({catalogue: "users", datum: users});

    console.log(users, data)

    useEffect(() => {
        if(users.length>0) return
        // getDoc(doc())
        community.members.forEach(async (id) => {
            const user = (await getDoc(doc(db, "users", id))).data()
            const newdata = rest => ([...rest, { id, name: user.username, pfp: user.pfp }])
            setUsers(prev => newdata(prev))
        })
    }, [])

    useEffect(() => {
        if(collabs.length>0) return
        community.publishedCollabs.forEach(async (id) => {
            const collab = (await getDoc(doc(db, "collabs", id))).data()
            setCollabs(prev => {
                return [
                    ...prev,
                    { id, ...collab }
                ]
            })
        })
    }, [])

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
            return {...prevState , catalogue: "reports", datum: reports}
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
                {data.datum.map((el) => {
                    console.log(el)
                    // if(el.catalogue ==="users")
                    // return(<Card1 community={community} pfp={data.pfp} id={data.id} name={data.name} />)
                    // if(el.catalogue ==="collabs")
                    //     return(<Card2 community={community}/>)
                    // collabs.usersReported?.map((id,index) => {
                    //     if(el.catalogue ==="reports")
                    //     return(<Card3 key={index} community={community} reporterId={id} pic={el.displayPic} owner={el.owners[0]} id={el.id} name={el.name} />)
                    // })
                })} 
            </div>
        </div>
     );
}
 
export default Catalogue;