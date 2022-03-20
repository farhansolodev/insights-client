import Search from './search';
import styles from './appbar.module.css'

const AppBar = ({ styles: s, onClickHandler, buttons, title }) => {
    return(
        <nav className={styles.barContainer} style={{ ...s }} >
            <div className={styles.title}>{title}</div>
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