import logo from "../assets/logo.png";

const TopHeader = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-full px-12 py-2 flex items-center justify-start">
        <img
          src={logo}
          alt="Edelweiss"
          className="h-16 w-auto object-contain ml-2"
        />
      </div>
    </div>
  );
};

export default TopHeader;