import client from '../database/database'

export type Product = {
  id?: number
  name: string
  description?: string
  price: number
  created_at?: string
}
export class ProductStore {
  async index(): Promise<Product[]> {
    const conn = await client.connect()
    const result = await conn.query('SELECT * FROM products')
    conn.release()
    return result.rows
  }

  async show(id: number): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query('SELECT * FROM products WHERE id=$1', [id])
    conn.release()
    return result.rows[0]

  }

  
  async create(p: Product): Promise<Product> {
    const conn = await client.connect()
    const result = await conn.query(
      'INSERT INTO products (name, description, price) VALUES($1,$2,$3) RETURNING *',
      [p.name, p.description || '', p.price]
    )
    conn.release()
    return result.rows[0]
  }
  async delete(id: number): Promise<Product> {
    const conn = await client.connect()
    const sql = 'DELETE FROM products WHERE id=$1 RETURNING *'
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }
  async update(id: number, product: Product): Promise<Product> {
  const conn = await client.connect()
  const sql = `UPDATE products SET name=$1, description=$2, price=$3 WHERE id=$4 RETURNING *`
  const result = await conn.query(sql, [product.name, product.description, product.price, id])
  conn.release()
  return result.rows[0]

}}
