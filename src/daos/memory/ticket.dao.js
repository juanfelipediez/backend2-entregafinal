export class TicketDao {
    tickets
  
    constructor() {
      this.tickets = []
    }

    async create(ticket) {
        if(this.tickets.length){
          ticket.id = this.tickets[this.tickets.length - 1].id + 1
      }else{
          ticket.id = 1
      }
  
      this.tickets.push(ticket)
    }
  }