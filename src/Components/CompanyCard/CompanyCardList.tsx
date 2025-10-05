import React from 'react';
import CompanyCard from './CompanyCard';
import { JSX } from 'react/jsx-runtime';
import { CompanySearch } from 'Types/company';
import './CompanyCardList.css';


interface Props {
    CardListData: CompanySearch[];
    addPortfolio: (e: any) => void;
}

const CompanyCardList: React.FC<Props> = ({ CardListData, addPortfolio }): JSX.Element => {
    // Sort stocks by ticker alphabetically
    const sortedStocks = [...CardListData].sort((a, b) => 
        a.symbol.localeCompare(b.symbol)
    );

    return (
        <div className="company-card-list">
            {sortedStocks.length > 0 ? (
                sortedStocks.map((stock, index) => (
                    <CompanyCard
                        key={stock.symbol}
                        data={stock}
                        addPortfolio={addPortfolio}
                    />
                ))
            ) : (
                <h1>No Results Found</h1>
            )}
        </div>
    );
};

export default CompanyCardList;