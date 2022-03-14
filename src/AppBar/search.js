import { useState } from 'react'
import { useClickAway } from '../utils'
import styles from './search.module.css'

const keyPressHandler = (e) => { 
  if (e.key !== 'Enter') return
  alert('enter!')
}


const Search = () => {
  const [executed, setExecuted] = useState(false)
  const wrapperRef = useClickAway(function (ref) { 
    if (executed) return
    // console.log('clicked away from ', ref)
    setExecuted(true)
  })
  
  const inputFocusHandler = (e) => {
    setExecuted(false)
    // console.log('focus!')
  }

  let searching = false
  return (
    <div className={styles.container}>
      <input ref={wrapperRef} onFocus={inputFocusHandler} onKeyPress={keyPressHandler} type="text" placeholder="Find Collabs, Communities & Users..." />
      <button className={`${styles.submit} ${searching && styles.searching}`}>Search</button>
    </div>
  )
}

export default Search
