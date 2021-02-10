import { interval } from "rxjs";

export interface TransferInterface {
  cardNumberFrom: string;
  cardNumberTo: string;
  firstName: string;
  lastName: string;
  value: string;
  time: string;
}