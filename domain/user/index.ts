import { UserRepository } from "../../models/user/repository"

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserRepository.getAllUsers()
        res.json(users)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Failed in fetching users '})
    }
}