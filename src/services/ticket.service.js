export class TicketService {
    constructor(dao) {
      this.dao = dao;
    }
  
    async create(data) {
        return await this.dao.create(data);
      }
  }