import { UserRepository } from './repository'
import { User  } from '../user/entity'

class UserController {
    public async createUser(name: string, email: string): Promise<User> {
        return UserRepository.createUser(name, email)
    }
}

const userController = new UserController()
Object.freeze(userController)
export { userController as UserController }
