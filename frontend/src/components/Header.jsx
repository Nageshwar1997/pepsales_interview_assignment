/* eslint-disable react/prop-types */

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} uppercase flex justify-center items-center gap-2 lg:gap-4 p-2 text-white rounded-md text-sm lg:text-lg`}
    >
      <strong>{text}</strong>
      <div className="bg-white w-5 h-5 lg:w-6 lg:h-6 p-4 text-black flex justify-center items-center rounded-full">
        {count}
      </div>
    </div>
  );
};

export default Header;
