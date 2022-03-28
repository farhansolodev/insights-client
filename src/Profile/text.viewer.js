import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"

export default function TextViewer({ content: data }) {
	const [quill, setQuill] = useState()

	//This requests collab data and sets it to quill when it arrives
	useEffect(() => {
        if (quill == null) return
        
        if(data===undefined) return

        quill.setContents(data.content)
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