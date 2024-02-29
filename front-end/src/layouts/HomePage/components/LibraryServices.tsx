import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

const src = "https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_640.png";

const LibraryServices = () => {
    const { authState } = useOktaAuth();
    return (
        <div className="flex lg:justify-center lg:items-center w-full py-10">
            <div className="w-full lg:w-2/3 mx-2 flex flex-col-reverse items-center lg:flex-row lg:justify-around lg:items-center p-4 shadow-2xl rounded-md ">
                <div className="flex flex-col items-center lg:items-start">
                    <p className="mt-4 max-w-sm text-2xl lg:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">Can't find what you are looking for ?</p>
                    <p className="mt-4 max-w-sm lg:max-w-md space-y-6">you've got a single source of truth so you can make changes in one place.</p>
                    <Link className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 focus:ring-sky-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8"
                        to={authState?.isAuthenticated ? "/messages" : "/login"}>
                        {authState?.isAuthenticated ? "Library Services" : "Sign up"}
                        <span className="sr-only">, reusing styles</span>
                        <svg className="overflow-visible ml-3 text-sky-300 group-hover:text-sky-400 dark:text-slate-500 dark:group-hover:text-slate-400" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M0 0L3 3L0 6"></path></svg>
                    </Link>
                </div>
                <div>
                    <img
                        className="h-60 rounded-lg w-96 lg:w-60 object-cover"
                        src={src}
                        loading="lazy" alt="image"
                        width={384}
                        height={512}
                    />
                </div>
            </div>
        </div>
    )
}

export default LibraryServices