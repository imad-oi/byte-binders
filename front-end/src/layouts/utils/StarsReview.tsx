import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";

const StarsReview: React.FunctionComponent<{ rating: number, size: number }> = (
  { rating, size }
) => {

  let fullStars = 0;
  let halfStars = 0;
  let emptyStars = 0;

  if (rating !== undefined && rating > 0 && rating <= 5) {
    for (let i = 0; i <= 4; i++) {
      if (rating - 1 >= 0) {
        fullStars++
        rating--;
      } else if (rating === .5) {
        halfStars++
        rating = rating - .5;
      } else if (rating === 0) {
        emptyStars++;
      }
      else {
        break;
      }
    }
  } else {
    emptyStars = 5;
  }



  return (
    <div className="py-4 flex ">
      {Array.from({ length: fullStars }, (_, i) => (
        <BiSolidStar key={i} size={size} className="text-yellow-500" />
      ))}
      {Array.from({ length: halfStars}, (_, i) => (
        <BiSolidStarHalf key={i} size={size} className="text-yellow-500" />
      ))}
      {Array.from({ length: emptyStars }, (_, i) => (
        <BiStar key={i} size={size} className="text-yellow-500" />
      ))}


    </div>
  )
}

export default StarsReview