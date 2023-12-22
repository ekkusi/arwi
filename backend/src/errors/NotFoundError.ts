export default class NotFoundError extends Error {
  constructor(message = "Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.") {
    super(message);
  }
}
