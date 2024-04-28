import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

const ZigZag: React.FunctionComponent = () => {
    const image1 = "https://cdn.pixabay.com/photo/2016/11/22/19/25/adult-1850177_640.jpg"
    const image2 = "https://cdn.pixabay.com/photo/2016/03/27/18/31/book-1283468_640.jpg";

    const { authState } = useOktaAuth();

    return (
        <div className="">
            <div className="pb-4 mx-4 md:mx-20">

                <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-around py-3">
                    <div className="">
                        <img src={image1} alt="image1"
                            loading="lazy"
                            width={500}
                            height={500}
                            className="rounded-md h-80 object-cover " />
                    </div>
                    <div className=" flex flex-col items-start gap-y-2">
                        <p className="mt-4 max-w-sm lg:max-w-lg text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight">What have you been reading ?</p>
                        <p className="mt-4 max-w-md space-y-6 ">If you're repeating the same utilities over and over and over again, all you have to do is extract them into a component or template partial and boom — you've got a single source of truth so you can make changes in one place.</p>
                        <Link className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 focus:ring-sky-600 "
                            to={authState?.isAuthenticated ? "/search" : "/login"}>
                            {authState?.isAuthenticated ? "Explore top books" : "Sign up"}
                            <span className="sr-only">, reusing styles</span>
                            <svg className="overflow-visible ml-3 text-sky-300 group-hover:text-sky-400 " width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M0 0L3 3L0 6"></path></svg>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center lg:flex-row-reverse lg:items-center lg:justify-around py-3">
                    <div className="">
                        <img src={image2} alt="image1"
                            loading="lazy"
                            width={500}
                            height={500}
                            className="rounded-md h-80 object-cover " />
                    </div>
                    <div className=" flex flex-col items-start gap-y-2">
                        <p className="mt-4 max-w-sm lg:max-w-xl text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight ">Our collection is always changing</p>
                        <p className="mt-4 max-w-md space-y-6 ">If you're repeating the same utilities over and over and over again, all you have to do is extract them into a component or template partial and boom — you've got a single source of truth so you can make changes in one place.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ZigZag