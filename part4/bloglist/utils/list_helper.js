const dummy = () => 1

const totalLikes = blogPosts => blogPosts.reduce((prev, curr) => prev + curr.likes, 0)

const favouriteBlog = blogPosts => blogPosts.length 
    ? blogPosts.reduce((prev, curr) => curr.likes > prev.likes ? curr : prev)
    : null

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}