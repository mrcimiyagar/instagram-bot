export class User {
  constructor(
    public userId: number,
    public instaAccountId: number,
    private _token: string
  ) {}

  get token() {
    if (!this._token) {
      return null;
    }
    return this._token;
  }
}
