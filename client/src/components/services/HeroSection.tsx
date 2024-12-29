const HeroSection: React.FC = () => (
  <section
    className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url('images/heroImage.png')` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative z-10 text-center text-white px-4 animate__animated animate__fadeInDown">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Luxury Bus Rentals
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Experience comfort and style with our premium bus services.
      </p>
      <a
        href="#services"
        className="px-6 py-3 bg-[#C22A54] text-white rounded-full shadow-lg hover:bg-[#E53E3E] transition duration-300"
      >
        Explore Our Buses
      </a>
    </div>
  </section>
);

export { HeroSection };
