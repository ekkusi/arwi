export type Group = {
  id: string;
  name: string;
  type: string;
};
export type Teacher = {
  groups: Group[];
};
