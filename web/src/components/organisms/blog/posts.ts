import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src', 'data', 'blog');

export type BlogPost = {
  content: string;
  slug: string;
  data: {
    draft: boolean;
    title: string;
    date: string;
    image: string;
  };
};

export default function getAllPosts() {
  const allPosts = fs.readdirSync(contentDirectory);

  return allPosts
    .map((fileName) => {
      const slug = fileName.replace('.md', '');
      const fileContents = fs.readFileSync(path.join(contentDirectory, fileName), 'utf8');
      const {
        data: { draft, date, image, title },
        content,
      } = matter(fileContents);
      const blogPost: BlogPost = { content, data: { draft: !!draft, image, title, date: new Date(date).toISOString() }, slug };
      return blogPost;
    })
    .filter((i) => i.data.draft !== true)
    .sort(sortByDate);
}

function sortByDate(a: BlogPost, b: BlogPost) {
  if (a.data.date < b.data.date) {
    return 1;
  }
  if (a.data.date > b.data.date) {
    return -1;
  }

  return 0;
}
