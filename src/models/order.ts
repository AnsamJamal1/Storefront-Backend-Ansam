import client from '../database/database'

export type Order = {
  id?: number
  user_id: number
  status?: string
  created_at?: Date
}


export class OrderStore {
  async index(): Promise<Order[]> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM orders'
    const result = await conn.query(sql)
    conn.release()
    return result.rows
  }


  async show(id: number): Promise<Order> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM orders WHERE id=$1'
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }
  async create(o: Order): Promise<Order> {
    const conn = await client.connect()
    const sql = 'INSERT INTO orders (user_id, status) VALUES($1,$2) RETURNING *'
    const result = await conn.query(sql, [o.user_id, o.status || 'active'])
    conn.release()
    return result.rows[0]
  }

  async update(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *'
      const result = await conn.query(sql, [o.user_id, o.status, o.id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update order ${o.id}. Error: ${err}`)
    }
  }


  async delete(id: number): Promise<Order> {
    const conn = await client.connect()
    const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *'
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]

  }
}
