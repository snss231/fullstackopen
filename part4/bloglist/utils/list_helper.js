const { groupBy, reduce, sum } = require('lodash')

const dummy = () => 1

const totalLikes = blogs => blogs.reduce((prev, curr) => prev + curr.likes, 0)

const favouriteBlog = blogs => blogs.length 
    ? blogs.reduce((prev, curr) => curr.likes > prev.likes ? curr : prev)
    : null

const mostBlogs = blogs => 
    reduce(
        groupBy(blogs, blog => blog.author),
        (res, value, key) => res.blogs < value.length ? { name: key, blogs: value.length } : res,
        { name: null, blogs: 0}
    ).name

const mostLikes = blogs => 
    reduce(
        groupBy(blogs, blog => blog.author),
        (res, value, key) => res.likes < totalLikes(value) ? { name: key, likes: totalLikes(value) } : res,
        { name: null, likes: 0}
    ).name


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}