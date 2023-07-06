export interface CenterObj {
  center_id: number;
  name: string;
  peak_consumption: number;
  lattitude: number;
  longitude: number;
  outer_postcode: string;
  adress: adress;
}

export interface CenterStack {
  centers: CenterObj[];
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

export interface mapPoint {
  position: number[];
  key: number;
}

export interface pointlist {
  points: mapPoint[];
}
