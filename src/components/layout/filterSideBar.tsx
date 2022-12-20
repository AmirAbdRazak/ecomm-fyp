import { Dispatch, SetStateAction } from 'react';

const SearchBar = ({
    searchValue,
    setSearchVal,
}: {
    searchValue: string;
    setSearchVal: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="flex flex-row items-center pb-5">
            <label
                htmlFor="simple-search"
                className="sr-only"
            >
                Search
            </label>
            <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </div>
                <input
                    type="text"
                    id="simple-search"
                    className="block w-full rounded-lg border border-gray-300 p-1.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchVal(e.target.value)}
                    required
                />
            </div>
        </div>
    );
};

const PriceFilter = ({
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
}: {
    minPrice: number;
    setMinPrice: Dispatch<SetStateAction<number>>;
    maxPrice: number;
    setMaxPrice: Dispatch<SetStateAction<number>>;
}) => {
    return (
        <div className="flex flex-col space-y-2 pb-2">
            <label className="flex text-sm">Min. Price ($):</label>

            <input
                className="flex w-full rounded-md border px-2"
                value={minPrice}
                type="number"
                min="0"
                onChange={(e) => setMinPrice(e.target.valueAsNumber)}
            />
            <label className="flex text-sm">Max. Price ($):</label>
            <input
                className="flex w-full rounded-md border px-2"
                value={maxPrice}
                type="number"
                min={minPrice}
                onChange={(e) => setMaxPrice(e.target.valueAsNumber)}
            />
        </div>
    );
};
const FilterSideBar = ({
    searchFilter: [searchVal, setSearchVal],
    priceFilter: [minPrice, setMinPrice, maxPrice, setMaxPrice],
}: {
    searchFilter: searchFilterType;
    priceFilter: priceFilterType;
}) => {
    return (
        <div className="z-0 w-56 pt-20 pl-10">
            <div className="flex flex-col justify-between py-2">
                <SearchBar
                    searchValue={searchVal}
                    setSearchVal={setSearchVal}
                />
                <PriceFilter
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                />
            </div>
        </div>
    );
};

export default FilterSideBar;
