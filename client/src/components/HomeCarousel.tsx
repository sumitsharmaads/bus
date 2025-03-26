import Slider from "react-slick";

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

export const HomeCarousel = () => {
  return (
    <section className="py-10 bg-white max-w-5xl mx-auto px-2">
      <h2 className="text-3xl font-bold font-['Volkhov']">
        Pick Your Comfort: AC and Non-AC Bus Rides
      </h2>
      <Slider {...settings}>
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img
            src="images/public/carosuel/4917fc749ad51cfdf08f86aa6fc0a0f9.jpg"
            alt="Luxury Bus"
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img
            src="images/public/carosuel/dc86d586f2471430f899b6694f037b33.jpg"
            alt="Luxury Bus"
            className="w-full h-96 object-cover"
          />
        </div>
      </Slider>
    </section>
  );
};
