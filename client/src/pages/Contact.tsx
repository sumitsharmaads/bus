import { ContactForm, ContactInfo } from "../components/Contact";
import Map from "../components/Map";

const Contact: React.FC = () => {
  return (
    <section>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
      <div className="mb-4">
        {/* Flexbox container for the icon and text */}
        <div className="flex justify-center items-center space-x-2 mt-2">
          <h2 className="text-lg font-semibold font-poppins capitalize">
            Contact us
          </h2>
        </div>
        {/* Horizontal dashed line */}
        <hr className="border-t-2 border-dashed border-[#202542]-900 mt-2" />
      </div>
      <div className="container mx-auto p-6">
        <div className="flex flex-col-reverse md:flex-row md:space-x-8">
          {/* Left Info Section */}
          <ContactInfo />

          {/* Right Form Section */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
