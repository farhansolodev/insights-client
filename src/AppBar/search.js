import { useState } from 'react'
import { useClickAway } from '../utils'
import styles from './search.module.css'

const data = {
  empty: false,
  collabs: [
    { cover: "", title: "dookie", owner: "Azumabito" },
    { cover: "", title: "dookie", owner: "Azumabito" }
  ],
  communitities: [
    { pfp: "", name: "set of real numbers", members: 7, description: "ok bro we get it" },
    { pfp: "", name: "set of real numbers", members: 7, description: "ok bro we get it"},
    { pfp: "", name: "set of real numbers", members: 7, description: "ok bro we get it" }
  ],
  users: [
    { pfp: "", name: "Azumabito", description: "i am so cool wow"}
  ]
}

const Search = () => {
  const [status, setStatus] = useState({ searching: false, searched: false });
  const { searching, searched } = status

  const wrapperRef = useClickAway(function (ref) {
    setStatus(x => ({...x, searched: false}))
    // console.log('clicked away from ', ref)
  })
  
  const inputFocusHandler = (e) => {
    e.preventDefault()

    // console.log('focus!')
  }

  const handleSearch = (e) => { 
    e.preventDefault()
    setStatus(x => ({...x, searched: false, searching: true}))

    setTimeout(() => {
      setStatus(x => ({...x, searched: true, searching: false}))
    }, 1000);
  }

  return (
    <div ref={wrapperRef} className={styles.container}>
      <input onFocus={inputFocusHandler} onKeyPress={(e) => (e.key === 'Enter' && !searching) && handleSearch(e)} type="text" placeholder="Find Collabs, Communities & Users..." />
      <button onClick={!searching ? handleSearch : undefined} className={`${styles.submit} ${searching && styles.searching}`}>{!searching && "Search"}</button>
        {searched && <div className={styles.dropdown}>
          {data.empty ? <p className={styles.empty}>No results found</p> : <>
            {data.communitities.length !== 0 && <div>Communities</div>}
            {data.collabs.length !== 0 && <div>Collabs</div>}
            {data.users.length !== 0 && <div>Users</div>}
          </>}
        </div>}
    </div>
  )
}

export default Search
