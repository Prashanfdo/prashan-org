const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'data', 'blog');

console.log('Generating blog posts json...');
const posts = getAllPosts();
fs.writeFileSync(path.join(process.cwd(), 'data', 'blog', 'posts.json'), JSON.stringify({ data: posts }));
console.log('Generating blog posts json completed');

function getAllPosts() {
  const allPosts = fs.readdirSync(contentDirectory);

  return allPosts
    .filter((fileName) => fileName?.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace('.md', '');
      const fileContents = fs.readFileSync(path.join(contentDirectory, fileName), 'utf8');
      const {
        data: { draft, date, image, title, tags },
        content,
      } = matter(fileContents);
      const blogPost = {
        content,
        data: {
          draft: !!draft,
          image: image || null,
          title,
          tags: tags ? tags.split(',') : [],
          date: new Date(date).toISOString(),
        },
        slug,
      };
      return blogPost;
    })
    .filter((i) => i.data.draft !== true)
    .sort(sortByDate);
}

function sortByDate(a, b) {
  if (a.data.date < b.data.date) {
    return 1;
  }
  if (a.data.date > b.data.date) {
    return -1;
  }

  return 0;
}
