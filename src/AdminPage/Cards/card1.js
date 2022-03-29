import "./card1.css"
import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";

const Card1 = ({ikey, id, name, pfp, community}) => {

    // const deleteUser = (e) => {
    //     updateDoc(doc(db, "communities", community.id), {
    //         members: arrayRemove(id)
    //     })

    //     updateDoc(doc(db, "users", id), {
    //         prevCommunities: arrayRemove(community.id)
    //     })
    //     // console.log("search");
    // }

    // console.log(id, name, pfp, community)

    return ( 
        <div key={ikey} className="blue-card">
            <div className="user-profile">
                <div className="picButton">
                    {/* <img src={'../../assets/horizon.png'}/> */}
                </div>
                <div className="name">
                    {"Susan"}
                </div>
            </div>
            <button /*onClick={deleteUser}*/ type="button" className="del">
                Ban
            </button>
        </div>
     );
}
 
export default Card1;