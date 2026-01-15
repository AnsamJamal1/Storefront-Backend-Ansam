import express, { Request, Response } from 'express'
import { UserStore } from '../models/user'
import verifyAuthToken from '../middleware/auth'

const store = new UserStore()
const router = express.Router()


router.get('/', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.get('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id))
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await store.create(req.body)
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})



router.post('/authenticate', async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(
      req.body.username,
      req.body.password
    )

    if (!user) {
      return res.status(401).json('Invalid credentials')
    }

    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.delete('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(parseInt(req.params.id))
    res.json(deletedUser)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.put('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const updatedUser = await store.update(
      req.body,
      parseInt(req.params.id)
    )
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json(err)
  }
})

export default router

