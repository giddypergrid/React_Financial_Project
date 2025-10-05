import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getCompanyKeyMetrics } from 'Api/api'
import { CompanyKeyMetrics } from 'Types/company'
import MetricsRowList from 'Components/MetricsRow/MetricsRowList'
import CompanyTTMExplanation from 'Configs/CompanyTTMExplanation'
import Spinner from 'Components/Spinner/Spinner'
import check_response from 'Api/apiProcess'

type Props = {}

const CompanyTTM = (props: Props) => {
  const { symbol } = useOutletContext<{ symbol: string }>();
  const [companyKeyMetrics, setCompanyKeyMetrics] = useState<CompanyKeyMetrics>();
  const [enabledSpinner, setEnabledSpinner] = useState( true);
  useEffect(() => { 
    const fetchCompanyTTM = async () => {
      const response = await getCompanyKeyMetrics(symbol);
      const isValid = check_response(response, symbol);
      setCompanyKeyMetrics(isValid?response?.data[0]:undefined);
      setEnabledSpinner(false);
    }
    fetchCompanyTTM();
  }, [symbol]);

  // Define explanations for common financial metrics
  const getMetricExplanation = (metricName: string): string | undefined => {
    const explanations = CompanyTTMExplanation;
    return explanations[metricName];
  };

  const metricsData = companyKeyMetrics ? Object.entries(companyKeyMetrics).map(([key, value], index) => {
    const explanation = getMetricExplanation(key);
    return {
      id: index,
      MetricsName: key,
      value: value,
      explanation: explanation
    };
  }).filter((data) => typeof data.value === 'number') : [];

  return (
    <div>
        {metricsData && <MetricsRowList data={metricsData}/>}
        {enabledSpinner && <Spinner />}
    </div>
  )
}

export default CompanyTTM