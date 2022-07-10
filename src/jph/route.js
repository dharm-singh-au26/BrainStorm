import  express  from "express";
const Router = express.Router();
import { getJphPosts } from './handler'

Router.get('/post', async (req, res) => {
  const result = await getJphPosts()
  res.send(result)
})

export const JPHRoutes = Router;