import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiGridVertical } from "react-icons/bi";
import { TbFaceIdError } from "react-icons/tb";
import BookModel from "../../models/BookModel";
import Pagination from "../utils/Pagination";
import LoadingSkelton from "./components/LoadingSkelton";
import SearchBook from "./components/SearchBook";
import SearchBookGrid from "./components/SearchBookGrid";

const SearchBookPage = () => {

    // Books
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [toggle, setToggle] = useState<boolean>(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [booksPerPage] = useState<number>(6);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState<number>(0);

    // Search
    const [search, setSearch] = useState<string>("");
    const [searchUrl, setSearchUrl] = useState<string>("");
    const [CategorySelection, setCategorySelection] = useState<string>("book category");

    const categories = [
        { id: 0, name: "All", value: "all" },
        { id: 1, name: "Front-end", value: "fe" },
        { id: 2, name: "Back-end", value: "be" },
        { id: 3, name: "DevOps", value: "devops" },
        { id: 4, name: "Data", value: "data" },
    ];

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = "http://localhost:8888/api/books";

            let url: string = '';

            if (searchUrl === "") {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            } else {
                url = baseUrl + searchUrl;
            }

            const res = await fetch(url);

            const resJson = await res.json();

            if (!res.ok) {
                throw new Error("Something went wrong!");
            }

            setTotalAmountOfBooks(resJson.page.totalElements);
            setTotalPages(resJson.page.totalPages);

            setBooks(resJson._embedded.books);
            setIsLoading(false);
        };

        fetchBooks().catch((err) => {
            setIsLoading(false);
            setError(err.message);
        });
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

    const searchHandleChange = (e: any) => {
        e.preventDefault();
        if (search === "") {
            setSearchUrl("");
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`);
        }
    }

    const categoryField = (value: string) => {
        value = value.toLowerCase();
        if (value === "devops" ||
            value === "fe" ||
            value === "be" ||
            value === "data") {

            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=0&size=${booksPerPage}`);
        }
        else {
            setCategorySelection("All");
            setSearchUrl(`?page=0&size=${booksPerPage}`);
        }
        setToggle(false);
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    // if (error) {
    //     return <div className="min-h-screen flex justify-center items-center">
    //         <AlertError error={error} />
    //     </div>
    // }

    return (
        <div className="min-h-screen p-4 lg:px-32  mt-24">
            <div className="px-8">
                <div className="flex flex-col justify-between items-center gap-y-2 md:flex-row md:items-center md:justify-start gap-x-3 w-full">
                    <form className="w-full md:w-2/5">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                onChange={e => setSearch(e.target.value)}
                                type="search"
                                id="default-search"
                                className="block w-full p-4 pl-10 text-sm text-slate-600 border
                              border-gray-300 rounded-lg
                              bg-gray-50 outline-none focus:ring-2
                              focus:ring-blue-700  "
                                placeholder="Search book ..." />
                            <button
                                onClick={(e) => searchHandleChange(e)}
                                type="submit"
                                className="text-white absolute right-2.5 bottom-2.5
                                 bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                                 text-sm px-4 py-2 ">Search</button>
                        </div>
                    </form>
                    <div id="dropdownmeu" className="relative">
                        <button
                            onClick={() => setToggle((prev) => !prev)}
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                        px-5 py-2.5 text-center inline-flex items-center " type="button">
                            {CategorySelection}
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div id="dropdown"
                            className={`z-10 ${!toggle && "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
                            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                                {
                                    categories.map((item, i) => (
                                        <li key={i} onClick={() => categoryField(item.value)}>
                                            <span
                                                className="block mx-1 rounded-md font-bold px-4 py-2 hover:bg-slate-300 "> {item.name}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                    </div>

                </div>
                {
                    isLoading ?
                        <LoadingSkelton />
                        :
                        totalAmountOfBooks ?
                         
                            <>
                                <div className="flex flex-col items-start py-3">
                                    <p className="text-base font-bold text-slate-700">Number of results : ({totalAmountOfBooks})</p>
                                    {/* <p className="text-base font- text-slate-600"> {`${indexOfFirstBook + 1} to ${indexOfLastBook} of ${totalAmountOfBooks} items :`} </p> */}
                                </div>
                                <Tabs
                                    value="list">
                                    <TabsHeader >
                                        <Tab
                                            className="flex items-center  justify-center z-0"
                                            value="list">
                                            <ListBulletIcon className="inline-block h-5 w-5" />
                                        </Tab>
                                        <Tab
                                            className="flex items-center  justify-center z-0"
                                            value="grid">
                                            <BiGridVertical className="inline-block h-5 w-5" />
                                        </Tab>

                                    </TabsHeader>
                                    <TabsBody>
                                        <TabPanel value="list">
                                            <div className="flex flex-col space-y-3 ">
                                                {
                                                    books.map((book, i) => (
                                                        <SearchBook key={i} book={book} />
                                                    ))}
                                            </div>
                                        </TabPanel>
                                        <TabPanel value="grid">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                                {
                                                    books.map((book, i) => (
                                                        <SearchBookGrid key={i} book={book} />
                                                    ))}
                                            </div>
                                        </TabPanel>
                                    </TabsBody>
                                </Tabs>
                                {/* <div className="flex flex-col space-y-3 ">
                                    {
                                        books.map((book, i) => (
                                            <SearchBook key={i} book={book} />
                                        ))}
                                </div> */}
                            </>
                            :
                            <div className="p-4 flex flex-col justify-center items-center h-96">
                                <div className="flex items-center space-x-3">
                                    <span>
                                        <TbFaceIdError className="w-12 h-12 text-sky-700" />
                                    </span>
                                    <p className=" text-xl font-bold text-sky-700">
                                        No results found
                                    </p>
                                </div>
                                <div className="flex flex-col items-center">
                                    {/* <h3>Can't find what you are looking for ?</h3> */}
                                    {/* <a href="#" className=""></a> */}
                                    <a className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 focus:ring-sky-600  mt-8"
                                        href="#">Check Library Services<span className="sr-only">, reusing styles</span><svg className="overflow-visible ml-3 text-sky-300 group-hover:text-sky-400 " width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M0 0L3 3L0 6"></path></svg></a>

                                </div>
                            </div>
                }
                {
                    totalPages > 1 && (
                        <div className="flex justify-center mt-4">
                            <Pagination
                                paginate={paginate}
                                totalPages={totalPages}
                                currentPage={currentPage} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchBookPage