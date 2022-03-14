import AppBar from '../AppBar/bar';
import styles from './communities.module.css'

const Communities = () => {

  const section = (title, data, hero) => <div className={styles.section + ` ${hero && styles.heroSection}`}>
    <h2
      className={styles.sectionTitle}
      // style={{ ...(hero && { fontSize: "1.5rem" }) }}
    >{title}</h2>
    <div className={styles.sectionCatalogue}>
      {data.map((el, index) => {
        return <div className={styles.sectionItem} key={index}></div>
      })}
    </div>
  </div>

  return <>
    <AppBar />
    <div className={styles.page}>
      {section('Recommended for you',[1, 6, 6, 7], true)}
      {section('Collabs you\'ve liked',[1,2,3])}
      {section('Communities you\'ve joined',[1,2,3,4,6,8])}
    </div>
    </>;
}

export default Communities;
