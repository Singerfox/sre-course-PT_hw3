import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    http_req_duration: [{ threshold: 'p(95)<500', abortOnFail: false }],
    checks: ['rate>0.9'],
  },
  scenarios: {
   kill_test: {
//      executor: 'ramping-arrival-rate',
//      preAllocatedVUs: 360,
        executor: 'ramping-vus',
        startVUs: 100,
   stages: [
     { duration: '14m', target: 1720 },
     { duration: '1m', target: 40 },
    ],
  },
 },
};

export default function () {
  const url = `http://sre-course.singerfox.ru/WeatherForecast`;
  const params = {
    headers: {
      'accept':'application/json',
    },
  };
  check(http.get(url, params), {
    'status 200': (r) => r.status === 200,
  });
//  sleep(1);
}
