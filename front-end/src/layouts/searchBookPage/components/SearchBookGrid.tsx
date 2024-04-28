import { Link } from "react-router-dom"

import BookModel from "../../../models/BookModel"

const SearchBookGrid: React.FC<{ book: BookModel }> = ({ book }) => {
  return (
    <div className="w-full p-4 ring-1 ring-gray-400 rounded-md shadow" >
      <div
        className="flex flex-col justify-center items-center
        w-full rounded-md ">

        <div className="w-2/3 sm:w-1/3">
          <img
            className="w-44 rounded-sm mx-auto"
            src={book.img} alt={book.title} />
        </div>

        <div className="w-full sm:w-2/3  flex flex-col items-start gap-2">
          <h3 className="text-sm text-gray-500 mt-2 sm:mt-0">
            {book.author}
          </h3>

          <p className="text-base font-bold text-gray-900">
            {book.title}
          </p>
          {/* <p className="max-w-3xl text-base hidden md:block font-medium text-slate-500">
            {book.description}
          </p> */}
          <p className="max-w-3xl text-base hidden md:block font-medium text-slate-500">
            {book.description?.slice(0,100)} ...
          </p>
          <Link
            to={`/checkout/${book.id}`}
            className="hover:bg-blue-800 items-center
             rounded-md mx-auto md:mx-0 bg-blue-700 
              text-white font-semibold mt-2 py-2 px-2 sm:px-16">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchBookGrid