import express, { Request, Response } from 'express'
import { ProductStore } from '../models/product'

const store = new ProductStore()
const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
})
router.get('/:id', async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id))
  res.json(product)
})

router.post('/', async (req: Request, res: Response) => {
  const product = await store.create(req.body)
  res.json(product)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const deletedProduct = await store.delete(parseInt(req.params.id))
  res.json(deletedProduct)
})

router.put('/:id', async (req: Request, res: Response) => {
  const updatedProduct = await store.update(parseInt(req.params.id), req.body)
  res.json(updatedProduct)
})

export default router


