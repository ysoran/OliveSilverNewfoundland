import {useState} from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {TextField} from '@mui/material';
import { css } from "@emotion/react";

interface Props{
    setFrom: (date:any)=>void;
    setTo: (date:any)=>void;
}

const DateRange = (props:Props) => {
    const date = new Date()
    const twoDaysBefore = new Date()
    twoDaysBefore.setDate(date.getDate()-6)
    const [from, setFrom] = useState<Date | string | null>(twoDaysBefore);
    const [to, setTo] = useState<Date | string | null>(date);

    return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div css={divStyle}>Please select a date range:</div>
        <div css={dateWrapper}>
            <DatePicker
                label="From"
                value={from}
                onChange={(newValue) => {
                    setFrom(newValue);
                    props.setFrom(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <div css={seperator}> - </div>
            <DatePicker
                label="To"
                value={to}
                onChange={(newValue) => {
                    setTo(newValue);
                    props.setTo(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </div>
    </LocalizationProvider>
  );
};

const divStyle = () => {
  return css`
    padding: 1rem;
    width: 100%;
    margin: 0px auto;
    text-align: center;
  `;
};

const seperator = () => {
  return css`
    padding: 1rem;
  `;
};

const dateWrapper = () => {
  return css`
    display:flex;
    width:100%;
    justify-content: center;
  `;
};

export default DateRange;
