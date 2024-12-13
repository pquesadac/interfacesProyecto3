import { ValveInterface } from "./ValveInterface";

export interface GroupInterface {
  id?: string;
  name: string;
  lastDate: string;
  description?: string;
  values: ValveInterface[];
  totalValves?: number;
}