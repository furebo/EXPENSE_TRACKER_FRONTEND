import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverView from '../../components/income/IncomeOverView'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/layouts/Modal'
import AddIncomeForm from '../../components/income/AddIncomeForm'
const Income = () => {
  const[openAddIncomeModal,setOpenAddIncomeModal] = useState(false);
  const[incomeData,setIncomeData] = useState([]);
  const[loading,setLoading] = useState(false);
  const[openDeletAlert,setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  //Get all income details
  const fetchIncomeDetails = async () => {
    if(loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)
      if(response.data){
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("Something Went Wrong, Please try again letter. ",error)
    }finally{
      setLoading(false)
    }
  }

  //handle Add Income
  const handleAddIncome = async (income) => {
      }

  //handle delete income
  const deleteIncome = async (id) => {}

useEffect(() => {
  fetchIncomeDetails();
  return () => {}
},[])
  return (
    <DashboardLayout activeMenue="Income">
         <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
               <IncomeOverView
                 transactions={incomeData}
                 onAddIncome={() => setOpenAddIncomeModal(true)}
               />
            </div>
          </div>
          <Modal 
            isOpen={openAddIncomeModal}
            onClose = {() => setOpenAddIncomeModal(false)}
            title = "Add Income"
          >
            <AddIncomeForm 
            onAddIncome={handleAddIncome}
            />
          </Modal>
         </div>
    </DashboardLayout>
  )
}

export default Income