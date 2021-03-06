import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { User } from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class CreateSessionService {
  public async execute ({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination.')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.')
    }

    const token = sign({}, 'abc123', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      user,
      token
    }
  }
}

export { CreateSessionService }
