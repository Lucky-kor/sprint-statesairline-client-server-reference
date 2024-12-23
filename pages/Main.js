import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getFlight } from '../api/FlightDataApi';
import FlightList from './component/FlightList';
import LoadingIndicator from './component/LoadingIndicator';
import Search from './component/Search';
import Debug from './component/Debug';

export default function Main() {
  const [condition, setCondition] = useState({
    departure: 'ICN',
  });
  const [flightList, setFlightList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = ({ departure, destination }) => {
    if (
      condition.departure !== departure ||
      condition.destination !== destination
    ) {
      setCondition({ departure, destination });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getFlight(condition).then((filtered) => {
      setFlightList(filtered);
      setIsLoading(false);
    });
  }, [condition]);

  global.search = search;

  return (
    <div>
      <Head>
        <title>States Airline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>여행가고 싶을 땐, States Airline</h1>
        <Search onSearch={search} />
        <div className="table">
          <div className="row-header">
            <div className="col">출발</div>
            <div className="col">도착</div>
            <div className="col">출발 시각</div>
            <div className="col">도착 시각</div>
            <div className="col"></div>
          </div>
          {isLoading ? <LoadingIndicator /> : <FlightList list={flightList} />}
        </div>

        <div className="debug-area">
          <Debug condition={condition} />
        </div>
        <img id="logo" alt="logo" src="codestates-logo.png" />
      </main>
    </div>
  );
}