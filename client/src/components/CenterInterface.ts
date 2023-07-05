export interface CenterObj {
  center_id: number;
  location: string;
  peak_consumption: number;
  name: string;
}

interface location {
  street: string;
  houseNumber: string;
  city: string;
  postcode: string;
  coordinates: number[];
}
