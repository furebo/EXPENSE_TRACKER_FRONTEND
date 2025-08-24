import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChartData from '../Charts/CustomBarChartData';

const Last30DaysExpanses = ({data}) => {
    const [chartData, setChartData] = useState([]);
    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        return () => {}
    },[data]);
  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 days expenses</h5>
        </div>
        <CustomBarChartData data={chartData}/>
    </div>
  )
}

export default Last30DaysExpanses