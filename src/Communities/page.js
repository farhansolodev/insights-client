import { useState, useEffect } from 'react'
import AppBar from '../AppBar/bar'
import { AppBarButtons } from '../Communities/appbar.buttons'
import CreateCommunityPopup from './create.community.popup'
import styles from './communities.module.css'
import { abbrNum } from '../utils'
import { useUser } from '../context/user'
import { getDoc } from 'firebase/firestore'

const Communities = () => {
  const [appBarStatus, setAppBarStatus] = useState(null)
  const [previousCommunities, setPreviousCommunities] = useState([])

  const userData = useUser().userData?.data
  
  function onStatusChange(e) {
    e.preventDefault()
    const val = e.target.id
    setAppBarStatus(val)
  }

  const hideForm = () => {
    setAppBarStatus(null)
  }

  // console.log(previousCommunities)

  useEffect(() => {
    const prevComms = userData?.previousCommunities
    
    if (!prevComms) return
    prevComms.filter(comm => typeof comm !== 'string').length !== 0 && prevComms.map(async (ref, i) => {
      if(typeof ref === 'string') return
      if (prevComms.some(obj => JSON.stringify(obj.ref) == JSON.stringify(ref))) console.log('prevComm already set: ', ref)
      const comm = (await getDoc(ref)).data()
      if(!comm) return
      setPreviousCommunities(prev => [...prev, {data: comm, ref}])
    })
  },[ userData?.username ])

  // return null
  return (
    <>
      <AppBar onClickHandler={onStatusChange} buttons={AppBarButtons} title="Your communities"/>
      {
        appBarStatus === "create-new-community" ? <CreateCommunityPopup onCancel={hideForm}/> : null
      }
      <div style={{justifyContent: previousCommunities?.length < 4 ? "left" : "center"}} className={styles.communitiesContainer}>
        {previousCommunities.length === 0 ? <h1>No communities yet</h1> : previousCommunities.map((comm, i) => {
          comm = comm.data
          return <CommunityCard key={i} title={comm.name} cover={comm.image} description={comm.description} memberCount={comm.members.length}/>
        })}
      </div>
    </>
  )
}

const CommunityCard = ({title, cover, description, memberCount, ...rest }) => {
  memberCount = abbrNum(memberCount, 3)

  function enterHandler(e){

  }

  function leaveHandler(e) {

  }

  return (
    <div {...rest} className={styles.cardContainer}>
      <div onClick={enterHandler} style={{backgroundImage: `url(${cover})`}} className={styles.cardCover}/>
      <div className={styles.cardBody}>
        <div className={styles.title}>
          <header>{title}</header>
        </div>
        <div className={styles.description}>
          <p>{description}
          </p>
        </div>
        <div className={styles.members}>
          {memberCount}
          <p>Members</p>
        </div>
        <div className={styles.action}>
          <button onClick={leaveHandler}>Leave</button>
        </div>
      </div>
    </div>
  )
}

export default Communities;
