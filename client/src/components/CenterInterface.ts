export interface CenterObj {
  center_id: number;
  name: string;
  peak_consumption: number;
  lattitude: number;
  longitude: number;
  outer_postcode: string;
  adress: adress;
}

interface adress {
  unit_number: string;
  adress_line_1: string;
  adress_line_2: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
}
