import { PatchEvent, Rule } from "sanity";

export interface ComponentProps<T> {
  value?: Partial<T>;
  readOnly?: boolean;
  onChange: (event: PatchEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  elementProps: {
    id: string;
    name: string;
    title: string;
    description?: string;
    options?: any; // This can be more specific based on your options structure
    // Add other relevant fields from the schema type definition
  };
  validation: Rule[];
}
