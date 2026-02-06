import cities from '../../data/city.list.min.json';
import type { City, WorkerRequest } from '../types/cityWorkerTypes';

const typedCities = cities as City[];

const lowerCasedCities = typedCities.map((city: City) => ({
  ...city,
  name: city.name.toLowerCase(),
}));

const handlers: Record<WorkerRequest['type'], (msg: WorkerRequest) => void> = {
  FILTER: (content: WorkerRequest) => {
    const q = content.payload.toLowerCase();

    const result = lowerCasedCities.filter((c: City) => c.name.startsWith(q)).slice(0, 10);

    self.postMessage({ type: 'FILTER_RESULT', payload: result, requestId: content.requestId });
  },
};

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const handler = handlers[e.data.type];
  if (handler) handler(e.data);
};
