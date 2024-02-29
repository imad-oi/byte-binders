import { Link } from "react-router-dom";
import ShelfCurrentLoansModel from "../../../models/ShelfCurrentLoansModel";

type LoanCardProps = {
    loan: ShelfCurrentLoansModel,
    setLoan: (loan: ShelfCurrentLoansModel) => void,
    setOpenLoanModal: (openLoanModal: boolean) => void
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, setLoan, setOpenLoanModal }) => {
    return (
        <div className="flex gap-8 px-4 py-4 ring-1 ring-slate-400 rounded-md">
            <div className="">
                <img src={loan.book.img} width={150} height={100} alt={loan.book.title} className="rounded-md shadow-md" />
            </div>
            <div className="flex flex-col justify-around">
                <div>
                    <p className="text-slate-900 font-bold tracking-tight">Loan Options</p>
                    {
                        parseInt(loan.daysLeft.toLocaleString()) > 0 &&
                        <p className="text-green-700 text-md font-semibold">Due in {loan.daysLeft.toLocaleString()} days</p>
                    }
                    {
                        parseInt(loan.daysLeft.toLocaleString()) === 0 &&
                        <p className="text-green-700 text-md font-semibold">Due Today</p>
                    }
                    {
                        parseInt(loan.daysLeft.toLocaleString()) < 0 &&
                        <p className="text-green-700 text-md font-semibold">Past Due by {loan.daysLeft.toLocaleString()} days</p>
                    }
                </div>
                <div className="flex flex-col gap-2 py-2">
                    <button className="btn-secondary" onClick={() => { setLoan(loan); setOpenLoanModal(true) }}>Manage Loan</button>
                    <button className="btn-secondary">
                        <Link to="/search" >Search more books?</Link>
                    </button>
                </div>
                <div className="flex flex-col items-start gap-3 ">
                    <p className="text-slate-500">Help other find their adventure by reviewing you loan</p>
                    <div className="flex justify-start">
                        <button className="btn-primary">Leave a reveiw</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanCard