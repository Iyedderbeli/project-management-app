const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Icon Circle */}
      <div
        className={`w-4 h-4 md:w-6 md:h-6 ${color} rounded-full flex items-center justify-center`}
      >
        <p className="text-white text-xs md:text-sm">{icon}</p>{" "}
        {/* Icon inside the circle */}
      </div>

      {/* Value and Label in One Line */}
      <p className="text-xs md:text-[14px] text-gray-500">
        <span className="text-sm md:text-[15px] text-black font-semibold mr-1 inline">
          {value}
        </span>
        {label}
      </p>
    </div>
  );
};

export default InfoCard;
