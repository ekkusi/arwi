declare type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

declare type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

declare type Maybe<T> = T | null;
