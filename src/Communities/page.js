import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
  // const [searching, setSearching] = useState(true)

  const userData = useUser().userData?.data
  
  function onStatusChange(e) {
    e.preventDefault()
    const val = e.target.id
    setAppBarStatus(val)
  }

  const hideForm = () => {
    setAppBarStatus(null)
  }


  useEffect(() => {
    // if(!searching) setPreviousCommunities([])
    const prevComms = userData?.previousCommunities
    
    if (!prevComms) return
    
    prevComms.filter(comm => typeof comm !== 'string').length !== 0 && prevComms.map(async (ref, i) => {
      if(typeof ref === 'string') return
      // if (prevComms.some(obj => JSON.stringify(obj.ref) == JSON.stringify(ref))) console.log('prevComm already set: ', ref)
      const comm = (await getDoc(ref)).data()
      if(!comm) return
      // console.log(ref)
      setPreviousCommunities(prev => [...prev, {data: comm, ref}])
    })
    
    // if(searching) setSearching(false)

    // console.log('done: ', previousCommunities)
  },[ userData?.username ])

  // console.log(previousCommunities)
  return (
    <>
      <AppBar onClickHandler={onStatusChange} buttons={AppBarButtons} title="Your communities"/>
      {
        appBarStatus === "create-new-community" ? <CreateCommunityPopup onCancel={hideForm}/> : null
      }
      <div style={{justifyContent: previousCommunities?.length < 4 ? "left" : "center"}} className={styles.communitiesContainer}>
        {previousCommunities.map((comm, i) => {
          return <CommunityCard community={comm} key={i} title={comm.data.name} cover={comm.data.image} description={comm.data.description} memberCount={comm.data.members.length + 1}/>
        })}
      </div>
    </>
  )
}

const CommunityCard = ({ community, title, cover, description, memberCount, ...rest }) => {
  memberCount = abbrNum(memberCount, 3)

  const history = useHistory()

  function enterHandler(e){
    // console.log('clicked')
    history.push(`/app/communities/${title}`);
  }

  return (
    <div onClick={enterHandler} {...rest} className={styles.cardContainer}>
      <div style={{backgroundImage: `url(${cover})`}} className={styles.cardCover}/>
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
          <button>Visit</button>
        </div>
      </div>
    </div>
  )
}

export default Communities;
