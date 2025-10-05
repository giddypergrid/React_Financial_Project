import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './SearchPage.css';
import CompanyCardList from 'Components/CompanyCard/CompanyCardList';
import { CompanySearch } from 'Types/company';
import { searchCompanies } from 'Api/api';
import PortfolioList from 'Components/Portfolio/PortfolioList';
import SearchBar from 'Components/SearchBar/SearchBar';
import check_response from 'Api/apiProcess';
import { MdOutlinePageview } from 'react-icons/md';

type Props = {}

function SearchPage({}: Props) {
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
    const [stockPortfolioValues, setStockPortfolioValues] = useState<string[]>([]);

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    }
    const addPortfolio = (e: any) => {
    e.preventDefault();
    const stockSymbol = e.target[0].value;
    if (!stockPortfolioValues.includes(stockSymbol)) {
        setStockPortfolioValues([...stockPortfolioValues, stockSymbol]);
    }
    }
    const removePortfolio = (e:any) => {
    e.preventDefault();
    const stockSymbol = e.target[0].value;
    setStockPortfolioValues(stockPortfolioValues.filter((symbol) => symbol !== stockSymbol));
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await searchCompanies(search);
    const isValid = response ? check_response(response) : false;
    if (isValid && response && typeof response !== 'string') {
        setSearchResults(response?.data);
    }
    }
    return (
    <div className="search-page">
        <SearchBar 
          search={search}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />
        <div className="search-page-content">
            <PortfolioList symbolList={stockPortfolioValues} removePortfolio={removePortfolio} />
            {searchResults.length > 0 ? <CompanyCardList CardListData={searchResults} addPortfolio={addPortfolio} />
            : <MdOutlinePageview className='no-search-icon'/>}
        </div>
    </div>
    );
}
export default SearchPage