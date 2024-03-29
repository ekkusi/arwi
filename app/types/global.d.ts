declare type NonNullableProperty<T, K extends keyof T> = {
  [P in K]: NonNullable<T[P]>;
};

declare type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

type WithRequiredNonNull<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

declare type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

declare type Maybe<T> = T | null;

/**
 * Merge keys of O into T, overriding value types with those in O.
 */
type Override<T, O extends Partial<Record<keyof T, any>>> = Pick<T, Exclude<keyof T, keyof O>> & O;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type WithTypename<T, K extends T["__typename"]> = T & { __typename: K };
