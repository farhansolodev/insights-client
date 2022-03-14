import styles from "./catalogue.picker.module.css"

const ProfileCataloguePicker = ({ active, onPick, buttons }) => {
    return ( 
        <div className={styles["button-container"]}>
            {
                buttons.map(({ text, icon: Icon }, index) => {
                    let style = styles["collab-comm"]
                    if (index === active) style += " " + styles["collab-comm-active"]
                    // can use onMouseOver and onMouseOut to control hover behavior
                    return <button key={index} onClick={(e) => {
                        e.preventDefault()
                        // console.log(index)
                        onPick(index)
                    }} className={style}><Icon/><p>{text}</p></button>
                })
            }
        </div>
    );
}
 
export default ProfileCataloguePicker;

// const Button = () => {
//     return (  );
// }
 
// export default Button;
