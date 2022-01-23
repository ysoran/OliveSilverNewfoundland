import { css } from "@emotion/react";
import { useEffect, useState } from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

interface Props{
  from: string;
  to: string;
  metricName: string;
  tabValue: number;
  currentValue: number;
  removeMetric: (metric: string) => void;
}



const Box = (props: Props) => {
  const { metricName, from, to,removeMetric } = props;
  const [data,setData] = useState<any>();
  const [categoriesArray,setCategoriesArray] = useState<string[]>([]);
  const [valuesArray,setValuesArray] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  const fetchData = async (fromDate?: string, toDate?: string) => {
    let response: any = {};
    try{
    response = await fetch(
      "https://api.athenian.co/v1/metrics/pull_requests",
      {
        method: "POST",
        body: JSON.stringify({
          for: [
            {
              repositories: [
                "github.com/athenianco/athenian-webapp",
                "github.com/athenianco/athenian-api",
                "github.com/athenianco/infrastructure",
                "github.com/athenianco/metadata",
              ],
            },
            {
              repositories: [
                "github.com/athenianco/metadata",
                "github.com/athenianco/athenian-api",
                "github.com/athenianco/infrastructure",
                "github.com/athenianco/metadata",
              ],
            },
          ],
          metrics: [metricName],
          date_from: fromDate,
          date_to: toDate,
          granularities: ["day"],
          account: 1,
          exclude_inactive: true,
        }),
      });
    }catch(error){
      setError(error);
      return;
    }
    const result = await response.json();
    setData(result);
  };

  

  useEffect(()=>{
    if(data?.calculated && data?.calculated[0]?.values){
      let categories: string[] = [];
      let values: Array<number[]> = [];
      data?.calculated[0]?.values.forEach((each: any)=>{
        categories.push(each.date);
        values.push(each.values[0] ? each.values[0] : 0)
      });
      setCategoriesArray(categories);
      setValuesArray(values);
    }
  },[data]);

  const options = {
    chart: {
        type: 'spline'
    },
    title: {
      text: `Stats for ${metricName}`
    },
    xAxis: {
        categories: categoriesArray,
    },
    yAxis: {
        title: {
            text: metricName
        }
    },
    series: {data:valuesArray}
  };

  useEffect(()=>{
    if(!(from && to)){
      return
    }
    fetchData(from,to);
  },[from,to,metricName]);


  return (<div>
    { props.tabValue === props.currentValue && (
      <div css={boxStyle}>
        <button className="closeButton" onClick={()=>removeMetric(props.metricName)}>X</button>
        <h3>Insights for metric {metricName}</h3>
        <div className="container">
          <div className="chart"><HighchartsReact highcharts={Highcharts} options={options} /></div>
        </div>
        {error && <div>Couldnt add selected metric</div>}
      </div>
    )}
  </div>);
};

const boxStyle = () => {
  return css`
    width: 100%;
    margin: 0px auto;
    text-align: center;
    position: relative;

    & .closeButton {
      position: absolute;
      right: 5rem;
      top: 1rem;
    }

    & .container{
      display: flex;
    }

    & .chart {
      padding: 1rem;
      position: relative;
      width: 45%;
      margin: 1rem;
      overflow: hidden;
    }
  `;
};

export default Box;