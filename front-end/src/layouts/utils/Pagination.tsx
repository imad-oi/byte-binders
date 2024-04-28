import React from 'react'

type PaginationProps = {
    totalPages: number,
    paginate: any,
    currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, paginate, totalPages }) => {

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }


    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
                <li onClick={() => paginate(1)} >
                    <span
                        className="flex items-center justify-center px-4 h-10 ml-0 
                    leading-tight text-gray-500 bg-white border border-gray-300
                     rounded-l-lg hover:bg-gray-100 hover:text-gray-700
                     ">
                        First Page
                    </span>
                </li>
                {
                    pageNumbers.map((number) => (
                        <li key={number} onClick={() => paginate(number)}>
                            <span className={`flex  items-center justify-center px-4 h-10 leading-tight hover:cursor-pointer  ${currentPage === number ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                } `}>{number}</span>
                        </li>
                    ))
                }
                <li onClick={() => paginate(totalPages)} >
                    <span
                        className="flex items-center justify-center px-4 h-10 leading-tight
                      text-gray-500 bg-white border border-gray-300 rounded-r-lg
                      hover:bg-gray-100 hover:text-gray-700
                    ">
                        Last Page
                    </span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination