import { t } from "@lingui/macro";
import type { SearchResultDto } from "@reactive-resume/dto";
import { Button, Input } from "@reactive-resume/ui";
import { useState } from "react";

import { useSearch } from "@/client/services/search/search";

import SearchResultItem from "./search-result";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(10); // Default number of search results

  const { data, isLoading, error, refetch } = useSearch(query, totalResults);

  const handleSearch = () => {
    void refetch();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">{t`Search`}</h1>
      <div className="flex w-full max-w-md">
        <Input
          type="text"
          value={query}
          placeholder={t`Enter your search query`}
          className="mr-2 flex-grow"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyUp={handleKeyPress}
        />
        <Button onClick={handleSearch}>{t`Search`}</Button>
      </div>
      <div className="mt-4 w-full max-w-md">
        {isLoading && <p>{t`Loading...`}</p>}
        {error && <p>{t`Error: ${error.message}`}</p>}
        {data && data.length > 0 ? (
          <ul>
            {data.map((item: SearchResultDto, index: number) => (
              <li key={index}>
                <SearchResultItem item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p>{t`No results found`}</p>
        )}
      </div>
    </div>
  );
};
