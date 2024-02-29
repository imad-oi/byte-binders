import React from 'react'
import ReviewModel from '../../models/ReviewModel';
import StarsReview from './StarsReview';

const Review: React.FC<{ review: ReviewModel }> = ({ review }) => {
    const src = "https://img.freepik.com/free-photo/woman-portrait-with-blue-lights-visual-effects_23-2149419443.jpg?size=626&ext=jpg"

    const reviewDate = new Date(review.date);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const month = monthNames[reviewDate.getMonth()];
    const day = reviewDate.getDate();
    const year = reviewDate.getFullYear();

    // Create the formatted date stringd
    const formattedDate = `${month} ${day}, ${year}`;

    return (
        <div className="flex gap-4 py-4">
            <div>
                <img src={src} alt="img" className="rounded-full object-cover w-10 h-10" />
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold "> {review.userEmail} </h3>
                <p className="text-slate-500">
                    {formattedDate}
                </p>
                <div>
                    <StarsReview rating={review.rating} size={16} />
                    <p className="max-w-lg space-y-6 text-slate-500">
                        <i>
                            {review.reviewDescription}
                        </i>
                    </p>
                </div>
                <hr className="mt-8" />
            </div>
        </div>
    )
}

export default Review