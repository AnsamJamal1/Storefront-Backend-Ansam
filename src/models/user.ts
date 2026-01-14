import client from '../database/database'
import { hashPassword, comparePassword } from '../utils/hashPassword'

export type User = {
  id?: number
  username: string
  email: string
  password: string
  role?: string
  created_at?: string
}
export class UserStore {
  async index(): Promise<User[]> {
    const conn = await client.connect()
    const sql = 'SELECT id, username, email, role FROM users'
    const result = await conn.query(sql)
    conn.release()
    return result.rows
  }

  async show(id: number): Promise<User> {
    const conn = await client.connect()
    const sql = 'SELECT id, username, email, role, created_at FROM users WHERE id=$1'
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }
  async create(u: User): Promise<User> {
    const conn = await client.connect()
    const hashedPassword = await hashPassword(u.password)
    const sql = 'INSERT INTO users (username, email, password, role) VALUES($1,$2,$3,$4) RETURNING id, username, email, role, created_at'
    const result = await conn.query(sql, [u.username, u.email, hashedPassword, u.role || 'user'])
    conn.release()
    return result.rows[0]
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM users WHERE username=$1'
    const result = await conn.query(sql, [username])
    conn.release()
    if (result.rows.length) {
      const user = result.rows[0]
      const match = await comparePassword(password, user.password)
      if (match) return user
    }
    return null
  }
  async delete(id: number): Promise<User> {
    const conn = await client.connect()
    const sql = 'DELETE FROM users WHERE id=$1 RETURNING id, username, email, role, created_at'
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
  }

  async update(u: {username: string, email: string, password: string}, id: number) {
    const conn = await client.connect()
    const hash = await hashPassword(u.password)
    const sql = 'UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING *'
    const result = await conn.query(sql, [u.username, u.email, hash, id])
    conn.release()
    return result.rows[0]

  }

  
}

