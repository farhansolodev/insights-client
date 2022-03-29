import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useClickAway, debounce } from '../utils'
import styles from './search.module.css'
import { collection, getDocs, getDoc, query, doc, where } from "firebase/firestore"; 
import { db } from "../firebase";


const Search = () => {
  const [{ searching, searched }, setStatus] = useState({ searching: false, searched: false });
  const [input, setInput] = useState()
  const [data, setData] = useState({collabs:[], communities:[] });
  
  const history = useHistory()

  const wrapperRef = useClickAway(function (ref) {
    setStatus(x => ({...x, searched: false}))
    // console.log('clicked away from ', ref)
  })

  const handleSearch = async (e) => { 
    e.preventDefault()
    setData({ collabs:[], communities:[] })
    setStatus(x => ({...x, searched: false, searching: true}))
    
    // const input = e.target.value
    // console.log(input)
    const collabQ = query(collection(db, "collabs"), where("name", "==", input), where("published", "==", true))
    const collabPromise = getDocs(collabQ)
    
    const communityQ = query(collection(db, "communities"), where("name", "==", input))
    const communityPromise = getDocs(communityQ)

    const data = await Promise.all([collabPromise,communityPromise])
    
    const collabQsnap = data[0]
    const comQsnap = data[1]

    setStatus(x => ({...x, searched: true, searching: false}))

    collabQsnap.forEach(function (doc) {
      // console.log("ID",doc.id)
      // console.log(doc.data())
      setData(prev => ({...prev, collabs: [...prev.collabs, {...doc.data(), id: doc.id}]}))
    })

    comQsnap.forEach(function (doc) {
      // console.log(doc.data())
      setData(prev => ({...prev, communities: [...prev.communities, {...doc.data(), id: doc.id}]}))
    })

  }

  function inputChangeHandler(e) {
    e.preventDefault()
    setInput(e.target.value)
  }

  function optionSelectHandler(e) {
    const type = e.target.title
    const name = e.target.id
    const path = '/app/' + type + '/' + name
    setStatus(x => ({...x, searched: false, searching: false}))
    history.push(path)
  }

  // console.log(!searching)
  const empty = data.collabs.length == 0 && data.communities.length == 0

  return (
    <div ref={wrapperRef} className={styles.container}>
      <input onChange={inputChangeHandler} onKeyPress={(e) => (e.key === 'Enter' && !searching) && handleSearch(e)} type="text" placeholder="Find Collabs & Communities..." />
      <button onClick={!searching ? handleSearch : undefined} className={`${styles.submit} ${searching && styles.searching}`}>{!searching && "Search"}</button>
        {searched && <div className={styles.dropdown}>
          {empty ? <p className={styles.empty}>No results found</p> : 
            <>
              {data.collabs?.length !== 0 && data.collabs?.map((collab, i) => {
                // console.log(collab.id)
                return <div onClick={optionSelectHandler} id={collab.id} title='collab' key={i}><h3 style={{pointerEvents: "none"}}>{collab.name}</h3> <p style={{pointerEvents: "none"}}>Collab</p></div>
              })}
              {data.communities?.length !== 0 && data.communities?.map((community, i) => { 
                // console.log(community.id)
                return <div onClick={optionSelectHandler} id={community.id} title='communities' key={i}><h3 style={{pointerEvents: "none"}}>{community.name}</h3> <p style={{pointerEvents: "none"}}>Community</p></div>
              })}
            </>
          }
        </div>}
    </div>
  )
}

export default Search
