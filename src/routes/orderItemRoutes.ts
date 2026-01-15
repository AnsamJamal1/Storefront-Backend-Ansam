import express, { Request, Response } from 'express'
import { OrderItemStore } from '../models/order_item'
import verifyAuthToken from '../middleware/auth'

const store = new OrderItemStore()
const router = express.Router()



router.get('/', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    const items = await store.index()
    res.json(items)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const item = await store.show(parseInt(req.params.id))
    res.json(item)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.post('/', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const item = await store.create(req.body)
    res.json(item)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.delete('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const deletedItem = await store.delete(parseInt(req.params.id))
    res.json(deletedItem)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.put('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const updatedItem = await store.update({
      ...req.body,
      id: parseInt(req.params.id)
    })

    res.json(updatedItem)
  } catch (err) {
    res.status(400).json(err)
  }
})

export default router
