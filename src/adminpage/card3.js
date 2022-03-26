import "./card3.css"

const Card3 = () => {

    const putmethod = (e) => { 
        console.log("search");
    }
    return ( 
        <div className="red-card">
        <div className="report">
           <div className="reporter">
            <button onClick={putmethod} type="button" className="r">
                            reporter
            </button>
           </div>
            <div className="pic2">
                <button onClick={putmethod} type="button" className="p">
                        PIC
                </button>
            </div>
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
 
export default Card3;