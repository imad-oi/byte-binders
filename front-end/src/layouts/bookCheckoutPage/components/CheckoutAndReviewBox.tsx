import { Link } from "react-router-dom"

import BookModel from "../../../models/BookModel"
import LeaveReview from "../../utils/LeaveReview"

type checkoutAndReviewBoxProps = {
  book: BookModel | null,
  currentLoansCount: number,
  isCheckedOut: boolean,
  isAuthenticated: boolean | undefined,
  checkoutBook: any,
  isReviewLeft: boolean,
  submitReview: any
}

const CheckoutAndReviewBox: React.FC<checkoutAndReviewBoxProps> = (
  { book,
    currentLoansCount,
    isCheckedOut,
    isAuthenticated,
    checkoutBook,
    isReviewLeft,
    submitReview }) => {


  const buttonRender = () => {
    if (isAuthenticated) {
      if (!isCheckedOut && currentLoansCount < 5) {
        return <button onClick={() => checkoutBook()} className="btn-green">Checkout</button>
      } else if (isCheckedOut) {
        return <p><b>Book checked out. Enjoy!</b></p>
      } else if (!isCheckedOut) {
        return <p className="text-red-500 font-bold">Too many books checked out!</p>
      }
    }
    return (
      <Link
        to="/login"
        className="btn-green">
        Sign In
      </Link>
    )
  }

  const reviewRender = () => {
    if (isAuthenticated && !isReviewLeft) {
      return  <LeaveReview submitReview={submitReview} />
    } else if (isAuthenticated && isReviewLeft) {
      return <p><b>Thank you for you review !</b></p>
    }
    return <div>Sign in to leave a review.</div>
  };

  return (
    <div className="ring-1 ring-slate-400 mt-6 md:mt-0 w-full rounded-sm md:w-80">
      <div className="m-4 flex flex-col gap-y-2">
        <p className="font-semibold"> {currentLoansCount}/5 books checked out</p>
        <hr />
        {
          book && book.copiesAvailable && book?.copiesAvailable > 0 ?
            <h4 className="text-green-700 text-xl font-bold">
              Available
            </h4>
            :
            <h4 className="text-red-700 text-xl font-bold">
              Wait list
            </h4>
        }
        <div className="flex gap-x-20 font-semibold">
          <span> {book?.copies} copies</span>
          <span>{book?.copiesAvailable} available</span>
        </div>
        <div className="my-4">
          {buttonRender()}
        </div>
        <hr />
        <div className="flex flex-col gap-y-4 mt-2 text-start">
          <p className="">
            This number can change until placing order has been completed.
          </p>
          <div>
            {reviewRender()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutAndReviewBox 