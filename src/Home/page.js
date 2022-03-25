import AppBar from '../AppBar/bar';
import styles from './home.module.css'

const Home = () => {

  const section = (title, data, hero) => <div className={styles.section + ` ${hero && styles.heroSection}`}>
    <h2
      className={styles.sectionTitle}
    >{title}</h2>
    <div className={styles.sectionCatalogue}>
      {data.map((el, index) => {
        return <div className={styles.sectionItem} key={index}></div>
      })}
    </div>
  </div>

  return <>
    <AppBar title="Communities"/>
    <div className={styles.page}>
      {section('Recommended for you',[1, 6, 6, 7], true)}
      {section('Collabs you\'ve liked',[1,2,3])}
      {section('Communities you\'ve joined',[1,2,3,4,6,8])}
    </div>
    </>;
}

export default Home;
