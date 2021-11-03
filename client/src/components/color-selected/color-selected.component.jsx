const ColorSelected = ({ color }) => {
  return (
    <div
      className={`cursor-pointer w-10 h-10 ring-2 ring-white hover:ring-blue-400 rounded-full ring-offset-2 bg-${color}-400`}
    ></div>
  );
};

export default ColorSelected;
