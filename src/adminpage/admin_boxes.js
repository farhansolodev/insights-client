import SearchA from "./search_admin";
const Boxes = () => {
    const onClick1 = (e) => { 
        console.log("clicked box1");
    }
    const onClick2 = (e) => { 
        console.log("clicked box2");
    }
    const onClick3 = (e) => { 
        console.log("clicked box3");
    }
    return ( 
        
        <div className="box_cont">
            <div className="small_box" >
            <button onClick={onClick1} type="button" className="admin_buttons">
                <div className="admin_button_text">
                    user
                </div>
            </button>
            </div>
            <div className="small_box">
            <button onClick={onClick2} type="button" className="admin_buttons">
            <div className="admin_button_text">
                    collab
                </div>
            </button>
            </div>
            <div className="small_box">
            <button onClick={onClick3} type="button" className="admin_buttons">
            <div className="admin_button_text">
                    report
                </div>
            </button>
            </div>
        </div>
     );
}
 
export default Boxes;