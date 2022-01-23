import { css } from "@emotion/react";
import { useState } from 'react';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface Props{
  addMetric: (metric:string)=>void;
  tabValue: number;
  currentValue: number;
  metrics: string[];
}

const AddMetric = (props: Props) => {
    const {addMetric, tabValue, currentValue, metrics} = props;
    const [metric, setMetric] = useState('');
    const [error, setError] = useState<undefined | string>(undefined);
    
    const renderMenu = () => {
       return metrics.map((each:string, index)=>{
            return (
                <MenuItem key={JSON.stringify(each)+index+"selected"} value={each}>{each}</MenuItem>
            )
        })
    }


    const handleChange = (event:any) => {
        setError(undefined);
        setMetric(event.target.value);
    };

    const verify = () => {
        if(!metric || metric===""){
            setError('Select one');
            return false;
        }
        return true;
    }

    return (<div>
    { tabValue === currentValue && (
        <div css={boxStyle}>
            <h3>Add metric</h3>
            <FormControl>
            <InputLabel id="add-metric">Select one metric</InputLabel>
            <Select labelId="add-metric"
                value={metric}
                label="Select one metric"
                onChange={handleChange}>
                {renderMenu()}
            </Select><br/>
            {error && <div>Please select one</div>} <br/>
            <Button onClick={()=>{ if(verify()){ 
                addMetric(metric);
                setMetric("");
            }}}>Add new metric tab</Button>
            </FormControl>

        </div>
    )}
    </div>);
};

const boxStyle = () => {
  return css`
    width: 90%;
    margin: 0px auto;
    text-align: center;
    padding: 3rem;
  `;
};

export default AddMetric;