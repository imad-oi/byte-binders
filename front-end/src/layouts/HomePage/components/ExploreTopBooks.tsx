import { Link } from "react-router-dom"

const ExploreTopBooks = () => {
    return (
        <div className="flex items-center w-full h-96 hero md:rounded-lg md:px-8 md:mt-10 ">
            <div className="flex flex-col items-start gap-y-3 ms-10">
                <h1 className="max-w-sm lg:max-w-md text-4xl lg:text-6xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
                    Find your <span className="text-blue-500">next</span> adventure
                </h1>
                <p className="text-xl text-black">
                    where would you like to go next?
                </p>
                <Link to="/search" className="hover:bg-blue-400 items-center rounded-md bg-blue-500 text-white text-sm font p-2">
                    Explore top books
                </Link>
            </div>
        </div>
    )
}

export default ExploreTopBooks