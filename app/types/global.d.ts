declare type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

declare type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

declare type Maybe<T> = T | null;

/**
 * Merge keys of O into T, overriding value types with those in O.
 */
type Override<T, O extends Partial<Record<keyof T, any>>> = Pick<T, Exclude<keyof T, keyof O>> & O;
