import "./card2.css"
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Card2 = ({id, name, community}) => {

    function view() { 
        console.log("search");
    }
    
    function deleteCollab() {
        // updateDoc(doc(db, "communities", community,id), {
        //     publishedCollabs: arrayRemove(id)
        // })
    }

    return ( 
        <div className="green-card">
            <div className="left-side">
                <div className="pic">
                    {/* <img src=""/> */}
                </div>    
                <div className="collab-id">
                        collab
                </div>
            </div>
            <div className="right-side">
                <button onClick={view} type="button" className="view" >
                    View
                </button>
                <button onClick={deleteCollab} type="button" className="delete-collab" >
                    Delete
                </button>
            </div> 
        </div>
     );
}
 
export default Card2;