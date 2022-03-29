import styles from './collab.catalogue.module.css'
import { useHistory } from "react-router-dom";

import { MdSupervisorAccount as ContributorsIcon } from "react-icons/md";
// import { HiOutlineDotsVertical as SettingsIcon } from "react-icons/hi";

const CollabCard = (props) => {
    const history = useHistory()

    const displayCollab = () => {
        history.push(`/app/collab/${props.id}`)
    }
    return (
        <div className={styles["card-container"]} onClick={displayCollab}>
            <div className={styles["image-container"]}>
                <img src={props.img} alt='Collab Thumbnail'/>
            </div>
            <div className={styles["card-content"]}>
                <div className={styles["owner-icon-container"]}>
                    <img className={styles['owner-icon']} src={props.ownerIcon} alt='Collab Owner'/>
                </div>
                <div className={styles["card-body"]}>
                    {/** holds the title, community name, contributors icon, settings icon*/}
                    <div className={styles["card-header"]}>
                        <h3>{props.title}</h3>
                        <p style={{ fontSize: "75%" }}>{ "Posted in " + props.body.map((comm, index) => {
                            return (index === props.body.length - 1) ? comm : comm + ', '
                        })}</p>
                        <p>Likes: {props.likes}</p>
                    </div>
                    <div className={styles["card-footer"]}>
                        <ContributorsIcon />
                    </div>
                </div>
            </div>
           
            <div className={styles["btn"]}>
                <div className={styles['card-action']} >
                    View Collab
                </div>
            </div>
        </div>
    );
}
 
export default CollabCard;