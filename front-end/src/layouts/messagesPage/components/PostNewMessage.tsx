import { useOktaAuth } from "@okta/okta-react"
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";

const PostNewMessage: React.FC<{}> = () => {

    const { authState } = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [displayWarning, setDisplayWarning] = useState(false);

    // display success message for 4 seconds
    useEffect(() => {
        if (displaySuccess) {
            const timeoutId = setTimeout(() => {
                setDisplaySuccess(false);
            }, 4000);
            return () => clearTimeout(timeoutId);
        }
    }, [displaySuccess]);

    // display warning message for 4 seconds
    useEffect(() => {
        if (displayWarning) {
            const timeoutId = setTimeout(() => {
                setDisplayWarning(false);
            }, 4000);
            return () => clearTimeout(timeoutId);
        }
    }, [displayWarning]);

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (authState?.isAuthenticated && title !== '' && question !== '') {
            const url = 'http://localhost:8888/api/messages/secure/add/message';
            const messageRequestModel: MessageModel = new MessageModel(title, question);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                },
                body: JSON.stringify(messageRequestModel)
            };
            const addMessageResponse = await fetch(url, requestOptions);
            if (!addMessageResponse.ok) throw new Error('Network response was not ok.') && console.log(addMessageResponse);
            setDisplaySuccess(true);
            setTitle('');
            setQuestion('');

        } else setDisplayWarning(true);
    }


    const alertSuccess = (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Success alert!</span> Question added successfully.
        </div>
    )

    const alertWarning = (
        <div className="md:w-1/2 flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">Danger alert!</span> Please fill all fields.
            </div>
        </div>
    )

    return (
        <>
            {displaySuccess && alertSuccess}
            {displayWarning && alertWarning}
            <div className="md:flex md:justify-between">
                <div className="ring-1 ring-slate-300 rounded-md md:w-1/2">
                    <p className="p-4 bg-sky-100 text-sky-700 rounded-t-lg font-bold">Ask question to Imad Oissafe Admin</p>
                    <div className="rounded-b-md bg-red-00 p-2 ">
                        <form method="POST" className="flex flex-col" onSubmit={(e)=>handleSubmitForm(e)} >
                            <div className="mb-6 space-y-2">
                                <label htmlFor="base-input" className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" id="base-input"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter your title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-700 block w-full p-2.5" />
                            </div>
                            <div className="bg-green-00 space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">Your Question</label>
                                <textarea id="message" rows={4}
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-700 focus:ring-2 focus:outline-none"
                                    placeholder="Leave a question ..."></textarea>
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Submit Question
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hidden md:block ">
                    {/* implement this to show an example of question letter to admin */}

                    <div>
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-tr from-blue-700 to-blue-600">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostNewMessage