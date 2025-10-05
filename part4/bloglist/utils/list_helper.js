const dummy = () => 1

const totalLikes = blogPosts => blogPosts.reduce((prev, curr) => prev + curr.likes, 0)

module.exports = {
  dummy,
  totalLikes,
}