import "./card3.css"
import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { useHistory, useEffect } from "react-router-dom"
import { db } from "../../firebase";
import { IoMdFlag } from "react-icons/io"

const Card3 = ({id, name, pic, reporterId, owner, community}) => {

    const history = useHistory();

    // useEffect(() => {
        // console.log('this runs: ', comData, comName)
        // if(collabData.length !== 0) return
        // // console.log('this runs 2')
        // if(!comData?.publishedCollabs) return
        // // console.log('this runs 3')
        // comData.publishedCollabs.forEach(collabId => {
        //     getDoc(doc(db, "users", reporterId)).then(snap => {
		// 		const reporter = snap.data()
		// 		setCollabData(prev => {
		// 			return [
		// 				...prev,
		// 				{ id: collabId, ...collab }
        //             ]
		// 		})
		// 	})
        // })
    // }, [comData, comName])
    function view() { 
        history.push(`/app/collab/${name}`)
    }
    
    function deleteCollab() {
        updateDoc(doc(db, "communities", community.id), {
            publishedCollabs: arrayRemove(id)
        })
    }

    return ( 
        <div className="red-card">
            <div className="report">
                <div className="pic">
                <img src={pic}/>
                </div>
                <div className="content">
                    <div className="reporter">
                        <IoMdFlag /> Reported by user13:
                    </div>
                    <div className="body">
                        <div className="collab">
                                {name}
                        </div>
                        <div className="owner">
                                {owner}
                        </div>
                    </div>
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
 
export default Card3;