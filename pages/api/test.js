// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import {delay} from '../post/serverSideProps';
const delay = (ms) => new Promise((res, rej) => setTimeout(() => res(), ms))
export default async (req, res) => {
  res.statusCode = 200;
  await delay(5000);
  const urls = new Array(9).fill().map(() => ({url: 'https://images.unsplash.com/photo-1592853285454-34691b7b74c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZSUyMG9mJTIwdGhlJTIwZGF5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'}))
  res.json(urls)
}

