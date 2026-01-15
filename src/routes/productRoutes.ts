import express, { Request, Response } from 'express'
import { ProductStore } from '../models/product'
import verifyAuthToken from '../middleware/auth'


const store = new ProductStore()
const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id))
    res.json(product)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.post('/', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const product = await store.create(req.body)
    res.json(product)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.delete('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const deletedProduct = await store.delete(parseInt(req.params.id))
    res.json(deletedProduct)
  } catch (err) {
    res.status(400).json(err)
  }
})



router.put('/:id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const updatedProduct = await store.update(
      parseInt(req.params.id),
      req.body
    )
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json(err)
  }
})


export default router
