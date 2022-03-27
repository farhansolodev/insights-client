import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import AppBar from "../AppBar/bar"
import styles from "./community.module.css"
import { AppBarButtons } from "./appbar.buttons";
import Posts from "./community.posts";
import { useEffect } from "react/cjs/react.production.min";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";
import { useUser } from "../context/user";


const Commmunity = ({name}) => {
    
    const {id: comName } = useParams();
    //FIREBASE STUFF for comData
    const [comId, setComId] = useState();
    const [comData, setComData] = useState([]);
    const { userData } = useUser();
    const [appBarStatus, setAppBarStatus] = useState('');

    //this should be run when someone opens the community page to check if user is a member or not to initialise the isMember field
    async function checkMember() {
        if(comData.members.includes(userData.id)) {
            setIsMember(true)
        } else {
            setIsMember(false)
        }
    }
    const [isMember, setIsMember] = useState(false); 

    const communityName = "Soulsborne Community" //set this as comData.name
    
    const history = useHistory();

    //what i couldnt do :(
    useEffect( () => {
        const q = query(collection(db, "communities"), where("name", "==", comName))
        getDocs(q).then((snapshot) => {
            snapshot.forEach(async (doc) => {
                setComId(doc.id)
                setComData(doc.data())
            });
        })
    }, [comName])
    
    console.log(comData);

    function join() {
        //comData.members append user.id
        setIsMember(true);
    }

    function leave() {
        //comData.members remove user.id
        setIsMember(false);
    }

    function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
		setAppBarStatus(val)

        appBarStatus==="join-community" ? join() : leave();
	}

    return (
        <>
            <AppBar title={communityName} buttons={isMember ? [AppBarButtons.leave] : [AppBarButtons.join]} onClickHandler={onStatusChange} />
            <div className={styles["community-container"]}>
                <div className={styles.image}>
                </div>
                <div className={styles["posts-container"]}>
                    {
                        comData.map(({ name, content }) => {
                            return <Posts name={name} content={content}/>
                        })
                    }
                    {/* map the community published collabs and pass each collab id for posts*/}
                    <Posts /*collabs={collab.data()*//>
                </div>
                <div className={styles["about-container"]}>
                    <div className={styles["about-box"]}>
                        <div className={styles["header"]}>
                            About community
                        </div>
                        <div className={styles["description"]}>
                            {/*comData.description */}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </div>
                        <div className={styles["members"]}>
                            Members: {/*comData.members.length() + 1*/}
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}

export default Commmunity;