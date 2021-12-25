import React, { useState, useEffect } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { API } from "../../constants/end-points";
import * as ApiService from "../../apis/api-call";

const Home: React.FC<any> = () => {
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [data, setData] = useState<Array<any>>([]);

  function filterData(dataArray: Array<any>, startDate: Date, endDate: Date) {
    var data = dataArray.filter(
      (p) => new Date(p.date) >= startDate && new Date(p.date) <= endDate
    );
    return data;
  }

  function handleSelect(date: RangeKeyDict) {
    if (date["selection"].startDate) setStartDate(date["selection"].startDate);
    if (date["selection"].endDate) setEndDate(date["selection"].endDate);
  }

  useEffect(() => {
    document.title = "Home Screen";
  }, []);

  useEffect(() => {
    async function loadData() {
      const api = API.ENDPOINTS.GET;
      try {
        const result = await ApiService.getApi(api);
        const data = result.data;
        let resultArray: Array<any> = [];
        Object.keys(data).forEach((key) => {
          resultArray.push(...filterData(data[key].events, startDate, endDate));
        });
        setData(resultArray);
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [startDate, endDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <div>
      <div>
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      </div>
      <div>
        {data.map((itemData, index) => {
          return (
            <div key={index}>
              <div>{`${itemData.title} [${itemData.date}]`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
