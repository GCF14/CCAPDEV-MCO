'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useState} from 'react'
import Link  from 'next/link';

export default function Header(){
  const [searchValue, setSearchValue] = useState('');
  // cant search if input is empty
  const isSearchDisabled = !searchValue.trim();

  return (
    <div className="flex justify-center items-center w-full px-10">
      <div className="flex items-center w-1/2 space-x-2">
        <Input 
          type="search" 
          placeholder="Search 'Website Name'"
          className="w-full h-12"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => { // for enter to submit search
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        />
        {/* don't allow search if empty input */}
        <Link href={isSearchDisabled ? '#' : `/search?search=${searchValue}`}>
            <Button disabled={isSearchDisabled}>Search</Button>
        </Link> 
      </div>
    </div>
  );

}