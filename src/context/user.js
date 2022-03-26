import React, { useContext, useState, useEffect } from "react"
import { db } from "../firebase";
import {
  // collection,
  // getDocs, query, where,
  getDoc, doc
} from "firebase/firestore";

async function getUserDataById(id) {
  const snap = await getDoc(doc(db, "users", id))
  return snap.data();
}

const UserContext = React.createContext()

export const UserProvider = ({ id, children }) => {
  const [userData, setUserData] = useState({ id })

  // console.log('context outside effect: ', userData)
  useEffect(() => {
    // console.log('context getting data')
    const dataPromise = getUserDataById(userData.id)
    dataPromise.then(data => {
      setUserData((prev) => {
        const newData = { ...prev, data }
        // console.log('context got data: ', newData)
        return newData
      })
    })
    // only time you'd need a cleanup function for this is when the user logs out
  }, [userData.id])

  // async function publishCollab({ id }) { 
  //   // adding the doc to the user's collabs array
  //   await updateDoc(doc(db, "users", "id"), {
  //     previousCollabs: arrayUnion(id)
  //   })

  //   // updating the user data state so that the context can be reused
  //   setUserData(await getDataById(userData.id))
  // }

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)