import { EnvelopeSimple, Plus } from "@phosphor-icons/react";
import type { SearchResultDto } from "@reactive-resume/dto";
import React from "react";
interface SearchResultItemProps {
  item: SearchResultDto;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  return (
    <div className="mb-4 flex items-center rounded-lg bg-white p-4 shadow-md">
      <div className="shrink-0">
        <img
          className="size-16 rounded-full"
          src={
            item.picture ||
            "https://img.freepik.com/premium-vector/profile-icon-vector-illustration-design-template_827767-5831.jpg?w=740"
          }
          alt={item.name}
        />
      </div>
      <div className="ml-4">
        <div className="text-lg font-medium text-gray-900">{item.name}</div>
        <div className="text-sm text-gray-500">{item.username}</div>
        <div className="text-sm text-gray-500">{item.email}</div>
      </div>
      <div className="ml-auto flex space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <EnvelopeSimple size={24} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default SearchResultItem;
