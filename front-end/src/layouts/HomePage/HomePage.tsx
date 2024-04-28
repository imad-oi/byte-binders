import BooksCarousel from "./components/Carousel"
import ZigZag from "./components/ZigZag"
import LibraryServices from "./components/LibraryServices"
import MainHero from "./components/MainHero"

const HomePage = () => {
    return (
        <div className="mx-auto ">
            {/* <ExploreTopBooks /> */}
            <MainHero />
            <BooksCarousel />
            <ZigZag />
            <hr className="mt-2 w-1/2 mx-auto block " />
            <LibraryServices />
        </div>
    )
}

export default HomePage