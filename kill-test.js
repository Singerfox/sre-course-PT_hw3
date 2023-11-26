import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    http_req_duration: [{ threshold: 'p(90)<500', abortOnFail: true }],
    checks: ['rate>0.9'],
  },
  scenarios: {
   breakpoint_test: {
      executor: 'ramping-arrival-rate',
          preAllocatedVUs: 350,
    stages: [
     { duration: '15m', target: 3000 },
    ],
  },
 },
};

export default function reads() {
  const url = `http://sre-course.singerfox.ru/WeatherForecast`;
  const params = {
    headers: {
      'accept':'application/json',
    },
  };
  check(http.get(url, params), {
    'status 200': (r) => r.status === 200,
  });
}
