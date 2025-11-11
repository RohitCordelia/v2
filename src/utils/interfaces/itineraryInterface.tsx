export interface Room {
  rooms(rooms: any): unknown;
  adults: number;
  children: number;
  infants: number;
  seq: number;
  selected: string;
  pricings?: {
    code: string;
    id: string;
    name: string;
    cabin_fare: number;
  }[];
  category_details: string;
}