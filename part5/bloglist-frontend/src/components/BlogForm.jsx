import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        author: '',
        title: '',
        url: ''
    })

    const handleCreateBlog = async e => {
        e.preventDefault()

        createBlog(newBlog)
        setNewBlog({ title: '', author: '', url: '' })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    <label>title:<input value={newBlog.title} onChange={({ target }) => setNewBlog({
                        ...newBlog,
                        title: target.value
                    })}></input></label>
                </div>
                <div>
                    <label>author:<input value={newBlog.author} onChange={({ target }) => setNewBlog({
                        ...newBlog,
                        author: target.value
                    })}></input></label>
                </div>
                <div>
                    <label>url:<input value={newBlog.url} onChange={({ target }) => setNewBlog({
                        ...newBlog,
                        url: target.value
                    })}></input></label>
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default BlogForm