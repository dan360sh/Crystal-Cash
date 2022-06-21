export interface InputModel{
  value: string;
  error: {
    message: string[];
    flag: boolean;
  }
  name: string;
  label?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number
}
