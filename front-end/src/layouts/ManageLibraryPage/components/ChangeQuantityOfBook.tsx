import { useOktaAuth } from "@okta/okta-react"
import axios from "axios"
import { useEffect, useState } from "react"

import BookModel from "../../../models/BookModel"

type ChangeQuantityOfBookProps = {
    book: BookModel
}

const ChangeQuantityOfBook: React.FC<ChangeQuantityOfBookProps> = ({ book }) => {

    const { authState } = useOktaAuth();

    const [quantity, setQuantity] = useState<number>(0)
    const [remaining, setRemaining] = useState<number>(0)


    useEffect(() => {
        const fetchBookInState = async () => {
            book.copies ? setQuantity(book.copies) : setQuantity(0);
            book.copiesAvailable ? setRemaining(book.copiesAvailable) : setRemaining(0);
        }
        fetchBookInState();
    }, [])

    const increaseQuantity = async () => {
        const url = `http://localhost:8888/api/admin/secure/increase/book/quantity?bookId=${book?.id}`;
        if (authState?.isAuthenticated && book.id !== undefined) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                }
            };
            try {
                const response = await axios.put(url, null, config);
                if (response.status === 200) {
                    setQuantity(quantity + 1);
                    setRemaining(remaining + 1);
                } else {
                    console.error('Increase quantity failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error while increasing quantity:', error);
            }
        }
    };

    const decreaseQuantity = async () => {
        const url = `http://localhost:8888/api/admin/secure/decrease/quantity?bookId=${book?.id}`;
        if (authState?.isAuthenticated) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                }
            };
            try {
                const response = await axios.put(url, null, config);
                if (response.status === 200) {
                    setQuantity(quantity - 1);
                    setRemaining(remaining - 1);
                } else {
                    console.error('Decrease quantity failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error while decreasing quantity:', error);
            }
        }
    };

    const deleteBook = async () => {
        const url = `http://localhost:8888/api/admin/secure/delete/book?bookId=${book?.id}`;
        if (authState?.isAuthenticated) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                }
            };
            try {
                const response = await axios.delete(url, config);
                if (response.status === 200) {
                    alert("Book deleted successfully");
                    window.location.reload();
                } else {
                    console.error('Delete book failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error while deleting book:', error);
            }
        }
    };



    return (
        <div className="flex flex-col gap-y-6 md:flex-row justify-between md:me-16 py-4 border-b-2 ">
            <div className="flex flex-row  md:justify-start gap-4">
                <div className="flex justify-center">
                    <img src={book.img} width={120} height={87} alt="book"
                        className="rounded-md hover:opacity-80 transition duration-75"
                    />
                </div>
                <div className="flex flex-col items-start md:items-start  justify-between">
                    <div>
                        <h1 className="text-slate-500 text-sm">{book.author}</h1>
                        <h1 className="font-semibold text-slate-700 text-sm md:text-md">{book.title}</h1>
                        <h1 className="text-slate-500 text-sm md:text-md"> {"Category : " + book?.category}</h1>
                    </div>
                    <div>
                        <h1 className="font-semibold text-slate-700">{"Total Quantity : " + quantity}</h1>
                        <h1 className="font-semibold text-slate-700">{"Books Remaining : " + remaining}</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-4">
                <span>
                    <button
                        onClick={increaseQuantity}
                        className="bg-gray-100 w-80 md:w-56 text-sm rounded-md p-2.5 text-slate-700 font-semibold -tracking-tighter hover:bg-slate-200 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400">Add Quantity</button>
                </span>
                <span>
                    <button
                        onClick={decreaseQuantity}
                        className="bg-gray-100 w-80 md:w-56 text-sm rounded-md p-2.5 text-slate-700 font-semibold -tracking-tighter hover:bg-slate-200 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400">Decrease Quantity</button>
                </span>
                <span>
                    <button
                        onClick={deleteBook}
                        className="rounded-md p-2 ring-1 ring-red-200 w-80 md:w-56 text-md text-red-600 bg-red-50 hover:bg-red-100 focus:ring-2">Delete</button>
                </span>
            </div>
        </div>
    )
}

export default ChangeQuantityOfBook