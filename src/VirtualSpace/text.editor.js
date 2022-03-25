import { useCallback, useEffect, useState, useRef } from "react"
// import debounce from 'lodash.debounce'
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import Quill from "quill"
import { detectElementOverflow, debounce, useDOMChange } from '../utils'
import "quill/dist/quill.snow.css"
import "./text.editor.css"

const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: "ordered" }, { list: "bullet" }],
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }],
	[{ script: "sub" }, { script: "super" }],
	[{ align: [] }],
	["blockquote", "code-block"],
	["clean"],
]

export default function TextEditor({ reader, onMembersChange, socket, roomId, collabId, onDocumentLoad }) {
	const [quill, setQuill] = useState()

	// console.log(" Text Editor Component rendered!")
	
	// this requests collab data and sets it to quill when it arrives
	useEffect(() => {
	if (socket == null || quill == null) return

		socket.once("load-document", ({ content, published }) => {
		onDocumentLoad(published)
		quill.setContents(content)
		if(!reader) {
			quill.enable()
		} else {
			quill.disable()
		}
	})

	// socket.emit("get-document", roomId)
	}, [socket, quill, onDocumentLoad])

	// this updates the document when the server sends changes
	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = (delta) => {
			// console.log(delta)
			quill.updateContents(delta)
		}
		socket.on("receive-changes", handler)

		return () => {
			socket.off("receive-changes", handler)
		}
	}, [socket, quill])

	const saveCollabDebounced = debounce(async () => { 
		if (!collabId) return
		await updateDoc(doc(db, "collabs", collabId), { content: quill.getContents().ops })
		console.log("saved document ["+collabId+"]")
	}, 1000)

	// this sends changes to the server everytime there is a change
	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = async (delta, oldDelta, source) => {
			if (source !== "user") return
			socket.emit("send-changes", delta, { roomId })
			saveCollabDebounced()
			// setDoc(doc(db, "collabs", collabId), quill.getContents())
		}
		quill.on("text-change", handler)

		return () => {
			quill.off("text-change", handler)
		}
	}, [socket, quill, collabId, saveCollabDebounced])

	const containerRef = useCallback((containerDiv) => {
		if (containerDiv == null) return
		containerDiv.innerHTML = ""
		let qlContainerDiv = document.createElement("div")
		containerDiv.append(qlContainerDiv)
		const q = new Quill(qlContainerDiv, {
			theme: "snow",
			modules: { toolbar: TOOLBAR_OPTIONS },
			scrollingContainer: qlContainerDiv
		})
		q.disable()
		q.setText("Loading...")
		// setEditorDiv(Array.from(qlContainerDiv.children).filter(x => x.className.includes('editor'))[0])
		setQuill(q)
		// console.log(q)
	}, [])

	// define actions for when editor content changes
	useDOMChange(quill?.root, (mutations) => {
		if (!quill.isEnabled) {
			// console.log('called when quill is still disabled')
			return
		}
		// console.log('called when quill is enabled')
		mutations.forEach(mutation => {
			const target = mutation.target
			if (target.localName !== 'p') return
			const collidedBottom = detectElementOverflow(target, quill.root).collidedBottom
			console.log('collidedBottom: ', collidedBottom)
			if (collidedBottom === false) return
			console.log('element that overflowed: ',target)
			// const editor = quill.root
			// editor.className = 'ql-editor ql-snow'
			// quill.container.appendChild(editor)
		});
		// console.log(mutations.reduce((prevMutation, mutation) => {
		// 	const bool = prevMutation.target === mutation.target
		// 	console.log([prevMutation.target, mutation.target],bool)
		// 	return mutation
		// }))
	})

	return <div className="textEditorContainer" ref={containerRef}></div>
}