import { useState } from "react";
import Box from "./components/box/box";
import AddMetric from "./components/add-metric/add-metric";
import Header from "./components/header/header";
import DateRange from "./components/date-range/date-range";
import PageContainer from "./components/page-container/page-container";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { css } from "@emotion/react";

const App = () => {
  const metrics = ['pr-wip-time','pr-wip-count','pr-review-time',
  'pr-review-count','pr-merging-time','pr-merging-count','pr-release-time','pr-release-count',
'pr-lead-time','pr-lead-count','pr-cycle-time','pr-cycle-count','pr-opened','pr-reviewed',
'pr-not-reviewed','pr-merged','pr-rejected','pr-closed','pr-done'];
  const [availableMetrics, setAvailableMetrics] = useState<string[]>(metrics);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const toDate = new Date()
  const fromDate = new Date()
  fromDate.setDate(toDate.getDate()-6)
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (e: any,newValue: number) =>{
    setTabValue(newValue);
  }

  const addMetric = (metric: string) => {
    const currentMetrics: string[] = [...selectedMetrics];
    currentMetrics.push(metric);
    removeFromAvailableMetric(metric);
    setSelectedMetrics(currentMetrics);
  };

  const removeMetric = (metric: string) => {
    const currentMetrics: string[] = [...selectedMetrics];
    setTabValue(0);
    currentMetrics.splice(currentMetrics.indexOf(metric),1);
    addToAvailableMetric(metric);
    setSelectedMetrics(currentMetrics);
  };

  const removeFromAvailableMetric = (metric: string) => {
    const currentMetrics: string[] = [...availableMetrics];
    setTabValue(0);
    currentMetrics.splice(currentMetrics.indexOf(metric),1);
    setAvailableMetrics(currentMetrics);
  };

   const addToAvailableMetric = (metric: string) => {
    const currentMetrics: string[] = [...availableMetrics];
    currentMetrics.push(metric);
    setAvailableMetrics(currentMetrics);
  };
  
  
  const [from, setFrom] = useState(fromDate.toLocaleDateString());
  const [to, setTo] = useState(toDate.toLocaleDateString());

  function a11yProps(index:number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <PageContainer>
        <Header />
        <div className="body">
          <DateRange setFrom={setFrom} setTo={setTo} />
          <div className="insights">
            <h2>Insights</h2>
            <Tabs  css={tabStyle}  value={tabValue} onChange={handleChangeTab} aria-label="tabs">
              <Tab label="Add metrics" {...a11yProps(0)} />
              {selectedMetrics.map((each, index)=>{
                return (<Tab key={JSON.stringify(each)+index} label={each} {...a11yProps(index+1)} />)
              })}
            </Tabs>
            <AddMetric tabValue={tabValue} currentValue={0} metrics={availableMetrics} addMetric={addMetric}/>
            {selectedMetrics.map((each, index)=>{
                return (<Box  key={JSON.stringify(each)+index+"selected"} metricName={each} from={from} to={to} tabValue={tabValue} currentValue={index+1} removeMetric={removeMetric} />)
              })}
            

            <div className="control"></div>
          </div>
        </div>
    </PageContainer>
  );
};

const tabStyle = () => {
  return css`
    margin-left: 3rem;
  `;
};



export default App;
