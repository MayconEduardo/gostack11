import { Router } from 'express'
import { User } from '../models/User'
import { CreateSessionService } from '../services/CreateSessionService'

const sessionsRouter = Router()

interface UserToken {
  user: User,
  token: string
}

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body

    const session = new CreateSessionService()

    const responseSession: UserToken = await session.execute({
      email,
      password
    })

    delete responseSession.user.password

    return response.json(responseSession)
  } catch (error) {
    return response.status(400).json({ message: error.message })
  }
})

export { sessionsRouter }
