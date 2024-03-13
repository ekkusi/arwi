abstract class HttpError extends Error {
  public status!: number;
}

export default class UnauthorizedError extends HttpError {
  constructor(m = "Unauthorized") {
    super(m);
    this.status = 401;
  }
}
