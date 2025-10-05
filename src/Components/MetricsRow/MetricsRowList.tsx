import React from 'react';
import MetricsRow from './MetricsRow';
import './MetricsRow.css';

interface Props {
  data: {
    id: number;
    MetricsName: string;
    value: number;
    explanation?: string;
  }[];
}

const MetricsRowList: React.FC<Props> = ({data}: Props) => {
  return (
    <div className='scrollable-area financial-ratios-list' style={{maxHeight: '65vh'}}>
      <h2>Company Financial Ratios</h2>
      <ul>
        {data.map((company) => (
          <MetricsRow
            key={company.id}
            MetricsName={company.MetricsName}
            value={company.value}
            explanation={company.explanation}
          />
        ))}
      </ul>
    </div>
  );
};

export default MetricsRowList;
