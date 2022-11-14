export interface Dropdowns{value: any, text: string}

export interface InputModel{
  value: any;
  type?: string;
  error: {
    message: string[];
    flag: boolean;
  }
  name: string;
  label?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  dropdowns?: Dropdowns[]
}
