import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
// import "./text.editor.css"

export default function TextViewer({ content }) {
	const [quill, setQuill] = useState()

	// this requests collab data and sets it to quill when it arrives
	useEffect(() => {
        if (quill == null) return
        if(content===undefined) return

        quill.setContents(content.content)
        quill.disable()
        
    }, [quill])
    
    const containerRef = useCallback((containerDiv) => {
        if (containerDiv == null) return
        containerDiv.innerHTML = ""
        let qlContainerDiv = document.createElement("div")
        containerDiv.append(qlContainerDiv)
        const q = new Quill(qlContainerDiv)
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    }, [])

    return <div className="textEditorContainer" ref={containerRef}></div>
}