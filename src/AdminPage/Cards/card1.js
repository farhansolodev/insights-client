import "./card1.css"

const Card1 = () => {

    const deleteUser = (e) => { 
        console.log("search");
    }

    const user = "frog";

    return ( 
        <div className="blue-card">
            <div className="user-profile">
                <div className="picButton">
                    {/* <img src="./assets/frog.jpg"/> */}
                </div>
                <div className="name">
                    {user}
                </div>
            </div>
            <button onClick={deleteUser} type="button" className="del">
                Delete
            </button>
        </div>
     );
}
 
export default Card1;