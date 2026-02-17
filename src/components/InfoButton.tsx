import { FaInfoCircle } from "react-icons/fa";
import { useEffect } from 'react';
type Props = {
  active: boolean;
  onClick: () => void;
};

export default function InfoButton({ active, onClick }: Props) {
  return (
      <FaInfoCircle
          onClick = { onClick }
          className={[
          "absolute right-4 top-1/2 -translate-y-1/2",
          "transition cursor-pointer",
          active ? "text-blue-600" : "text-gray-400 hover:text-blue-500",
          ].join(" ")}
      />
  );
}