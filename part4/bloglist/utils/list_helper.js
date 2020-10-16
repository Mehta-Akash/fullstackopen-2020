const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, value) => sum + value.likes, 0);
  return total;
};

const favouriteBlog = (blogs) => {
  const reformatedBlogs = blogs.map((blog) => {
    const newObj = {};
    newObj.title = blog.title;
    newObj.author = blog.author;
    newObj.likes = blog.likes;
    return newObj;
  });
  const mostLiked = reformatedBlogs.reduce(
    (most, current) => (current.likes > most.likes ? current : most),
  );
  return mostLiked;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
