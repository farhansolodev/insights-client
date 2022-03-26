import Boxes from "./admin_boxes";
import SearchA from "./search_admin";
import Mahek from "./mahek_part";
import Feed from "./feed";
const MainCont = () => {
    const putmethod = (e) => { 
        console.log("search");
    }
    return ( 
        <div className="main">
            <div className="topcenter">      
            <div className="button-topright">
            <button onClick={putmethod} type="button" className="top_right">
                    placeholder pls
            </button>
            </div>
            </div>
            <Boxes></Boxes>
            <div className="searchbar">
                <SearchA></SearchA>
            </div>
            <Feed></Feed>
        </div>
     );
}
 
export default MainCont;