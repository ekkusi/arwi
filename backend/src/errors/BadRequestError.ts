abstract class HttpError extends Error {
  public status!: number;
}

export default class BadRequestError extends HttpError {
  constructor(m = "Bad Request") {
    super(m);
    this.status = 400;
  }
}
