import React, { useEffect,useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChartData from '../Charts/CustomBarChartData';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverView = ({transactions,onAddIncome}) => {
    const [chartData,setChartData] = useState([]);
    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        console.log(" This is ChartData in IncomeOverView :", result);
        setChartData(result);
        return () => {}
    },[transactions])
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-sm text-gray-400 mt-0.5'>Track your earnings overtime and analyse your income trends </p>
        </div>
        <button className='add-btn ' onClick={onAddIncome}>
          <LuPlus className='text-lg'/> Add Income
        </button>
      </div>
      <div className='mt-10'>
        <CustomBarChartData 
        data={chartData}
        />
      </div>
    </div>
  )
}

export default IncomeOverView