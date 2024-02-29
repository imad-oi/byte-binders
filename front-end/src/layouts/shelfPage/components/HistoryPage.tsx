import { useOktaAuth } from "@okta/okta-react"
import { useEffect, useState } from "react";
import HistoryModel from "../../../models/HistoryModel";
import SpinnerLoading from "../../utils/SpinnerLoading";
import AlertError from "../../utils/AlertError";
import { BiCheckCircle } from "react-icons/bi";
import { BsArrowReturnLeft } from "react-icons/bs";
import Pagination from "../../utils/Pagination";

const HistoryPage = () => {

    const { authState } = useOktaAuth();
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Histories
    const [histories, setHistories] = useState<HistoryModel[]>([]);


    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUserHistories = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8888/api/histories/search/findByUserEmail?userEmail=${authState?.accessToken?.claims?.sub}&page=${currentPage - 1}&size=5`;

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                    }
                }
                const historyRes = await fetch(url, requestOptions);
                console.log(historyRes);

                if (!historyRes.ok) throw new Error("Error while fetching data, check the console") && console.log(historyRes);

                const historyResJson = await historyRes.json();
                setHistories(historyResJson._embedded.histories);
                setTotalPages(historyResJson.page.totalPages);
            }
            setIsLoadingHistory(false);
        }

        fetchUserHistories().catch((err) => {
            setHttpError(err.message);
            setIsLoadingHistory(false);
        })
    }, [authState, currentPage])

    if (httpError) {
        return (<AlertError error={httpError} />)
    }

    if (isLoadingHistory) {
        return (
            <SpinnerLoading />
        )
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


    return (
        <div className="bg-green-00">
            {histories.length > 0 ?
                <div className="flex flex-col gap-4">
                    {histories.map((history, i) => (
                        <div key={i}
                            className="flex flex-col items-center md:flex-row md:justify-start md:items-start gap-4 p-4 ring-1 ring-slate-300 rounded-sm shadow hover:ring-slate-400 ">
                            <div className="">
                                <img
                                    className="object-cover w-24 md:w-32 rounded-sm"
                                    src={history.img} alt="book" width={76} height={87} loading="lazy" />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-start space-y-4">
                                <div className="border-b-2 md:border-b-0 pb-2 md:border-e-2 md:pe-2 ">
                                    <p className="text-slate-600 -tracking-tighter "> {history.author} </p>
                                    <p className="font-bold "> {history.title} </p>
                                    <p className="md:max-w-3xl text-slate-500"> {history.description} </p>
                                </div>
                                <div className="ms-2">
                                    <p className="flex items-center gap-2 text-slate-700 font-semibold tracking-tighter">
                                        <BiCheckCircle className="inline-block text-green-500" />
                                        <span>
                                            Checked out on : {" "}
                                            {history.checkoutDate}
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2 text-slate-700 font-semibold">
                                        <BsArrowReturnLeft className="inline-block " />
                                        <span>
                                            Returned on : {" "}
                                            {history.returnedDate}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-red-00 flex justify-center">
                        {
                            totalPages > 1 &&
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                paginate={paginate}
                            />
                        }
                    </div>
                </div>
                : "No history found"
            }
        </div >
    )
}

export default HistoryPage