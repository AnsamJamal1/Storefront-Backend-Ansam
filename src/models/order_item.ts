import client from '../database/database'

export type OrderItem = {
  id?: number
  order_id: number
  product_id: number
  quantity?: number
}


export class OrderItemStore {
  async index(): Promise<OrderItem[]> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM order_items'
    const result = await conn.query(sql)
    conn.release()
    return result.rows
  }


  async show(id: number): Promise<OrderItem> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM order_items WHERE id=$1'
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }

  async create(oi: OrderItem): Promise<OrderItem> {
    const conn = await client.connect()
    const sql = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES($1,$2,$3) RETURNING *'
    const result = await conn.query(sql, [oi.order_id, oi.product_id, oi.quantity || 1])
    conn.release()
    return result.rows[0]
  }


  async update(oi: OrderItem): Promise<OrderItem> {
    try {
      const conn = await client.connect()
      const sql = 'UPDATE order_items SET order_id=$1, product_id=$2, quantity=$3 WHERE id=$4 RETURNING *'
      const result = await conn.query(sql, [oi.order_id, oi.product_id, oi.quantity, oi.id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update order item ${oi.id}. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<OrderItem> {
    const conn = await client.connect()
    const sql = 'DELETE FROM order_items WHERE id=$1 RETURNING *'
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
    
  }

}
