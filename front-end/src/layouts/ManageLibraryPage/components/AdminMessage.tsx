import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel"
import AlertWarning from "../../utils/AlertWarning";
import { BsFillCaretDownFill } from "react-icons/bs";

type AdminMessageProps = {
    message: MessageModel,
    submitResponseToQuestion: (messageId: number, response: string) => void
};

const AdminMessage: React.FC<AdminMessageProps> = ({ message, submitResponseToQuestion }) => {

    const [displayWarning, setDisplayWarning] = useState<boolean>(false);
    const [response, setResponse] = useState<string>('');
    const [showResponseBlock, setShowResponseBlock] = useState<boolean>(false);

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (response !== null && response !== '' && message.id !== undefined) {
            submitResponseToQuestion(message.id, response);
            setResponse('');
            setShowResponseBlock(false);
            // alert('Response submitted successfully');
        }
        else setDisplayWarning(true);
    }

    useEffect(() => {
        if (displayWarning) {
            const timeoutId = setTimeout(() => {
                setDisplayWarning(false);
            }, 4000);
            return () => clearTimeout(timeoutId);
        }
    }, [displayWarning])

    return (
        <div className="ring-1 ring-slate-300 p-4 rounded-md">
            <h2 className="font-bold text-blue-600 md:text-xl">Case #{message.id} : {message.title} </h2>
            <div className="ps-6 border-s-2  bg-gray-00 rounded-sm my-2">
                <p className=" text-slate-600 font-semibold pb-2">{message.userEmail} </p>
                <p className=" text-slate-500"> <i>
                    {message.question}
                </i>
                </p>
            </div>
            <hr className="mt-4" />
            <p className="flex flex-col gap-2 text-sm font-semibold mt-4">
                <span className="flex items-center gap-2 hover:cursor-pointer"
                    onClick={() => setShowResponseBlock((prev) => !prev)}
                >
                    Response : <BsFillCaretDownFill size={16} className={`mt-1 ${showResponseBlock ? "text-red-400 rotate-180" : "text-sky-400"}`} />
                </span>
                {
                    showResponseBlock &&

                    <form action="PUT" onSubmit={(e) => handleSubmitForm(e)}>
                        {displayWarning && <AlertWarning />}
                        <div className="bg-green-00 space-y-2">
                            <textarea id="message" rows={4}
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-700 focus:ring-2 focus:outline-none"
                                placeholder="Leave a response ..." />
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Submit Response
                            </button>
                        </div>
                    </form>
                }
            </p>
        </div>
    )
}

export default AdminMessage