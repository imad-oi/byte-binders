import BookModel from "../../../models/BookModel";

const image2 = "./src/Images/BooksImages/new-book-1.png";

const CarouselCard: React.FunctionComponent<{ book: BookModel }> = ({ book }) => {
    return (
        <div className={` flex flex-col items-center rounded-md hover:cursor-pointer mb-4 `}>
            <div className="inline-block w-52">
                {
                    book.img ?
                        <img
                            src={book.img}
                            alt={book.title}
                            className="rounded-md w-52 h-80 object-cover transition-transform transform-gpu hover:scale-105"
                            loading="lazy" /> :
                        <img
                            src={image2}
                            className="rounded-md w-52 h-80 object-cover transition-transform transform-gpu hover:scale-105"
                            loading="lazy"
                            alt="image"
                        />
                }
            </div>
            <div className="pt-2">
                <p className="text-sm font-semibold">
                    {book.title}
                </p>
                <p className="text-sm ">{book.author} </p>
            </div>
            <div className="py-3">
                {/* <div className="">
                    <Link to={`/checkout/${book.id}`} className="btn-secondary">
                        Review
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

export default CarouselCard
