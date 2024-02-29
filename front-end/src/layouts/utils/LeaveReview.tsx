import { useState } from "react";
import StarsReview from "./StarsReview";

const starsNumbers = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const LeaveReview: React.FC<{ submitReview: any }> = ({ submitReview }) => {

    const [starInput, setStarInput] = useState<number>(0);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    const [displayInput, setDisplayInput] = useState<boolean>(false);
    const [reviewDescription, setReviewDescription] = useState<string>("");

    const starValue = (value: number) => {
        setStarInput(value);
        setDisplayInput(true);
    }

    return (
        <div className="relative" >
            <button
                onClick={() => setToggleDropdown(!toggleDropdown)}
                id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                className="text-white bg-gray-600 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center" type="button">
                Leave review ?
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            <div id="dropdown"
                className={`absolute z-10 ${!toggleDropdown && "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-28`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {
                        starsNumbers.map((starNumber, index) => (
                            <li key={index} className="mx-1 ">
                                <button
                                    className=" py-1 font-semibold mx-auto w-full px-4 hover:bg-blue-700 hover:text-white rounded-md"
                                    onClick={() => { starValue(starNumber); setToggleDropdown(false) }}>
                                    {starNumber} star</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <StarsReview rating={starInput} size={24} />
            {
                displayInput &&
                <form className="space-y-2" onSubmit={(e: any) => {
                    e.preventDefault();
                    submitReview(starInput, reviewDescription)
                }
                }>
                    <hr />
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Review</label>
                        <textarea
                            onChange={(e) => setReviewDescription(e.target.value)}
                            id="message"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900
                     bg-gray-50 rounded-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500
                      " placeholder="Leave a review..." />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit"
                            className="bg-green-700 text-white p-2 rounded-md text-sm
                            hover:bg-green-800 font-semibold">Submit Review</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default LeaveReview