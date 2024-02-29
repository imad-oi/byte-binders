import { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import ReviewModel from "../../../models/ReviewModel";
import Review from "../../utils/Review";
import StarsReview from "../../utils/StarsReview";
import Pagination from "../../utils/Pagination";
import Breadcrumbs from "../../utils/Breadcrumbs";
import { useLocation } from "react-router-dom";

const ReviewListPage = () => {
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [httpError, setHttpError] = useState<string | null>(null);

    // pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [reviewsPerPage] = useState<number>(5);
    const [totalAmountReviews, setTotalAmountReviews] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const bookId = useLocation().pathname.split("/")[2];
    // const bookId = 1;

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8888/api/reviews/search/findByBookId?bookId=${bookId}&page=${currentPage - 1}&size=${reviewsPerPage}`;
            const responseReviews = await fetch(reviewUrl);
            if (!responseReviews.ok) {
                console.log(responseReviews);
                throw new Error("Something went wrong!");
            }
            const responseReviewsJson = await responseReviews.json();
            const responseData = responseReviewsJson._embedded.reviews;

            setReviews(responseData);
            setTotalAmountReviews(responseReviewsJson.page.totalElements);
            setTotalPages(responseReviewsJson.page.totalPages);

            setIsLoading(false);
        }

        fetchBookReviews().catch((err) => {
            setIsLoading(false);
            setHttpError(err.message);
        });

    }, [currentPage]);



    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section>
                <p>{httpError}</p>
            </section>
        )
    }
    const indexOfLastReview: number = currentPage * reviewsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

    let lastItem = (reviewsPerPage * currentPage <= totalAmountReviews) ? (reviewsPerPage * currentPage) : totalAmountReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 md:p-7 md:px-32">

            <Breadcrumbs itemsList={["Home", "Books", "Book Title"]} />

            <div className="flex flex-col md:flex-row md:justify-start md:items-start gap-16 pt-4 ">
                <div id="BasedCustomerReviews" className="px-4">
                    <h1 className="text-slate-700 text-xl md:text-2xl font-bold ">Customer Reviews</h1>
                    <div className="flex items-center gap-2">
                        <StarsReview rating={4.5} size={16} />
                        <p className="text-slate-500">
                            Based on {totalAmountReviews} customer reviews
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 pe-8 ">
                        <div className="flex items-center gap-6">
                            5<BiSolidStar size={24} className="text-yellow-500" />
                            <div className="w-full bg-gray-200 rounded-full h-3 ">
                                <div className="bg-yellow-500 h-3 rounded-full w-[75%]"></div>
                            </div>
                            <p>43%</p>
                        </div>
                        <div className="flex items-center gap-6">
                            4 <BiSolidStar size={24} className="text-yellow-500" />
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-yellow-500 h-3 rounded-full w-[25%]"></div>
                            </div>
                            <p>43%</p>
                        </div>
                        <div className="flex items-center gap-6">
                            4 <BiSolidStar size={24} className="text-yellow-500" />
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-yellow-500 h-3 rounded-full w-[25%]"></div>
                            </div>
                            <p>43%</p>
                        </div>
                        <div className="flex items-center gap-6">
                            4 <BiSolidStar size={24} className="text-yellow-500" />
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-yellow-500 h-3 rounded-full w-[25%]"></div>
                            </div>
                            <p>43%</p>
                        </div>
                        <div className="flex items-center gap-6">
                            4 <BiSolidStar size={24} className="text-yellow-500" />
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-yellow-500 h-3 rounded-full w-[25%]"></div>
                            </div>
                            <p>43%</p>
                        </div>

                    </div>
                    <div className="my-8">
                        <p className="text-slate-700 font-semibold text-lg py-1">Share your thoughts</p>
                        <p className="text-slate-600">If you’ve used this product, share your thoughts with other customers</p>
                        <button className=" ring-1 ring-slate-400 text-slate-700 text-sm px-4 py-2 my-6 rounded-md hover:bg-slate-100">Write a customer review</button>
                    </div>
                </div>

                <div id="DescCustomersReviews" className="flex-1">
                    {
                        reviews.length > 0 ?
                            reviews.map((review, i: number) => (
                                <Review key={i} review={review} />
                            ))
                            :
                            <div className="w-full bg-slate-30 py-4">
                                <p className="text-slate-500 text-end">No reviews yet</p>
                            </div>
                    }
                    {totalPages > 1 &&
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            pagiante={paginate}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ReviewListPage