export const ServiceBox: React.FC<{ iconName: string; message: string }> = ({
  iconName,
  message,
}) => {
  return (
    <div className=" p-4 text-center rounded-lg transition duration-300 transform hover:-translate-y-2">
      <div className="bg-[#C22A54] w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4">
        <img
          src={`/images/svg/${iconName}.svg`}
          alt={`${message} icon`}
          className="w-12 h-12"
        />
      </div>
      <p className="text-lg font-medium text-gray-800">{message}</p>
    </div>
  );
};
