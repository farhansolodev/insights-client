import "./card1.css"
import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";

const Card1 = ({id, name, pfp, community}) => {

    const deleteUser = (e) => {
        updateDoc(doc(db, "communities", community.id), {
            members: arrayRemove(id)
        })

        updateDoc(doc(db, "users", id), {
            prevCommunities: arrayRemove(community.id)
        })
        // console.log("search");
    }

    console.log(id, name, pfp, community)
    
    return ( 
        <div className="blue-card">
            <div className="user-profile">
                <div className="picButton">
                    <img src={pfp}/>
                </div>
                <div className="name">
                    {name}
                </div>
            </div>
            <button onClick={deleteUser} type="button" className="del">
                Delete
            </button>
        </div>
     );
}
 
export default Card1;