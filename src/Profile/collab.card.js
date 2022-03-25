import styles from './collab.catalogue.module.css'
import { useHistory } from "react-router-dom";

import { MdSupervisorAccount as ContributorsIcon } from "react-icons/md";
import { HiOutlineDotsVertical as SettingsIcon } from "react-icons/hi";

const CollabCard = (props) => {
    const history = useHistory()

    const displayCollab = () => {
        history.push(`/app/collab/${props.title}`)
    }
    return (
        <div className={styles["card-container"]}>
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
                        <p style={{ fontSize: "75%" }}>{props.body.map((comm, index) => {
                            // return a comma separated list of community names if there are more than one, where the last one is not followed by a comma
                            return (index === props.body.length - 1) ? comm : comm + ', '

                            // let comms = ""
                            // comms+=comm
                            // if (index !== comm.length - 1) comms+=", "
                            // return comms
                        })}</p>
                    </div>
                    <div className={styles["card-footer"]}>
                        <ContributorsIcon />   
                        <div className={styles["card-settings-container"]}>
                            <SettingsIcon />
                        </div>
                    </div>
                </div>
            </div>
           
            <div className={styles["btn"]}>
                <div className={styles['card-action']} onClick={displayCollab}>
                    View Collab
                </div>
            </div>
        </div>
    );
}
 
export default CollabCard;