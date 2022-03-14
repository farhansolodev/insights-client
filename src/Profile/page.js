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

const Profile = () => {
    const [catalogueState, setCatalogueState] = useState(0);
    const [collabData, setCollabData] = useState([]);
    const { userData } = useUser()
	// console.log("Profile component - context:",userData)

    const onLogOut = (e) => { 
        e.preventDefault()
        signOut(auth)
    }

    return ( 
        <>
            <AppBar onClickHandler={onLogOut} buttons={AppBarButtons}/>
            <div >
                    {/** Entire top section above the buttons for the catalogue*/}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        borderBottom: "3px solid black",
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
                            <div style={{
                                width: "100%",
                            }}>
                            { userData.data ?
                                <>
                                    <h4>{userData.data.publishedCollabs.length} Collabs published</h4>
                                    <h4>{userData.data.previousCommunities.length} Communities joined</h4>
                                </> : <h4>Loading stats...</h4>
                            }
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <div className={pickerStyles["button-container"]}>
                            {
                                CataloguePickerButtons.map(({ text, value, icon: Icon }, index) => {
                                    let style = pickerStyles["collab-comm"]
                                    if (value === catalogueState) style += " " + pickerStyles["collab-comm-active"]
                                    return <button key={index} value={value} onClick={e => {
                                        e.preventDefault()
                                        const val = e.target.value
                                        // console.log(val)
                                        setCatalogueState(val)
                                    }} className={style}>{text}</button>
                                })
                            }
                        </div> */}
                        <ProfileCataloguePicker active={catalogueState} onPick={setCatalogueState} buttons={CataloguePickerButtons} />
                    </div>
                    {
                        catalogueState === 0 ?
                        <CollabCatalogue data={collabData} onDataLoad={setCollabData}/>
                        : 
                            <CommunityCatalogue />
                    }
            </div>
        </>
     );
                
}
export default Profile;
