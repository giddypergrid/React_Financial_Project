import React from 'react'
import { Link } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import { getCompanyLogUrl } from 'Configs/CompanyLogos';
import Symbol2Image from 'Helpers/Symbol2Image/Symbol2Image';

type Props = {
    symbol: string;
    removePortfolio: (e: any) => void;
}

const Portfolio = ({symbol, removePortfolio}: Props): JSX.Element => {
  const companylogo = getCompanyLogUrl(symbol);
  return (
      <Link to={`/company/${symbol}`} className='easeIn'>
        
        <Symbol2Image symbol={symbol} />
        
        <div style={{padding: '4px'}}>
          <h2>{symbol}</h2>
          <div>
            <form onSubmit={(e) => removePortfolio(e)} onClickCapture={(e) => e.stopPropagation()}>
              <input readOnly={true} hidden={true} value={symbol}/>
              <button className='general-button' type='submit'>Remove</button>
            </form>
          </div>
        </div>

      </Link>
  )
}

export default Portfolio