import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyAuthToken = (req: any, res: any, next: Function) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Token missing' })
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string)
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export default verifyAuthToken
