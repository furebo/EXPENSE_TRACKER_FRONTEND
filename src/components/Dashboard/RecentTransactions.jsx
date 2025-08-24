import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import { LuUtensils} from "react-icons/lu"

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Transactions</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>
        <div className='mt-6'>
            {transactions?.length > 0 ? (
                 transactions.slice(0,5).map((item) => (
                  <TransactionInfoCard 
                      key={item._id}
                      title={item.type === "expanse" ? item.category : item.source}
                      icon={<LuUtensils/>}
                      date={moment(item.createdAt).format("DD MMM YYYY")}
                      amount={item.amount}
                      type={item.type}
                      hideDeleteBtn
             />
         ))
     ) : (
   <p className="text-sm text-gray-400">No transactions found.</p>
)}

        </div>
    </div>
  )
}

export default RecentTransactions