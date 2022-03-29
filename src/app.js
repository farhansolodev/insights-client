// import React, { useState, useEffect } from "react"
import {
	Redirect,
	Route,
} from "react-router-dom"
// import { auth } from "./firebase";
// import { onAuthStateChanged } from 'firebase/auth'
import { useAuth } from "./context/auth";

import styles from './app.module.css'
import { UserProvider } from "./context/user";
import NavBar from "./NavBar/bar";
import Profile from "./Profile/page";
import CollabView from "./Profile/collab.view"
import Rooms from "./Rooms/page";
import VirtualSpace from "./VirtualSpace/page";
import Communities from "./Communities/page";
import Community from "./Community/page";
import Home from "./Home/page";
import Dashboard from "./AdminPage/page";

export default function App() {
	const { currentUser } = useAuth();
	// const [user, setUser] = useState(auth.currentUser);
	// // console.log("went through app component - no user logged in? ", !user)

	// useEffect(() => {
	// 	const unsub = onAuthStateChanged(auth, firebaseUser => {
	// 		if(firebaseUser) {
	// 			setUser(firebaseUser)
	// 		}
	// 	})
	// 	if(!user) {
			
	// 	}
	// 	return () => { 
	// 		unsub()
	// 	}
	// }, [])
	return (
		<div className={styles.app} >
			{
				<>
					<NavBar />
					 <UserProvider id={currentUser.uid}>
						<div className={styles.page}>
							<Route exact path={`/app/`}>
								<Redirect to='/app/profile'/>
							</Route>
							{/* <Route exact path={`/app/vs/`}>
								<Rooms />
							</Route> */}
							<Route path={`/app/vs/:id`}>
								<VirtualSpace />
							</Route>
							<Route path={`/app/rooms`}>
								<Rooms />
							</Route>
							<Route exact path={`/app/communities`}>
								<Communities />
							</Route>
							<Route exact path={`/app/communities/:id`}>
								<Community />
							</Route>
							<Route exact path={'/app/communities/:id/admin'}>
								<Dashboard />
							</Route>
							<Route path={`/app/home`}>
								<Home />
							</Route>
							<Route path={`/app/profile`}>
								<Profile />
							</Route>
							<Route path={`/app/collab/:name`}>
								<CollabView />
							</Route>
						</div>
					</UserProvider>
				</>
			}
		</div>
	);
}

