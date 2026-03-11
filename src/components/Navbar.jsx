import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="w-full flex items-center py-3">
      <img
        src={logo}
        alt="Edelweiss"
        className="h-12 object-contain"
      />
    </div>
  );
};

export default Navbar;