import styles from './section.module.css'

const Section = ({title, /*hero,*/ children}) => {
    return (
      <div className={styles.container /*+ ` ${hero && styles.hero}`*/}>
        <h2
          className={styles.title}
        >{title}
        </h2>
        {children}
      </div>
    )
}

export default Section