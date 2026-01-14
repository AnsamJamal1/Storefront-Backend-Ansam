import express, { Request, Response } from 'express'
import { OrderItemStore } from '../models/order_item'

const store = new OrderItemStore()
const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const items = await store.index()
  res.json(items)
})
router.get('/:id', async (req: Request, res: Response) => {
  const item = await store.show(parseInt(req.params.id))
  res.json(item)
})
router.post('/', async (req: Request, res: Response) => {
  const item = await store.create(req.body)
  res.json(item)
})
router.delete('/:id', async (req: Request, res: Response) => {
  const deletedItem = await store.delete(parseInt(req.params.id))
  res.json(deletedItem)
})

router.put('/:id', async (req: Request, res: Response) => {
  const updatedItem = await store.update({ ...req.body, id: parseInt(req.params.id) })
  res.json(updatedItem)
})


export default router
