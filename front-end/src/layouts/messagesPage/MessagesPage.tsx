import { useState } from "react"
import PostNewMessage from "./components/PostNewMessage";
import Messages from "./components/Messages";

const MessagesPage = () => {

    const [messagesClick, setMessagesClick] = useState(false)

    const [activeTab, setActiveTab] = useState('submit question');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleMessagesClick = (name: string) => {
        if (name === 'q/a response/pending') {
            setMessagesClick(true);
        }
        else
            setMessagesClick(false);
    }


    const listMenu = [
        {
            id: 1,
            name: "Submit Question",
            active: true
        },
        {
            id: 2,
            name: "Q/A Response/Pending",
            active: false
        }
    ];

    return (
        <div className="p-4 md:p-7">
            <div className="md:mx-32">

                <div className="mb-4 border-b border-gray-200">
                    <ul className="flex md:flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                        {listMenu.map((item, i) => (
                            <li key={i} className="mr-2" role="presentation">
                                <button
                                    className={`
                                    inline-block p-2 md:p-4 rounded-t-md 
                                    ${item.name.toLocaleLowerCase() === activeTab ?
                                            'text-blue-600 bg-gray-100 ring-1 ' : 'border-transparent'
                                        }`}
                                    onClick={() => {
                                        handleMessagesClick(item.name.toLowerCase());
                                        handleTabClick(item.name.toLowerCase());
                                    }}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="myTabContent">

                    <div
                        className={`${activeTab === 'submit question' ? '' : 'hidden'
                            }`}
                    >
                        <PostNewMessage />
                    </div>
                    <div
                        className={`${activeTab === 'q/a response/pending' ? '' : 'hidden'
                            }`}
                    >
                        {
                            messagesClick ? <Messages /> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagesPage