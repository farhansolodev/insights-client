import { useState } from 'react'
import AppBar from '../AppBar/bar'
import CollabCatalogue from './collab.catalogue';
import CommunityCatalogue from './community.catalogue';
import { auth } from "../firebase"
import { signOut } from 'firebase/auth'
import ProfileCataloguePicker from './catalogue.picker';
import { useUser } from '../context/user'
import { AppBarButtons } from './appbar.buttons'
import { CataloguePickerButtons } from "./catalogue.picker.buttons";
import styles from './profile.module.css'

const Profile = () => {
    const [catalogueState, setCatalogueState] = useState(0);
    const { userData } = useUser()
	// console.log("Profile component - context:",userData)

    const onLogOut = (e) => { 
        e.preventDefault()
        signOut(auth)
    }
    
    return ( 
        <>
            <AppBar onClickHandler={onLogOut} buttons={AppBarButtons} title="Profile"/>
            <div style={{overflowY: "scroll"}}>
                    {/** Entire top section above the buttons for the catalogue*/}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        borderBottom: "1px solid #ccc",
                        padding: "2%",
                        gap: "4rem"
                    }}>
                        {/** Profile pic */}
                        <div>
                            <img style={{
                                borderRadius: "50%",
                                width: "160px",
                                height: "160px",
                                margin: "10px"
                            }}
                                src={userData.data ? userData.data.pfp : require('../assets/default.images').default.user}
                                alt='Profile'
                            />
                        </div>
                        {/** Section on the right with profile info */}
                        <div style={{
                            textAlign: "left",
                            margin: "10px",
                            color: "black",
                        }}>
                            {/** Just the username */}
                            <h2>{userData.data ? userData.data.username : "Loading username..."}</h2>
                            {/** Rest of the info about the profile */}
                            <div className={styles.stats}>
                            { userData.data ?
                                <>
                                    <h4>{userData.data.publishedCollabs.length} Collabs published</h4>
                                    <h4>{userData.data.previousCommunities.length} Communities joined</h4>
                                </> : <h4>Loading stats...</h4>
                            }
                            </div>
                            {/* <div className={styles.description}>{"yea im pretty cool"}</div> */}
                        </div>
                    </div>
                    <div>
                        <ProfileCataloguePicker active={catalogueState} onPick={setCatalogueState} buttons={CataloguePickerButtons} />
                    </div>
                    {
                        catalogueState === 0 ? <CollabCatalogue /> : <></>
                    }
            </div>
        </>
     );
                
}
export default Profile;
