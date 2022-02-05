import type { NextApiRequest, NextApiResponse } from 'next';
import getAllPosts from 'components/organisms/blog/posts';

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      const posts = getAllPosts();
      res.status(200).json(posts);
      break;

    default:
      res.status(404).json({ message: 'Not found' });
      break;
  }
};
