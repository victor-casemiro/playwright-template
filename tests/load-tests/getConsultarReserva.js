import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: "5s", target: 2 },
    { duration: "10s", target: 3 },
    { duration: "20s", target: 5 },
    { duration: "10s", target: 0 },
  ]
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export default function () {
  const url = 'https://dev-htc-web.hometesterclub-dev.com/us/en';
  const payload = {
    headers: {
      "CF-Access-Client-Id": "0188aeafcb0547ae968bff7333f18486.access",
      "CF-Access-Client-Secret": "f35c1c3cb656959552ef5ff4813086105c59662a4d87ffb47f19e10350f50eb5",
    },
  };

  http.get(url, payload);

}