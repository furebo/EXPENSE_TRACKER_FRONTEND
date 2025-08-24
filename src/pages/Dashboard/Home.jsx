import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { FaTachometerAlt, FaCoins, FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";
import { addThousandsSeparator } from '../../utils/helper';
import InfoCard from '../../components/Cards/InfoCard';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverView from '../../components/Dashboard/FinanceOverView';
import ExpanseTransactions from '../../components/Dashboard/ExpanseTransactions';
import Last30DaysExpanses from '../../components/Dashboard/Last30DaysExpanses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchDashboardData = async() => {
    if(loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if(response.data){
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, please try again. ",error)
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchDashboardData();
    return () => {}
  },[])
  return (
    <DashboardLayout activeMenue="Dashboard">
      <div className='my-5 mx-auto'>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard 
          icon={<FaCoins/>}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color="green"
           />
          <InfoCard 
          icon={<FaCoins/>}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color="yellow"
           />
          <InfoCard 
          icon={<FaCoins/>}
          label="Total expanse"
          value={addThousandsSeparator(dashboardData?.totalExpanses || 0)}
          color="blue"
           />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions 
            transactions={dashboardData ?.recentTransactions}
            onSeeMore={() => navigate("/expanse")}
           /> 
            <FinanceOverView
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpanses={dashboardData?.totalExpanses || 0}
            />
            <ExpanseTransactions 
              transactions = {dashboardData?.last30DaysExpanses?.transactions || []}
              onSeeMore = {() => navigate("/expanse")}
            />
            <Last30DaysExpanses 
              data={dashboardData?.last30DaysExpanses?.transactions || []}
            />

            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
              totalIncome={dashboardData?.totalIncome || 0}
            />
            <RecentIncome 
              transactions = {dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore = {() => navigate("/income")}
            />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home