import moment from 'moment';
import { LuArrowBigRight,LuUtensils } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const ExpanseTransactions = ({transactions,onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expenses</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowBigRight className='text-base'/>
            </button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((expense) => {
                return <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={<LuUtensils />}
                date={moment(expense.createdAt).format("DD MMM YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
              />
           })}
        </div>
    </div>
  )
}

export default ExpanseTransactions