export class UserService {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getByEmail(data) {
        return await this.dao.getByEmail(data);
      }
  }