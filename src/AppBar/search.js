import { useState } from 'react'
import { useClickAway, debounce } from '../utils'
import styles from './search.module.css'

const data = {
  empty: false,
  collabs: [
    { name: "ayo??? 🤔🤔🤔🤔", owner: "Azumabito", community: "very bad" },
    { name: "ayo??? 🤔🤔🤔🤔", owner: "Azumabito", community: "very nice" },
    { name: "ayo??? 🤔🤔🤔🤔", owner: "Azumabito", community: "very nice" },
    { name: "ayo??? 🤔🤔🤔🤔", owner: "Azumabito", community: "very nice" }
  ],
  communitities: [
    { name: "hello darkness my old friend", members: 7},
    { name: "i've come to sit with you again", members: 7},
    { name: "i dont remember the rest", members: 7},
    { name: "i dont remember the rest again", members: 7}
  ],
}

const Search = () => {
  const [{ searching, searched }, setStatus] = useState({ searching: false, searched: false });
  // const { searching, searched } = status

  const wrapperRef = useClickAway(function (ref) {
    setStatus(x => ({...x, searched: false}))
    // console.log('clicked away from ', ref)
  })

  const debouncedSearch = debounce((e) => {
    console.log('searched! ', e.target.value)
    setStatus(x => ({...x, searched: true, searching: false}))
  }, 1000)

  const handleSearch = (e) => { 
    e.preventDefault()
    setStatus(x => ({...x, searched: false, searching: true}))
    debouncedSearch(e)
  }

  return (
    <div ref={wrapperRef} className={styles.container}>
      <input onKeyPress={(e) => (e.key === 'Enter' && !searching) && handleSearch(e)} type="text" placeholder="Find Collabs & Communities..." />
      <button onClick={!searching ? handleSearch : undefined} className={`${styles.submit} ${searching && styles.searching}`}>{!searching && "Search"}</button>
        {searched && <div className={styles.dropdown}>
          {data.empty ? <p className={styles.empty}>No results found</p> : 
            <>
              {data.collabs.length !== 0 && data.collabs.map((collab, i) => <div key={i}><h3>{collab.name}</h3> <p>Collab</p></div>)}
              {data.communitities.length !== 0 && data.communitities.map((community, i) => <div key={i}><h3>{community.name}</h3> <p>Community</p></div>)}
            </>
          }
        </div>}
    </div>
  )
}

export default Search
