import { v4 as uuidV4 } from 'uuid'
import { User } from './entity'

class UserRepository {
    public getUser(id: string): Promise<User> {
        return User.findByPk(id)
    }

    public getAllUsers(): Promise<User[]> {
        return User.findAll()
    }

    public async createUser(name: string, email: string): Promise<User> {
        return User.create({ id: uuidV4(), name, email })
    }
}

const userRepository = new UserRepository()
Object.freeze(userRepository)
export { userRepository as UserRepository }