import { Component } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CarouselData = [
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
interface CarouselState {
  currentSlide: number;
  paused: boolean;
}

class Carousel2 extends Component<{}, CarouselState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (!this.state.paused) {
        let newSlide =
          this.state.currentSlide === CarouselData.length - 1
            ? 0
            : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
      }
    }, 3000);
  }

  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === CarouselData.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };

  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? CarouselData.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  setCurrentSlide = (index: number) => {
    this.setState({ currentSlide: index });
  };

  render() {
    return (
      <div className="mt-8">
        <div className="max-w-lg h-72 flex overflow-hidden relative">
          <AiOutlineLeft
            onClick={this.prevSlide}
            className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
          />

          <Swipe
            onSwipeLeft={this.nextSlide}
            onSwipeRight={this.prevSlide}
          >
            {CarouselData.map((slide:any, index:number) => (
              <img
                src={slide.image}
                alt="This is a carousel slide"
                key={index}
                className={
                  index === this.state.currentSlide
                    ? "block w-full h-auto object-cover"
                    : "hidden"
                }
                onMouseEnter={() => {
                  this.setState({ paused: true });
                }}
                onMouseLeave={() => {
                  this.setState({ paused: false });
                }}
              />
            ))}
          </Swipe>

          <div className="absolute w-full flex justify-center bottom-0">
            {CarouselData.map((_,index:number) => (
              <div
                className={
                  index === this.state.currentSlide
                    ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                    : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                }
                key={index}
                onClick={() => {
                  this.setCurrentSlide(index);
                }}
              ></div>
            ))}
          </div>

          <AiOutlineRight
            onClick={this.nextSlide}
            className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
          />
        </div>
      </div>
    );
  }
}

export default Carousel2;
