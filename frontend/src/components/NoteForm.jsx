import { useState } from 'react'

function NoteForm({onAdd}) {
    const [text, setText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!text.trim()) return
        
        onAdd(text)
        setText("")
    }

  return (
    <form
            onSubmit={handleSubmit}
            className="flex gap-2"
        >

            <input
                type="text"
                placeholder="Add a note..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border rounded p-2 flex-1"
            />

            <button
                className="px-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
                Add
            </button>

        </form>
  )
}

export default NoteForm