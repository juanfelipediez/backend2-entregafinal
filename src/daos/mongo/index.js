import { CartDao } from "./cart.dao.js";
import { ProductDao } from "./product.dao.js";
import { TicketDao } from "./ticket.dao.js";
import { UserDao } from "./user.dao.js";

export const mongoDao = {
    cartDao: CartDao,
    productDao: ProductDao,
    ticketDao: TicketDao,
    userDao: UserDao
}