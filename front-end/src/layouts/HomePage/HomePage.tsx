import InCarousel from "./components/Carousel"
import ExploreTopBooks from "./components/ExploreTopBooks"
import Heros from "./components/Heros"
import LibraryServices from "./components/LibraryServices"

const HomePage = () => {
    return (
        <>
            <div className="md:px-7">
                <ExploreTopBooks />
            </div>
            <InCarousel />
            <Heros />
            <hr className="mt-2 w-1/2 mx-auto block " />
            <LibraryServices />
        </>
    )
}

export default HomePage