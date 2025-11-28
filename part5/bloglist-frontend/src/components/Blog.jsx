import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div style={{ border: '2px black solid', margin: '5px', padding: '5px 0px 0px' }}>
      {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
      {showDetails &&  
      <> <br/>{blog.url} <br/>
      likes {blog.likes} <button>like</button><br/>
      {blog.creator.name}</>}
    </div>
  )
}

export default Blog