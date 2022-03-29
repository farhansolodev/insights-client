import AppBar from '../AppBar/bar'
import styles from './home.module.css'
import Section from '../styles/Section'
import { useState } from 'react'
import { useUser } from "../context/user"

const Home = () => {
  const [recommended, setRecommended] = useState([1,1,1,1,1])
  // const [liked, setLiked] = useState([1,1,1,1,1,1,1,1,1,])
  // const [joined, setJoined] = useState([1,1,1])

  return <>
    <AppBar title="Home"/>
    <div className={styles.page}>
      <Section title="Recommended for you">
        <div className={styles.catalogue}>
          {recommended.map((el, index) => {
            return <div className={styles.item} key={index}></div>
          })}
        </div>
      </Section>
      <Section title="Collabs you've liked">
        <div className={styles.catalogue}>
          {/* {liked.map((el, index) => {
            return <div className={styles.item} key={index}></div>
          })} */}
        </div>
      </Section>
    </div>
  </>;
}

export default Home;
