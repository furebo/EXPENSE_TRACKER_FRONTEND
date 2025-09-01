import React,{useEffect,useState} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosinstance';
import {toast} from 'react-hot-toast';
import ExpenseOverView from '../../components/Expanse/ExpenseOverView';
import AddExpenseForm from '../../components/Expanse/AddExpenseForm';
import Modal from '../../components/layouts/Modal';
import ExpenseList from '../../components/Expanse/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expanses = () => {
  useUserAuth();
   const[openAddExpenseModal,setOpenAddExpenseModal] = useState(false);
   const[expenseData,setExpenseData] = useState([]);
   const[loading,setLoading] = useState(false);
   const[openDeleteAlert,setOpenDeleteAlert] = useState({
      show: false,
      data: null
    })

      //Get all expense details
  const fetchExpenseDetails = async () => {
    if(loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPANSE.GET_ALL_EXPANSE}`)
      if(response.data){
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("Something Went Wrong, Please try again letter. ",error)
    }finally{
      setLoading(false)
    }
  }

  //handle Add Expense
  const handleAddExpense = async (expense) => {
    const {category,amount,date,icon} = expense;
    //validate checkd
    if(!category.trim()){
      toast.error("Category is required")
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
      await axiosInstance.post(API_PATHS.EXPANSE.ADD_EXPANSE,{
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense is Added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error Adding Expense: ",error.response?.data?.message || error.message)
    }

  }

    //handle delete expense
const deleteExpense = async (id) => {
  try {
    console.log("Deleting expense with id:", id);
    await axiosInstance.delete(API_PATHS.EXPANSE.DELETE_EXPANSE(id));
    setOpenDeleteAlert({show:false, data:null});
    toast.success("Expense is deleted successfully.");
    fetchExpenseDetails();
  } catch (error) {
    console.error("Error deleting the expense",error.response?.data?.message || error.message);
  }
}
//handle download expense details
const handleDownloadExpenseDetails = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.EXPANSE.DOWNLOAD_EXPANSE,{responseType:"blob"})

    //create a url for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download","expense_details.xlsx")
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Erroe downloading expense details: ",error)
    toast.error("Failed to download Expense Details, Please try again later.")
  }
}

  useEffect(
     () => {
      fetchExpenseDetails();
  return () => {}
     },[])
  return (
    <DashboardLayout activeMenue="Expense">
      <div className='my-5 mx-auto'>
         <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <ExpenseOverView
               transactions={expenseData}
               onExpenseIncome = {() => setOpenAddExpenseModal(true)}
              />
            </div>
            <ExpenseList 
             transactions = {expenseData}
             onDelete = {(id) => {
              setOpenDeleteAlert({show:true, data: id})
             }}
             onDownload = {handleDownloadExpenseDetails}
            />
         </div>
         <Modal 
           isOpen={openAddExpenseModal}
           onClose={() => setOpenAddExpenseModal(false)}
           title="Add Expense"
         >
           <AddExpenseForm onAddExpense = {handleAddExpense}/>
         </Modal>
          <Modal 
            isOpen={openDeleteAlert.show}
            onClose = {() => setOpenDeleteAlert({show:false,data:null})}
            title = "Delete Expense"
          >
            <DeleteAlert 
            content="Are you sure you want to delete this Expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expanses