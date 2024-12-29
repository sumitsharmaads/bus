import { BookBusCard, HeroSection, ServiceBox } from "../components/services";

const Services: React.FC = () => {
  return (
    <section>
      <HeroSection />
      <div className="container mx-auto p-6">
        <BookBusCard />
        {/* <ServiceTab /> */}
        <div className="flex flex-col md:flex-row md:space-x-8 mt-4">
          {/* left section */}
          <div className="md:w-1/2  p-6 rounded-lg">
            <h2 className="font-volkhov text-lg md:text-xl mb-2">
              Dadhich Bus Services: Your Trusted Partner for Premium Bus Rentals
            </h2>
            <p className="text-pretty font-poppins text-zinc-600 mb-2">
              Dadhich Bus Services excels in providing top-quality bus rental
              solutions, specializing in Volvo and minibus rentals that cater to
              diverse travel needs. With a strong focus on quality and customer
              satisfaction, we maintain a fleet of well-equipped, comfortable
              buses suitable for groups of all sizes. Our Volvo buses offer a
              luxurious travel experience, boasting modern amenities and
              spacious interiors to ensure every journey is pleasant and
              memorable. For smaller groups, our minibuses provide a perfect
              blend of comfort and convenience without sacrificing any
              amenities.
            </p>
            <p className="text-pretty font-poppins text-zinc-600 mb-2">
              Dadhich Bus Services is committed to safety, punctuality, and a
              customer-centric approach, ensuring a smooth, stress-free journey.
              Our rental services extend far beyond Fatehabad, covering a wide
              range of destinations across India. Whether you need a bus for a
              short day trip or a long-distance excursion, our experienced
              drivers ensure a reliable and enjoyable ride.
            </p>
            <p className="text-pretty font-poppins text-zinc-600">
              With competitive pricing, flexible packages, and a steadfast
              commitment to excellence, Dadhich Bus Services is your go-to
              choice for hassle-free, high-quality group travel. Let us make
              your travel comfortable, convenient, and memorable.
            </p>
          </div>
          {/* right section */}
          <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center items-center">
            <div className="w-full p-4 rounded-lg flex justify-center">
              <img
                src="images/public/rental_hero_image.webp?tr=w-500,h-333"
                alt="Dadhich bus travel"
                className="object-cover rounded-lg w-full md:w-4/5 lg:w-3/4"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <ServiceBox iconName="booking" message="Easy Booking" />
          <ServiceBox iconName="verified" message="Professioanl Drivers" />
          <ServiceBox iconName="bus" message="Big Fleet of Vehicles" />
          <ServiceBox iconName="interior" message="Luxury Interiors" />
        </div>
      </div>
    </section>
  );
};

export default Services;
