export class UserDao {
    users
  
    constructor() {
      this.users = []
    }

    async getByEmail(user) {
        if(this.users.length){
          user.id = this.users[this.users.length - 1].id + 1
      }else{
          user.id = 1
      }
  
      this.users.push(user)
    }
  }