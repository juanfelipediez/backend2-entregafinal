import { mongoDao } from "./mongo/index.js"
import { memoryDao } from "./memory/index.js"
import { config } from "../config/config.js"
import { connect } from "mongoose"

const createDao = () => {
    switch(config.PERSISTANCE){
        case "mongo":
            connect(config.MONGO_URI)
            .then(() => console.log("MongoDB connected"))
            .catch((error) => console.log(error));

            return {
                productDao: new mongoDao.productDao(),
                cartDao: new mongoDao.cartDao(),
                ticketDao: new mongoDao.ticketDao(),
                userDao: new mongoDao.userDao()
            }
        case "memory":
            return{
                productDao: new memoryDao.productDao(),
                cartDao: new memoryDao.cartDao(),
                ticketDao: new memoryDao.ticketDao(),
                userDao: new memoryDao.userDao()
            }
    }
}

export const {productDao, cartDao, ticketDao, userDao} = createDao()