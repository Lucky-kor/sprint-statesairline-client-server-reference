import flightList from "../resource/flightList";
import fetch from "node-fetch";

if (typeof window !== "undefined") {
  localStorage.setItem("flight", JSON.stringify(flightList));
}

export function getFlight(filterBy = {}) {
  const queryStringArr = [];

  if (filterBy.departure) {
    queryStringArr.push(`departure=${filterBy.departure}`);
  }

  if (filterBy.destination) {
    queryStringArr.push(`destination=${filterBy.destination}`);
  }

  // join("&")으로 결합하면 해당 요소가 그대로 반환됩니다.
  const queryString = queryStringArr.join("&");
  console.log('[Query] '+queryString)

  const endpoint = `http://localhost:5000/flight${
    queryString ? `?${queryString}` : ""
  }`;
  console.log('[Endpoint] '+endpoint)

  // fetch(endpoint)
  // .then((response) => response.json())  - 원격 서버로부터의 응답(response)을 JSON 형식으로 파싱 합니다.
  // .then((data) => { ... }) - JSON 데이터가 파싱되면 해당 데이터로 처리 합니다.

  return fetch(endpoint).then((resp) => resp.json());
}
