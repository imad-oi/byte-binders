import { Link } from "react-router-dom";
import ReviewModel from "../../../models/ReviewModel";
import Review from "../../utils/Review";

type LatestReviewsProps = {
  reviews: ReviewModel[],
  bookId: string
}

const LatestReviews: React.FC<LatestReviewsProps> = ({ reviews, bookId }) => {
  return (
    <div className="md:px-20 py-2 bg-green-00 rounded-sm">
      <div className="flex flex-col items-start">
        <div className="space-y-2 pb-4">
          <h2 className="text-slate-700 ">Customer Reviews</h2>
          <hr className="border-t-2 border-slate-700 w-32" />
        </div>
        <div>
          {
            reviews.length > 0 ?
              reviews.map((review, i: number) => (
                <>
                  <Review key={i} review={review} />
                </>
              ))
              :
              <div className="w-full bg-slate-30 py-4">
                <p className="text-slate-500 text-end">No reviews yet</p>
              </div>
          }
        </div>
        {
          reviews.length > 0 &&
          <div className="py-4 ps-4 mx-auto md:mx-0">
            <Link to={`/reviewlist/${bookId}`}
              className="bg-green-700 text-white p-2 md:p-4 rounded-sm
             hover:bg-green-800 font-semibold">
              See all customer reviews
            </Link>
          </div>
        }
      </div>
    </div >
  )
}

export default LatestReviews