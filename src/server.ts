import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import client from './database/database'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import orderRoutes from './routes/orderRoutes'
import orderItemRoutes from './routes/orderItemRoutes'

const app: express.Application = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', async (_req: Request, res: Response) => {
  try {
    const conn = await client.connect()
    conn.release()
    res.send('Server is running & DB connected')
  } catch (err) {
    res.status(500).send('Database connection failed')
  }
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/order_items', orderItemRoutes)

export default app
