import CustomPieChart from "../Charts/CustomPieChart";
const FinanceOverView = ({totalBalance,totalIncome,totalExpanses}) => {
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
    const balanceData = [
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expanses",amount:totalExpanses}
    ]
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Financial Overview</h5>
        </div>
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
    </div>
  )
}

export default FinanceOverView