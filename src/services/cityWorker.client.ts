import type { City, WorkerRequest } from '../types/cityWorkerTypes';

export function createCityWorker() {
  const worker = new Worker(new URL('../workers/city.worker.ts', import.meta.url), {
    type: 'module',
  });

  const listeners = new Map<string, (data: unknown) => void>();

  worker.onmessage = (event) => {
    const { requestId, payload } = event.data;
    listeners.get(requestId)?.(payload);
    listeners.delete(requestId);
  };

  function send<T extends WorkerRequest>(message: T): Promise<any> {
    return new Promise<City[]>((resolve) => {
      listeners.set(message.requestId, resolve);
      worker.postMessage(message);
    });
  }

  return {
    filter(q: string) {
      return send({
        type: 'FILTER',
        payload: q,
        requestId: crypto.randomUUID(),
      });
    },

    destroy() {
      worker.terminate();
    },
  };
}
