import http from 'k6/http';
import { check } from 'k6';

export const options = {
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    http_req_duration: [{ threshold: 'p(90)<500', abortOnFail: true }],
    checks: ['rate>0.9'],
  },
  scenarios: {
    reads: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 75,
      exec: 'read',
    stages: [
     { duration: '1m', target: 300 },
     { duration: '3m', target: 300 },
     { duration: '1m', target: 0 },
    ],
   },
  },
};

export function read() {
  const url = `http://sre-course.singerfox.ru/cities/5`;
  const params = {
    headers: {
      'accept':'application/json',
    },
  };
  check(http.get(url, params), {
    'status 200': (r) => r.status === 200,
     'correct api response': (r) =>
      r.body.includes('Kostroma'),
  });
}
