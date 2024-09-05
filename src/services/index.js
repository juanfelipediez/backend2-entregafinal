import { cartDao, productDao, ticketDao, userDao } from "../daos/factory.js";
import { CartService } from "./cart.service.js";
import { ProductService } from "./product.service.js";
import { TicketService } from "./ticket.service.js";
import { UserService } from "./user.service.js";
import { MailService } from "./mail.service.js";

const cartService = new CartService(cartDao);
const productService = new ProductService(productDao);
const ticketService = new TicketService(ticketDao);
const userService = new UserService(userDao);
const mailService = new MailService();

export { ticketService, cartService, productService, userService, mailService };