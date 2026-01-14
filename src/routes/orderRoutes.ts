import express, { Request, Response } from 'express'
import { OrderStore } from '../models/order'

const store = new OrderStore()
const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
})

router.get('/:id', async (req: Request, res: Response) => {
  const order = await store.show(parseInt(req.params.id))
  res.json(order)
})
router.post('/', async (req: Request, res: Response) => {
  const order = await store.create(req.body)
  res.json(order)
})
router.delete('/:id', async (req: Request, res: Response) => {
  const deletedOrder = await store.delete(parseInt(req.params.id))
  res.json(deletedOrder)
})
router.put('/:id', async (req: Request, res: Response) => {
  const updatedOrder = await store.update({ ...req.body, id: parseInt(req.params.id) })
  res.json(updatedOrder)
})
export default router
