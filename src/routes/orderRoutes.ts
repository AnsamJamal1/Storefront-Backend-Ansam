import express, { Request, Response } from 'express'
import { OrderStore } from '../models/order'
import verifyAuthToken from '../middleware/auth'

const store = new OrderStore()
const router = express.Router()

router.get('/', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400).json(err)
  }
})



router.get('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id))
    res.json(order)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.post('/', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const order = await store.create(req.body)
    res.json(order)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const deletedOrder = await store.delete(parseInt(req.params.id))
    res.json(deletedOrder)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.put('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const updatedOrder = await store.update({
      ...req.body,
      id: parseInt(req.params.id)
    })
    res.json(updatedOrder)
  } catch (err) {
    res.status(400).json(err)
  }
  
})



export default router


