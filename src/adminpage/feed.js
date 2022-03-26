import "./feed.css";
import Card1 from "./card1"
import Card2 from "./card2"
import Card3 from "./card3"

const Feed = () => {

    return (
        <div className="feeddiv">
            <div className="center-aligned">
                <div className="allcards">
                <Card1></Card1>
                <Card2></Card2>
                <Card3></Card3>
                <Card1></Card1>
                <Card2></Card2>
                <Card3></Card3>
            </div>
            </div>
           
        </div>



    );
}
 
export default Feed;
