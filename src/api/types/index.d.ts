export interface IUser {
    message: string,
    user: {
      _id: string,
      username: string,
      password: string,
      __v: 0
    }
}


export interface ITodo {
  _id: string,
  userId: string,
  title: string,
  content: string,
  __v: 0
}