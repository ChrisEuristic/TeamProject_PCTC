export type OriginShipData = {
  id: number;
  shipOrder: string;
  shipName: string;
  berthing: string;
  shipOwner: string;
  scheduledArrivalTime: string;
  arrivalTime: string;
  workTime: string;
  departureTime: string;
  cargoTime: string;
  discharge: number;
  loading: number;
  shifting: number;
  transship: string;
  route: string;
  vessel: string;
};

export interface ShipData {
  resourceId: string;
  title: string;
  start: Date;
  end: Date;
  shipName: string;
  berthing: string;
  shipOwner: string;
  scheduledArrivalTime: string;
  arrivalTime: string;
  cargoTime: string;
  workTime: string;
  departureTime: string;
  discharge: number;
  loading: number;
}
export interface SimpleShipData {
  resourceId: string;
  title: string;
  start: Date;
  end: Date;
}
