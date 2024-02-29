import { useState } from 'react';
import HistoryPage from './components/HistoryPage';
import Loans from './components/Loans';

const ShelfPage = () => {
    const [historyClick, setHistoryClick] = useState(false);
    const [activeTab, setActiveTab] = useState('current loans');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleHistoryClick = (name: string) => {
        if (name === 'history') {
            setHistoryClick(true);
        }
        else
            setHistoryClick(false);
    }


    const listMenu = [
        {
            id: 1,
            name: "Current Loans",
            active: true
        },
        {
            id: 2,
            name: "History",
            active: false
        }
    ];

    return (
        <div className="p-4 md:p-7">
            <div className="md:mx-32">

                <div className="mb-4 border-b border-gray-200">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center ">
                        {listMenu.map((item, i) => (
                            <li key={i} className="mr-2" role="presentation">
                                <button
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${item.name.toLocaleLowerCase() === activeTab ? 'border-blue-700' : 'border-transparent'
                                        }`}
                                    onClick={() => {
                                        handleHistoryClick(item.name.toLowerCase());
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
                        className={`${activeTab === 'current loans' ? '' : 'hidden'
                            }`}
                    >
                        <Loans />
                    </div>
                    <div
                        className={`${activeTab === 'history' ? '' : 'hidden'
                            }`}
                    >
                        {
                            historyClick ? <HistoryPage /> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShelfPage;
