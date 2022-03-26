import "./card2.css"

const Card2 = () => {

    const putmethod = (e) => { 
        console.log("search");
    }
    return ( 
        <div className="green-card">
            <div className="pic1">
            <button onClick={putmethod} type="button" className="p">
                    PIC
            </button>
            </div>
            <div className="body">
                <div className="middle1">
                    <button onClick={putmethod} type="button" className="collab">
                        collab
                    </button>
                </div>
                <div className="middle2">
                    <button onClick={putmethod} type="button" className="owner">
                        owner
                    </button>
                </div>
            </div>
        <div className="side-part">
            {/* <div className="side1"></div>
            <div className="side2">
            <button onClick={putmethod} type="button" className="del">
                    Delete
            </button>
            </div> */}

            <div className="side1">
                <button onClick={putmethod} type="button" className="v" >
                    View
                </button>
            </div>

            <div className="side2">
            <button onClick={putmethod} type="button" className="d" >
                Delete
             </button>
            </div> 
        </div>
            
        </div>
     );
}
 
export default Card2;