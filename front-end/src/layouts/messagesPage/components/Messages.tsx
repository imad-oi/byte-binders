import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import SpinnerLoading from "../../utils/SpinnerLoading";
import AlertError from "../../utils/AlertError";
import Pagination from "../../utils/Pagination";

const Messages = () => {

    const { authState } = useOktaAuth();
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    // Messages
    const [messages, setMessages] = useState<MessageModel[]>([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);


    // fetch user messages useEffect
    useEffect(() => {
        const fetchUserMessages = async () => {
            if (authState?.isAuthenticated) {
                const url = `http://localhost:8888/api/messages/search/findByUserEmail?userEmail=${authState?.accessToken?.claims.sub}&paga=${currentPage - 1}&size=${messagesPerPage}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                    }
                };
                const userMessagesResponse = await fetch(url, requestOptions);
                if (!userMessagesResponse.ok) throw new Error('Network response was not ok.') && console.log(userMessagesResponse);
                const userMessagesData = await userMessagesResponse.json();
                // alert(JSON.stringify(userMessagesData));
                setMessages(userMessagesData._embedded.messages);
                setTotalPages(userMessagesData.totalPages);
            }
            setIsLoadingMessages(false);
        }

        fetchUserMessages().catch((error) => {
            setHttpError(error.message);
            setIsLoadingMessages(false);
        });
        window.scrollTo(0, 0);
    }, [authState, currentPage])

    if (isLoadingMessages) return <SpinnerLoading />

    if (httpError) return <AlertError error={httpError} />

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div >
            {messages.length > 0 ?
                <>
                    <div className="flex flex-col gap-4">
                        {
                            messages.map((message, i) => (
                                <div key={i} className="ring-1 ring-slate-300 p-4 rounded-md">
                                    <h2 className="font-bold text-blue-600 md:text-xl">Case #{message.id} : {message.title} </h2>
                                    <div className="ps-6 border-s-2  bg-gray-00 rounded-sm my-2">
                                        <p className=" text-slate-600 font-semibold pb-2">{message.userEmail} </p>
                                        <p className=" text-slate-500"> <i>
                                            {message.question}
                                        </i>
                                        </p>
                                    </div>
                                    <hr className="mt-4" />
                                    <p className="flex flex-col text-sm font-semibold mt-4">
                                        <span>Response :</span>
                                        {
                                            message.closed ?
                                                <div>
                                                    <div>
                                                        <span>From:</span>
                                                        <span> {message.adminEmail} admin </span>
                                                    </div>
                                                    <div>
                                                        <p className="my-2 text-slate-500 border-s-2 ps-4"> {message?.response} </p>
                                                    </div>
                                                </div>
                                                : "Pending response from administration. Please be patient. "
                                        }
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </>
                :
                "No messages found."
            }
            {
                totalPages > 1 && <Pagination
                    currentPage={currentPage}
                    paginate={paginate}
                    totalPages={totalPages}
                />
            }
        </div>
    )
}

export default Messages