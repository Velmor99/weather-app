export type WorkerRequest =
  | { type: 'FILTER'; payload: string; requestId: string }

export type City = {
    id: number;
    country: string;
    name: string;
    state: string;
    coord: {lon: number, lat: number};
}