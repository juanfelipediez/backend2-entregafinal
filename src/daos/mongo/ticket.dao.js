import { ticketModel } from "../../models/ticket.model.js"

export class TicketDao{
    async create(data){
        return await ticketModel.create(data)
    }
}