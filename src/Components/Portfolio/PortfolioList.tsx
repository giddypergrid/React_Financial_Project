import React from 'react'
import PortfolioCard from './PortfolioCard';
import './PortfolioList.css';
type Props = {
    symbolList: string[];
    removePortfolio: (e: any) => void;
}

const PortfolioList = ({symbolList, removePortfolio}: Props) => {
  const sortedSymbols = [...symbolList].sort((a, b) => 
    a.localeCompare(b)
  );
  return (
    sortedSymbols.length > 0 && <div className='portfolio-content'>
        <h2 className='portfolio-title'>My Portfolio</h2>
        <div className='portfolio-card-list'>
            <ul>
                {sortedSymbols.map((symbol) => (
                    <li key={symbol}>
                        <PortfolioCard symbol={symbol} removePortfolio={removePortfolio} />
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default PortfolioList