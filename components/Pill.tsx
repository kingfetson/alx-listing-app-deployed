import React from "react";

interface PillProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const Pill: React.FC<PillProps> = ({ label, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition ${
        active ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-100"
      }`}
    >
      {label}
    </button>
  );
};

export default Pill;
