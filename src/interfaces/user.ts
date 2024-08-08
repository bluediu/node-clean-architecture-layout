export interface IUserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
