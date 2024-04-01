"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent, ChangeEvent, useCallback } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  // const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();

  // const [data, setData] = useState([]);

  // Sử dụng useSWR để fetch dữ liệu
  const { data, error } = useSWR(
    // Sử dụng debouncedQuery thay vì query
    query ? `${process.env.NEXT_PUBLIC_SERVER_URL}/get-key-search/${encodeURIComponent(query)}` : null,
    // async callback function
    async (url: string) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.courseSearch;
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    }
  );

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      router.push(`/search/${query}`);
    } else {
      toast.error("Please enter at least one character!");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, 500);

  //   return () => clearTimeout(timerId);
  // }, [query]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (debouncedQuery) {
  //       try {
  //         // api
  //         // console.log(`Gọi API với query: ${process.env.NEXT_PUBLIC_SERVER_URL}/get-key-search/${encodeURIComponent(debouncedQuery)}`);
  //         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-key-search/${encodeURIComponent(debouncedQuery)}`);
  //         const data = await response.json();
  //         console.log(data.courseSearch); // Xử lý dữ liệu nhận được
  //         setData(data.courseSearch)

  //      } catch (error) {
  //         console.error('Lỗi khi gọi API:', error);

  //       }
  //     }
  //   };

  //   fetchData();
  // }, [debouncedQuery]); 

  return (
    <>
      <form className="flex items-center h-[50px] mt-3" onSubmit={searchHandler}>
        <input
          type="search"
          placeholder="Search Courses..."
          className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-l-[5px] px-2 h-full flex-1 outline-none font-josefin"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className="w-[50px] main-gradient rounded-r-[5px] text-dark_text grid place-items-center h-full">
          <BiSearch size={30} />
        </button>
      </form>

      {/* {data.length > 0 ?  (
        <ul className="relative z-10 bg-white shadow-md max-h-60 overflow-auto text-black">
          {data.length > 0 ? (
            data.map((item: { title: string }, index: number) => (
              <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                {item.title}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found.</li>
          )}
        </ul>
      ): <></>} */}
      {data ? (
        <ul className="relative z-10 bg-white shadow-md max-h-60 overflow-auto text-black">
          {data.length > 0 ? (
            data.map(( name: string , index: number) => (
              <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                {name}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found.</li>
          )}
        </ul>
      ) : (<></>) }

    </>
  );
};

export default SearchBar;

