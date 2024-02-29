import { useOktaAuth } from "@okta/okta-react"
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import SpinnerLoading from "../../utils/SpinnerLoading";
import AlertError from "../../utils/AlertError";
import Pagination from "../../utils/Pagination";
import AdminMessage from "./AdminMessage";
import AdminMessageRequest from "../../../models/AdminMessageRequest";

const AdminMessages = () => {

    const { authState } = useOktaAuth();

    // Normal Loading Pieces
    const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    // Messages endpoint state
    const [messages, setMessages] = useState<MessageModel[]>([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    // Recall the useEffect when currentPage changes
    const [btnSubmit, setBtnSubmit] = useState(false);


    // fetch user messages useEffect
    useEffect(() => {
        const fetchUserMessages = async () => {
            if (authState?.isAuthenticated) {
                const url = `http://localhost:8888/api/messages/search/findByClosed?closed=false&paga=${currentPage - 1}&size=${messagesPerPage}`;
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
    }, [authState, currentPage, btnSubmit])

    if (isLoadingMessages) return <SpinnerLoading />

    if (httpError) return <AlertError error={httpError} />

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const submitResponseToQuestion = async (messageId: number, response: string) => {
        if (authState?.isAuthenticated && messageId !== null && response !== '') {
            const url = `http://localhost:8888/api/messages/secure/admin/message`;
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(messageId, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                },
                body: JSON.stringify(messageAdminRequestModel),
            }
            console.log(messageAdminRequestModel);
            const responseMessage = await fetch(url, requestOptions);
            if (!responseMessage.ok) throw new Error('Network response was not ok.') && console.log(responseMessage);
            setBtnSubmit((prev) => !prev);
        }
    }


    return (
        <div>
            {
                messages && messages?.length > 0 ?
                    <div className="flex flex-col gap-4 p-2 mb-4">
                        {
                            messages?.map((message: MessageModel) => (
                                <AdminMessage
                                    submitResponseToQuestion={submitResponseToQuestion}
                                    message={message}
                                    key={message.id} />
                            ))
                        }
                    </div>
                    :
                    <div>
                        no messages
                    </div>
            }
            {
                totalPages > 1 && <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    paginate={paginate} />
            }
        </div>
    )
}

export default AdminMessages