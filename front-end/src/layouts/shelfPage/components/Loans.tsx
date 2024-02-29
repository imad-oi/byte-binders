import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoansModel from "../../../models/ShelfCurrentLoansModel";
import SpinnerLoading from "../../utils/SpinnerLoading";
import { Link } from "react-router-dom";
import LoanModal from "./LoanModal";
import { TbFaceIdError } from "react-icons/tb";
import Alert from "../../utils/Alert";
import LoanCard from "./LoanCard";

const Loans = () => {

    const { authState } = useOktaAuth();

    // Current loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoansModel[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [checkout, setCheckout] = useState<boolean>(false);

    // Loan Modal
    const [openLoanModal, setOpenLoanModal] = useState(false);
    const [loan, setLoan] = useState<ShelfCurrentLoansModel>();

    // Alert state
    const [visible, setVisible] = useState(false);
    const [alertText, setAlertText] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUserCurrentLoans = async () => {

            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8888/api/books/secure/currentloans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                    }
                };

                const shelfCurrentLoansresponse = await fetch(url, requestOptions);
                if (!shelfCurrentLoansresponse.ok) throw new Error(" HTTP status " + shelfCurrentLoansresponse.status + " - " + shelfCurrentLoansresponse.statusText);

                const shelfCurrentLoansresponseJson = await shelfCurrentLoansresponse.json();
                setShelfCurrentLoans(shelfCurrentLoansresponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error) => {
            setHttpError(error.message);
            setIsLoadingUserLoans(false);
        })

    }, [authState, checkout])


    if (httpError) {
        return <div className="mt-5" role="alert">
            <h4 className="font-bold text-red-300">HTTP Error</h4>
            <p>{httpError}</p>
        </div>
    }

    if (isLoadingUserLoans) {
        return <SpinnerLoading />
    }

    const returnBook = async (bookId: number) => {
        const url = `http://localhost:8888/api/books/secure/return/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`
            }
        };
        const returnBookResponse = await fetch(url, requestOptions);
        if (!returnBookResponse.ok) throw new Error(" HTTP status " + returnBookResponse.status + " - " + returnBookResponse.statusText);
        setCheckout((prev) => !prev);
        setOpenLoanModal(false);
        setAlertText('You have successfully returned your book');
        setTimeout(() => {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 3500); // 4000 - 500 = 3500
        }, 500);
    };

    const renewLoan = async (bookId: number) => {
        console.log(bookId);
        const url = `http://localhost:8888/api/books/secure/renew/loan/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`
            }
        };
        const renewLoanResponse = await fetch(url, requestOptions);
        if (!renewLoanResponse.ok) throw new Error(" HTTP status " + renewLoanResponse.status + " - " + renewLoanResponse.statusText);
        setCheckout((prev) => !prev);
        setOpenLoanModal(false);
        setAlertText('You have successfully renewed your loan');
        setTimeout(() => {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 3500); // 4000 - 500 = 3500
        }, 500);
    }



    return (
        <div>
            <div>
                <Alert visible={visible} setVisible={setVisible} text={alertText} />
                {
                    shelfCurrentLoans.length > 0 ?
                        <>
                            <div className="grid md:grid-cols-2 gap-4">
                                {
                                    shelfCurrentLoans.map((loan, i) => (
                                        <LoanCard key={i} loan={loan} setLoan={setLoan} setOpenLoanModal={setOpenLoanModal} />
                                    ))
                                }
                            </div>
                            <LoanModal
                                loan={loan}
                                onClose={() => setOpenLoanModal(false)}
                                openLoanModal={openLoanModal}
                                returnBook={returnBook}
                                renewLoan={renewLoan} />
                        </>
                        :
                        <div className="p-4 flex flex-col justify-center items-center">
                            <div className="flex items-center space-x-3">
                                <span>
                                    <TbFaceIdError className="w-12 h-12 text-sky-700" />
                                </span>
                                <p className=" md:text-xl font-bold text-sky-700">
                                    Currently you have no loans
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Link className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 focus:ring-sky-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8"
                                    to="/search">Search for a new books ?
                                    <span className="sr-only">, reusing styles</span>
                                    <svg className="overflow-visible ml-3 text-sky-300 group-hover:text-sky-400 dark:text-slate-500 dark:group-hover:text-slate-400" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M0 0L3 3L0 6"></path></svg>
                                </Link>

                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Loans