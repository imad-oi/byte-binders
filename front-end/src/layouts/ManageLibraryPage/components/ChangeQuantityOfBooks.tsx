import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import SpinnerLoading from "../../utils/SpinnerLoading";
import AlertError from "../../utils/AlertError";
import Pagination from "../../utils/Pagination";
import ChangeQuantityOfBook from "./ChangeQuantityOfBook";

const ChangeQuantityOfBooks = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [toggle, setToggle] = useState<boolean>(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [booksPerPage] = useState<number>(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState<number>(0);


    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = `http://localhost:8888/api/books?page=${currentPage - 1}&size=${booksPerPage}`;


            const res = await fetch(baseUrl);

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
    }, [currentPage]);

    // Pagination
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    if (isLoading) return <SpinnerLoading />;
    if (error) return <AlertError error={error} />;

    return (
        <div className="mb-24">
            {
                books.length > 0 ? (
                    <div className="space-y-4">
                        {books.map((book, index) => (
                            <ChangeQuantityOfBook key={index} book={book} />
                        ))}
                    </div>
                )
                    :
                    <div>
                        <h1>No books found!</h1>
                    </div>}

            {totalPages > 1 && (
                <div className="flex justify-center my-4">
                    <Pagination
                        totalPages={totalPages}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    )
}

export default ChangeQuantityOfBooks