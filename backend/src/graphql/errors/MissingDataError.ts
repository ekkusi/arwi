import { GraphQLError } from "graphql";

export default class MissingDataError extends GraphQLError {
  constructor(
    m: string = "Haetusta datasta puuttui jotain tai niissä oli jotain virheellistä odottamattomasti. Ota yhteyttä järjestelmän ylläpitoon."
  ) {
    super(m, {
      extensions: {
        code: "BAD_DATA_ERROR",
      },
    });

    // Set the prototype explicitly. Because of some TS issue.
    Object.setPrototypeOf(this, MissingDataError.prototype);
  }
}
