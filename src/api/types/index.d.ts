export type IApiResponse = {
  success: boolean,
  message: string
}

export type ILoginResponse = IApiResponse & {
  token: string
}

export type IRegistrationResponse = IApiResponse

export interface IUser {
    message: string,
    user: {
      _id: string,
      username: string,
      password: string,
      __v: 0
    }
}


export type ITokenPayload = {
  username: string,
  id: string,
  iat: number,
  exp: number
}



export interface ITodo {
  _id: string,
  userId: string,
  title: string,
  content: string,
  __v: 0
}