import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
      { duration: "20s", target: 80 }, 
      { duration: "30s", target: 200 }, 
      { duration: "40s", target: 400 }, 
      { duration: "20s", target: 0 }, 
    ]
  }

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}

export default function () {
  const url = 'https://simple-books-api.glitch.me/orders';
  const payload = JSON.stringify({
    bookId: 1,
    customerName: 'Gil do Vigor'
  });

  http.get(url, payload);

}
