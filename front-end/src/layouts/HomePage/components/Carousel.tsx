import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BookModel from "../../../models/BookModel";
import AlertError from "../../utils/AlertError";
import SpinnerLoading from "../../utils/SpinnerLoading";
import CarouselCard from "./CarouselCard"

// import Carousel2 from "../../components/Carousel";


export const CarouselData = [
    {
        image:
            "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        image:
            "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
    },
    {
        image:
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
    {
        image:
            "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
    },
    {
        image:
            "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
];

const BooksCarousel = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // carousel :
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Function to handle hover and pause the carousel
    const handleHover = () => {
        setIsPaused(true);
    };

    // Function to handle mouse leave and resume the carousel
    const handleMouseLeave = () => {
        setIsPaused(false);
    };
    // Automatically advance the carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % books.length);
            }
        }, 3000); // Change the duration as needed

        return () => clearInterval(interval);
    }, [isPaused, books.length]);



    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = "http://localhost:8888/api/books";
            const url: string = `${baseUrl}`;

            const res = await fetch(url);

            const data = await res.json();

            if (!res.ok) {
                throw new Error("Something went wrong!");
            }

            setBooks(data._embedded.books);
            setIsLoading(false);
        };

        fetchBooks().catch((err) => {
            setError(err.message);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="p-10">
                <SpinnerLoading />
            </div>
        )
    }

    if (error) {
        return <AlertError error={error} />;
    }


    return (
        //  desktop
        <>
            <div className="py-10 flex flex-col">
                <div className="flex flex-col items-center gap-y-3 pt-2 pb-6">
                    <h2 className="font-extrabold text-3xl tracking-tight
                     text-slate-900 sm:text-4xl text-center">Simplify everyday business tasks</h2>
                    <p className="max-w-xl lg:max-w-3xl text-center mt-4 text-lg tracking-tight text-slate-700">
                        <span>
                            Because you’d probably be a little confused if we suggested you complicate your everyday business tasks instead.
                        </span>
                    </p>
                </div>

                <div className="wrapper py-4" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
                    <div className="slider">
                        <div className="slide-track space-x-20 flex">
                            {books.map((book, i) => (
                                <CarouselCard key={i} book={book} />
                            ))}
                        </div>

                    </div>
                </div>
                <div className="flex justify-center py-3 mt-1">
                    <div>
                        <Link to="/search" className="btn-primary py-2 px-3"  >
                            Explore more
                        </Link>
                    </div>
                </div>
            </div>
            {/* <Carousel2/> */}
        </>

        // mobile
        // TODO : make this responsive

    )
}

export default BooksCarousel