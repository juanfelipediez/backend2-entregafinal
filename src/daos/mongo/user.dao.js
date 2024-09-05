import {userModel} from "../../models/user.model.js"

export class UserDao{
    async getByEmail(data){
        return await userModel.findOne(data)
    }
}