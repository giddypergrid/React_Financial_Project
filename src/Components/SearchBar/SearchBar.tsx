import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { JSX } from 'react/jsx-runtime'
import './SearchBar.css'

type Props = {
  search: string | undefined;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: SyntheticEvent) => void;
}

const SearchBar = ({search, onSearchChange, onSearchSubmit}: Props): JSX.Element => {
  return (
    <div className='search-bar'>
      <form onSubmit={(e) => onSearchSubmit(e)}>
        <input className='search-bar-input' type="text" placeholder="Search for a stock symbol, like AAPL" onChange={(e) => onSearchChange(e)} />
        <button type="submit" className='search-button'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar