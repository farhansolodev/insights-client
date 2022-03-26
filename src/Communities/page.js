import { useState, useEffect } from 'react';
import AppBar from '../AppBar/bar';
import { AppBarButtons } from '../Communities/appbar.buttons';
import CreateCommunityPopup from './create.community.popup'
import styles from './communities.module.css'
import { abbrNum } from '../utils';
import cardCovers from '../assets/room.covers'

const prevCommunities = [
  {
    name: "SOMA",
    description: "SOMA is a sci-fi horror game from Frictional Games, creators of the groundbreaking Amnesia and Penumbra series.",
    memberCount: 7800
  },
  {
    name: "Wizards",
    description: "magic is real magic is real magic is real magic is real magic is real magic is real magic is real magic is real magic is real magic is real magic is real magic is real",
    memberCount: 21400
  }]

prevCommunities.forEach((comm) => {
  comm.cardbg = cardCovers[Math.floor((Math.random() * (cardCovers.length - 1)))]
})

const Communities = () => {
  const [appBarStatus, setAppBarStatus] = useState(null)
  
  function onStatusChange(e) {
    e.preventDefault()
    const val = e.target.id
    setAppBarStatus(val)
  }

  const hideForm = () => {
    setAppBarStatus(null)
  }

  return (
    <>
      <AppBar onClickHandler={onStatusChange} buttons={AppBarButtons} title="Your communities"/>
      {
        appBarStatus === "create-new-community" ? <CreateCommunityPopup onCancel={hideForm}/> : null
      }
      <div style={{justifyContent: prevCommunities.length < 4 ? "left" : "center"}} className={styles.communitiesContainer}>
        {prevCommunities.map((comm, i) => (
          <CommunityCard key={i} title={comm.name} description={comm.description} memberCount={comm.memberCount}/>
        ))}
      </div>
    </>
  )
}

const CommunityCard = ({title, description, memberCount, ...rest }) => {
  memberCount = abbrNum(memberCount, 3)
  return (
    <div {...rest} className={styles.cardContainer}>
      <div style={{backgroundImage: `url(${prevCommunities.cardbg})`}} className={styles.cardCover}/>
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
          <button>Join</button>
        </div>
      </div>
    </div>
  )
}

export default Communities;
