import { getCompanyLogUrl } from 'Configs/CompanyLogos';
import { loadCachedImage } from 'Hooks/useCachedImage';
import React, { useEffect, useState } from 'react'
import { TbMoodEmpty } from 'react-icons/tb';
import './Symol2Image.css';

type Props = {
    symbol: string;
}

const Symbol2Image = ({symbol}: Props) => {
  const companylogo = getCompanyLogUrl(symbol);
  const [cachedImageUrl, setCachedImageUrl] = useState<string | undefined>();
  useEffect(() => {
    const loadImage = async () => {
      const blobUrl = await loadCachedImage(companylogo);
      setCachedImageUrl(blobUrl);
    }
    loadImage();
  }, [companylogo]);
  return (
    <div className='company-logo-wrapper'>
        {cachedImageUrl? 
          <img src={cachedImageUrl} alt={`${symbol} company logo`} className='company-logo'/>
          : <TbMoodEmpty className='company-logo'/>
        }
    </div>
  )
}

export default Symbol2Image