import "./card3.css"
import { IoMdFlag } from "react-icons/io"

const Card3 = () => {

    function view() { 
        console.log("search");
    }
    
    function deleteCollab() {

    }

    return ( 
        <div className="red-card">
            <div className="report">
                <div className="pic">

                </div>
                <div className="content">
                    <div className="reporter">
                        <IoMdFlag /> Reported by user13:
                    </div>
                    <div className="body">
                        <div className="collab">
                                Return Of the white knights
                        </div>
                        <div className="owner">
                                Chris Rock
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