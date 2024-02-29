
const AlertError: React.FC<{ error: any }> = ({ error }) => {
    return (
        <div className="bg-red-400 rounded-md text-center text-white font-bold p-4 my-6 mx-auto w-1/2">
            <p >
                <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 7v4m0 4h0m0-8a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    <span
                        className="px-4 text-yellow-600">
                        {error}
                    </span>
                </button>

            </p>
        </div>
    )
}

export default AlertError