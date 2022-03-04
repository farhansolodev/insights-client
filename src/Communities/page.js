import AppBar from '../AppBar/bar';
import styles from './communities.module.css'

const Communities = () => {

  const section = (title) => <div className={styles.section}>
    <h2>{title}</h2>
    <div className={styles.sectionCatalogue}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

  return <>
    <AppBar />
    {section('Communities you\'ve joined')}
    {section('Collabs you\'ve liked')}
    {section('Recommended for you')}
  </>;
}

export default Communities;
