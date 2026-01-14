import express, { Request, Response } from 'express'
import { UserStore } from '../models/user'

const store = new UserStore()
const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)

})

router.get('/:id', async (req: Request, res: Response) => {

  const user = await store.show(parseInt(req.params.id))
  res.json(user)

})

router.post('/', async (req: Request, res: Response) => {
  const user = await store.create(req.body)
  res.json(user)
})

router.post('/authenticate', async (req: Request, res: Response) => {
  const user = await store.authenticate(req.body.username, req.body.password)
  if (!user) return res.status(401).send('Invalid credentials')
  res.json(user)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const deletedUser = await store.delete(parseInt(req.params.id))
  res.json(deletedUser)
})
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await store.update(req.body, parseInt(req.params.id))
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json(err)
  }
})


export default router
