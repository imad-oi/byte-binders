import { Link } from "react-router-dom"

const Footer = () => {
    const navMenu = [
        { id: 1, name: "Home", url: "/" },
        { id: 2, name: "About", url: "/about" },
        { id: 3, name: "Seach Book", url: "/search" },
        { id: 4, name: "Contact", url: "/contact" }
    ]
    return (

        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0">
                        <img src="./src/Images/Colorful.png" className="h-8 mr-3" alt="ByteBinder Logo" />
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        {
                            navMenu.map((item, index) => (
                                <li  key={index}>
                                    <Link to={item.url} className="mr-4 hover:underline md:mr-6 ">
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">ByteBinders™</a>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default Footer