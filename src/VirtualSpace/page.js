import React, { useState, useEffect } from "react"
import {
	useParams,
	// useLocation
} from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { io } from "socket.io-client"
import { useUser } from "../context/user";
import AppBar from "../AppBar/bar"
import TextEditor from "./text.editor"
import Chat from "../Chat/chat"
import Publish from "./publish.popup"
import ShareCode from "./share.room.popup"
import KickForm from "./kick.user.popup"
import { AppBarButtons } from "./appbar.buttons"

import styles from "./vspage.module.css"
import { faExpandAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useHistory } from "react-router-dom";
import { useTraceUpdate } from '../utils'

const VirtualSpace = () => {
	const [socket, setSocket] = useState()
	
	const [published, setPublished] = useState();
	const [publishFormVisible, setPublishFormVisible] = useState(false);
	const [shareFormVisible, setShareFormVisible] = useState(false);
	const [isOwner, setIsOwner] = useState(false)
	const [reader, setReader] = useState(false)
	const [kickedUser, setKickedUser] = useState()
	const [roomData, setRoomData] = useState({});
	const [displayKick, setDisplayKick] = useState(false)

	const { userData } = useUser()
	const { id: userId } = userData
	const [participants, setParticipants] = useState([{pfp: userData.data?.pfp, username: userData.data?.username, userId}]);
	const { id: roomId } = useParams()
	const history = useHistory()

	useTraceUpdate({socket,published,publishFormVisible,shareFormVisible,roomData,userData,userId,participants,roomId})

	useEffect(() => {
		getDoc(doc(db, "virtual-spaces", roomId)).then(docSnap => {
			// eslint-disable-next-line no-throw-literal
			if (!docSnap.data()) throw {code:404, msg:"Room doesn't exist"}
			const room = docSnap.data()
			setRoomData(room)
		})
	}, [roomId])

	// updates state when received from context
	useEffect(() => {
		const i = participants.findIndex(user => user.userId === userId)
		if (i === -1) return
		setParticipants((prev) => { 
			prev[i].pfp = userData.data?.pfp
			prev[i].username = userData.data?.username
			return prev
		})
	}, [userData.data?.pfp, userData.data?.username, userId])

	useEffect(() => {
		if (!roomData.collabId) return
		
		if(roomData.readers.length != 0) {
			if(roomData.readers.includes(userId)) {
				setReader(true)
			}
		}
		
		const s = io("https://insights--server.herokuapp.com")
		setSocket(s)

		// data received upon joining the room
		s.on("join-room ack", ({userId: uid , username: uname}) => {
			// // console.log("Data from user: ", uname)
			getDoc(doc(db, "users", uid)).then((snapshot) => {
				const { pfp } = snapshot.data()
				setParticipants((prev) => [...prev, { pfp, userId: uid, username: uname }])
			})
		})
	
		// data received when a new user joins the room
		s.on('user-joined', (socketid, { userId: uid, username: uname }) => {
			// console.log("User joined: ", uname)
			// acknowledge that the user has joined the room
			s.emit("user-joined ack", socketid, {
				userId,
				username: userData.data?.username
			})
			// get the newly joined user's pfp from firebase and then add it to the list of owners
			getDoc(doc(db, "users", uid)).then((snapshot) => {
				const { pfp } = snapshot.data()
				setParticipants((prev) => [...prev, { pfp, userId: uid, username: uname }])
			})
		})

		s.on('user-disconnected', (data) => {
			// console.log("User disconnected: ", data.username)
			setParticipants((prev) => prev.filter((p) => p.userId !== data.userId))
		})

		// // console.log('ROOM ID: ', roomData.collabId)
		// // console.log('COllab ID: ', roomId)
		// // console.log('username: ', userData.data?.username)
		// // console.log('user ID: ', userId)

		// request the server to join the room
		s.emit("join-room", {
			userId,
			username: userData.data?.username,
			collabId: roomData.collabId,
			roomId
		})

		if(userId == roomData.owners[0]) {
			setIsOwner(true)
			console.log("true brooooooooooooooooo")
		}

		return () => {
			if (!roomData.collabId) return
			// console.log("Disconnecting from Virtual Space with socket: ", s)
			s.disconnect()
		}
		
	}, [roomData.collabId, roomId, userData.data?.username, userId])

	const expand = () => {
		// some css to expand text editor to full screen
	}

	const showForm = (e) => {
		const val = e.target.value
		// // console.log("showForm: ", val)
		val === "publish" && setPublishFormVisible(true)
		val === "share-code" && setShareFormVisible(true)
	}

	const hideForm = (e) => {
		const target = e.target
		// // console.log('target: ',target)
		target.value === "publish" && setPublishFormVisible(false)
		target.name === "share-code" && setShareFormVisible(false)
		target.name === "kick-user" && setDisplayKick(false)
	}

	const filterByPublishStatus = (x, y, z) => {
		if (published === true) return x
		if (published === false) return y
		if (published === undefined) return z
	}

	const onLeaveRoom = () => { 
		history.push("/app/rooms")
	}

	const onDisplayKick = (e) => {
		setDisplayKick(true)
		const target = e.target
		console.log(target.key)
		console.log("DKKKKKKKKKKKKKKKKKKKK")
		setKickedUser(123)
	}

    return (
		<>
			{publishFormVisible && <Publish onSubmit={(e) => { hideForm(e); setPublished(true) }} collabId={roomData.collabId} onCancel={hideForm}/>}
			{shareFormVisible && <ShareCode onCopy={hideForm} id={roomData.writeId} onCancel={hideForm}/>}
			<AppBar onClickHandler={onLeaveRoom} buttons={AppBarButtons} title={roomData.name ? roomData.name : "Loading name..."}/>
			<div className={styles["parent"]}>
				<div className={styles["text-editor"]}>
					<TextEditor reader={reader} onMembersChange={(cb) => cb(participants)} onDocumentLoad={setPublished} roomId={roomId} collabId={roomData.collabId} socket={socket} />
				</div>
				<div className={styles["footer"]}>
					<div className={styles["publish-expand"]}>
						{isOwner && <button //added isOwner here can do same for the shareid then that will also become a owner only feature
							value="publish"
							className={filterByPublishStatus(styles["publish-button-inactive"], styles["publish-button-active"], styles["publish-button-inactive"]) }
							onClick={filterByPublishStatus(undefined, showForm, undefined)}>
							<p style={{pointerEvents: "none"}}>{filterByPublishStatus("Succesfully published!","Publish","Checking...")}</p>
						</button> }
						<button className={styles["expand-button"]} onClick={expand}>
							<FontAwesomeIcon className={styles["expand-icon"]} size="2x" icon={faExpandAlt}/>
						</button>
					</div>

					<div className={styles["online-collaborators"]}>				
						{participants.map(({ pfp, username }, index) => {
							if (!pfp || !username) return undefined
							return( 
								<img key={index} alt={`User ${username}`} value="ko" className= {styles["images"]} onClick={onDisplayKick} src={pfp} />
							);
						})}
						{displayKick && <KickForm username= {kickedUser} roomDetails= {roomData}  onSubmit={(e) => { hideForm(e); setDisplayKick(false) }} onCancel={hideForm}/>}
						<button className={styles["invite-button"]} value="share-code" onClick={showForm}>
							<FontAwesomeIcon className={styles["invite-icon"]} size="3x" icon={faUserPlus}/>
						</button>
					</div>
				</div>
				<div className={styles["chat"]}>
					<Chat socket={socket} username={userData.data?.username} roomId={roomId}/>
				</div>
			</div>
		</>
	)
}

export default VirtualSpace
