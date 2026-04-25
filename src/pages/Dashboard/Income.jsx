import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverView from '../../components/income/IncomeOverView'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/layouts/Modal'
import AddIncomeForm from '../../components/income/AddIncomeForm'
import {toast} from 'react-hot-toast'
import IncomeList from '../../components/income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'
const Income = () => {
  useUserAuth();
  const[openAddIncomeModal,setOpenAddIncomeModal] = useState(false);
  const[incomeData,setIncomeData] = useState([]);
  const[loading,setLoading] = useState(false);
  const[openDeleteAlert,setOpenDeleteAlert] = useState({
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
    const {source,amount,date,icon} = income;
    //validate checkd
    if(!source.trim()){
      toast.error("Source is required")
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0 ){
      toast.error("Amount should a valid number greater than 0");
      return;
    }
    if(!date){
      toast.error("Date is required")
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income is Added successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error Adding Income: ",error.response?.data?.message || error.message)
    }

  }

  //handle delete income
const deleteIncome = async (id) => {
  try {
    console.log("Deleting income with id:", id);
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
    setOpenDeleteAlert({show:false, data:null});
    toast.success("Income is deleted successfully.");
    fetchIncomeDetails();
  } catch (error) {
    console.error("Error deleting the income",error.response?.data?.message || error.message);
  }
}
//handle download Income details
const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,{responseType:"blob"})
  
      //create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","income_details.xlsx")
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erroe downloading income details: ",error)
      toast.error("Failed to download income Details, Please try again later.")
    }
}
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
                // onDownload = {handleDownloadIncomeDetails}
               />
            </div>
            <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({show:true,data:id})
            } }
            onDownload = {handleDownloadIncomeDetails}
            />
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
          <Modal 
            isOpen={openDeleteAlert.show}
            onClose = {() => setOpenDeleteAlert({show:false,data:null})}
            title = "Delete Income"
          >
            <DeleteAlert 
            content="Are you sure you want to delete this Income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
         </div>
    </DashboardLayout>
  )
}

export default Income