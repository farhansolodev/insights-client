import "./card1.css"

const Card1 = () => {

    const putmethod = (e) => { 
        console.log("search");
    }

    return ( 
        <div className="blue-card">
            <div className="pic">
            <button onClick={putmethod} type="button" className="picButton">
                    PIC
            </button>
            </div>
            <div className="middle">
            <button onClick={putmethod} type="button" className="name">
                    Name 
            </button>
            </div>
            <div className="side">
            <button onClick={putmethod} type="button" className="del">
                    Delete
            </button>
            </div>
        </div>
     );
}
 
export default Card1;