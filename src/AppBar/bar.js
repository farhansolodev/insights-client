import styles from './appbar.module.css'
import Search from './search';

const AppBar = ({ styles: s, onClickHandler, buttons }) => {

    return(
        <nav className={styles.barContainer} style={{ ...s }} >
            <Search />
            <div className={styles.buttonsContainer}>
                {buttons && buttons.map(({ text, value, icon: Icon }, index) => { 
                    const childrenStyles = { pointerEvents: "none" }
                    return <div key={index} className={styles.button} id={value} onClick={onClickHandler} ><Icon style={childrenStyles}/>{text && <p style={childrenStyles} >{text}</p>}</div>
                })}
            </div>
        </nav>
    )
}

export default AppBar