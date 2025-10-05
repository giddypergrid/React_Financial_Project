import React, { useEffect, useState } from 'react'
import { JSX } from 'react/jsx-runtime'
import { Link } from 'react-router-dom'
import { CompanySearch } from 'Types/company'
import { getCompanyLogUrl } from 'Configs/CompanyLogos'
import { loadCachedImage } from 'Hooks/useCachedImage'
import { TbMoodEmpty } from 'react-icons/tb';
import Symbol2Image from 'Helpers/Symbol2Image/Symbol2Image'

interface Props {
    data: CompanySearch;
    addPortfolio: (e: any) => void;
}

const CompanyCard: React.FC<Props> = ({data, addPortfolio}: Props): JSX.Element => {
  return (
      <Link to={`/company/${data.symbol}`} className='company-card'>

        <Symbol2Image symbol={data.symbol} />
        <div className='stock-info'>
            <span className='text exchangeFullName'>{data.exchangeFullName}</span>
            <span className='text ticker-symbol'>Ticker: {data.symbol}</span>
            <span className='text company-name'>Name: {data.name}</span>
            <span className='text company-exchange'>Exchange: {data.exchange}</span>
        </div>
        <form className='company-card-form' onSubmit={(e) => addPortfolio(e)} onClick={(e) => e.stopPropagation()}>
          <input readOnly={true} hidden={true} value={data.symbol}/>
          <button type='submit' className='general-button'>Add to Portfolio</button>
        </form>
      </Link>
  )
}

export default CompanyCard