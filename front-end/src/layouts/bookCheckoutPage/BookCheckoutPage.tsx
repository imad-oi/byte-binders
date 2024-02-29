import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import BookModel from "../../models/BookModel";
import ReviewModel from "../../models/ReviewModel";
import ReviewRequestModel from "../../models/ReviewRequestModel";
import LoadingSkelton from "../searchBookPage/components/LoadingSkelton";
import AlertError from "../utils/AlertError";
import StarsReview from "../utils/StarsReview";
import CheckoutAndReviewBox from "./components/CheckoutAndReviewBox";
import LatestReviews from "./components/LatestReviews";

const BookCheckoutPage = () => {

  // Auth State
  const { authState } = useOktaAuth();

  // Book State
  const [book, setBook] = useState<BookModel | null>(null);
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string | null>(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);

  const [isReviewLeft, setIsReviewLeft] = useState<boolean>(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState<boolean>(true);

  // Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState<number>(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState<Boolean>(true);

  // is book checked out state
  const [isBookCheckedOut, setIsBookCheckedOut] = useState<boolean>(false);
  const [isLoadingIsBookCheckedOut, setIsLoadingIsBookCheckedOut] = useState<boolean>(true);

  // extract book id from url 
  const bookId = useLocation().pathname.split("/")[2];

  // fetch books useEffect
  useEffect(() => {
    window.scroll(0, 0);
    const fetchBook = async () => {
      const baseUrl = `http://localhost:8888/api/books/${bookId}`;

      const res = await fetch(baseUrl);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const resJson = await res.json();

      setBook(resJson);
      setIsLoadingBook(false);
    };

    fetchBook().catch((err) => {
      setIsLoadingBook(false);
      setHttpError(err.message);
    });
  }, [isBookCheckedOut]);

  // fetch reviews useEffect
  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:8888/api/reviews/search/findByBookId?bookId=${bookId}`;
      const responseReviews = await fetch(reviewUrl);
      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }
      const responseReviewsJson = await responseReviews.json();
      const responseData = responseReviewsJson._embedded.reviews;
      let weightedStarReviews: number = 0;
      setReviews(responseData);

      for (const review of responseData) {
        weightedStarReviews += review.rating;
      }
      if (isLoadingReviews) {
        const round = (Math.round((weightedStarReviews / responseData.length) * 10) / 10).toFixed(1);
        setTotalStars(Number(round));
      }

      setIsLoadingReviews(false);
    }

    fetchBookReviews().catch((err) => {
      setIsLoadingReviews(false);
      setHttpError(err.message);
    });

  }, [isReviewLeft ]);

  // fetch current loans count useEffect
  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8888/api/books/secure/currentloans/count`;
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          }
        };
        const currentLoansCountresponse = await fetch(url, requestOptions);
        if (!currentLoansCountresponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentLoansCountresponseJson = await currentLoansCountresponse.json();
        setCurrentLoansCount(currentLoansCountresponseJson);
      }
      setIsLoadingCurrentLoansCount(false);

    }

    fetchUserCurrentLoansCount().catch((err: any) => {
      setIsLoadingCurrentLoansCount(false);
      setHttpError(err.message);
    });

  }, [authState, isBookCheckedOut]);

  // fetch is book checked out useEffect
  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8888/api/books/secure/ischeckedout/byuser?bookId=${bookId}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          }
        };
        const isBookCheckedOutResponse = await fetch(url, requestOptions);
        if (!isBookCheckedOutResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const isBookCheckedOutResponseJson = await isBookCheckedOutResponse.json();
        setIsBookCheckedOut(isBookCheckedOutResponseJson);
      }
      setIsLoadingIsBookCheckedOut(false);
    }

    fetchUserCheckedOutBook().catch((err: any) => {
      setIsLoadingIsBookCheckedOut(false);
      setHttpError(err.message);
    }
    );

  }, [authState]);

  // fetch is review left useEffect
  useEffect(() => {
    const fetchUserReviewBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8888/api/reviews/secure/user/book?bookId=${bookId}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          }
        };
        const isReviewLeftResponse = await fetch(url, requestOptions);
        if (!isReviewLeftResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const isReviewLeftResponseJson = await isReviewLeftResponse.json();
        console.log(isReviewLeftResponseJson);
        setIsReviewLeft(isReviewLeftResponseJson);
      }
      setIsLoadingUserReview(false);
    }

    fetchUserReviewBook().catch((err: any) => {
      setIsLoadingUserReview(false);
      setHttpError(err.message);
    });

  }, [isReviewLeft]);


  // Loading and Error Handling
  if (isLoadingBook ||
    isLoadingReviews ||
    isLoadingCurrentLoansCount ||
    isLoadingIsBookCheckedOut ||
    isLoadingUserReview) {
    return <LoadingSkelton />;
  }

  if (httpError) {
    return <AlertError error={httpError} />;
  }

  // Checkout and Review functions
  const checkoutBook = async () => {
    const url = `http://localhost:8888/api/books/secure/checkout?bookId=${bookId}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
      }
    };

    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsBookCheckedOut(true);
  }

  const submtiReview = async (starInput: number, reviewDescription: string) => {
    let bookId: number = 0;
    if (book?.id) {
      bookId = book.id;
    }

    const reviewRequestModel = new ReviewRequestModel(starInput, bookId, reviewDescription);
    const url = `http://localhost:8888/api/reviews/secure`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
      },
      body: JSON.stringify(reviewRequestModel)
    };

    const submitReviewResponse = await fetch(url, requestOptions);
    if (!submitReviewResponse.ok) {
      console.log(submitReviewResponse);
      throw new Error("Something went wrong!");
    }
    setIsReviewLeft(true);
  }


  return (
    <div className="p-9 w-full">
      <div className="md:px-6 bg-amber-00 flex flex-col items-start md:flex-row md:items-start md:justify-around w-full">
        <div
          className="md:gap-x-16 flex flex-col items-center md:flex-row md:justify-between md:items-start
              rounded-md">
          <img
            className="w-44 rounded-sm mx-auto"
            src={book?.img} alt={book?.title}
          />

          <div className="flex flex-col items-start gap-2">
            <h3 className="text-sm text-gray-500 mt-2 sm:mt-0">
              {book?.author}
            </h3>

            <p className="text-base font-bold text-gray-900">
              {book?.title}
            </p>
            <p className="max-w-xl text-base font-medium  text-slate-500">
              {book?.description}
            </p>
            <StarsReview rating={totalStars} size={24} />
          </div>
        </div>

        <CheckoutAndReviewBox
          book={book}
          currentLoansCount={currentLoansCount}
          isAuthenticated={authState?.isAuthenticated}
          isCheckedOut={isBookCheckedOut}
          checkoutBook={checkoutBook}
          isReviewLeft={isReviewLeft}
          submitReview={submtiReview}
        />
      </div>
      <LatestReviews reviews={reviews} bookId={bookId} />
    </div >
  )
}

export default BookCheckoutPage