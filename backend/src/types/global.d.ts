declare type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

declare type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

declare type Maybe<T> = T | null;

// declare type UnionToArray<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I[] : never;
//
// declare type Permutations<T, U = T> = [T] extends [never] ? [] : T extends T ? [T, ...Permutations<Exclude<U, T>>] : never;
