import axios, { AxiosResponse } from "axios";
import { CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyBalanceSheet, CompanyCashFlow, CompanyTenK } from "Types/company";

const generalErrorProcess = (error: any, logoutinfo: string) => {
    if(axios.isAxiosError(error)){
        console.error(logoutinfo, error);
        return error.message + '\n' + error.response?.data?.toString();
    } else {
        console.error('unexpected error', error);
        return 'Unexpected in ' + logoutinfo
    }
}

const searchCompanies = async (query: string) => {
    try{
        const response = await axios.get<CompanySearch[]>(`https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${process.env.REACT_APP_FINANCIAL_KEY}`)
        return response;
    } catch (error) {
        return generalErrorProcess(error, 'searchCompanies');
    }
}

const getCompanyProfile = async (query: string) => {
    try{
        const response = await axios.get<CompanyProfile[]>(`https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${process.env.REACT_APP_FINANCIAL_KEY}`)
        return response;
    } catch (error) {
        return generalErrorProcess(error, 'getCompanyProfile');
    }
}

const getCompanyKeyMetrics = async (query: string) => {
    try{
        const response = await axios.get<CompanyKeyMetrics[]>(`https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${process.env.REACT_APP_FINANCIAL_KEY}`)
        return response;
    } catch (error) {
        return generalErrorProcess(error, 'getCompanyKeyMetrics');
    }
}

const getCompanyIncomeStatement = async (query: string) => {
    try{
        const response = await axios.get<CompanyIncomeStatement[]>(`https://financialmodelingprep.com/stable/income-statement?symbol=${query}&limit=5&apikey=${process.env.REACT_APP_FINANCIAL_KEY}`)
        return response;
    } catch (error) {
        return generalErrorProcess(error, 'getCompanyIncomeStatement');
    }
}

const getCompanyBalanceSheet = async (query: string) => {
    try{
        const response = await axios.get<CompanyBalanceSheet[]>(`https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&limit=5&apikey=${process.env.REACT_APP_FINANCIAL_KEY}`)
        return response;
    } catch (error) {
        return generalErrorProcess(error, 'getCompanyBalanceSheet');
    }
}

const getCompanyCashFlow = async (query: string) => {
    try{
        const response = await axios.get<CompanyCashFlow[]>(`https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${query}&limit=5&apikey=${process.env.REACT_APP_FINANCIAL_KEY}`)
        return response;
    } catch (error) {
        return generalErrorProcess(error, 'getCompanyCashFlow');
    }
}

const getCompanyPeers = async (query: string) => {
    try{
        const response = await axios.get<{symbol: string}[]>(`https://financialmodelingprep.com/stable/stock-peers?symbol=${query}&apikey=${process.env.REACT_APP_FINANCIAL_KEY}`)
        return response;
    } catch (error) {
        return generalErrorProcess(error, 'getCompanyPeers');
    }
}
const getTenKData = async(query: string, page: number, limit: number) => {
    try{
        // Calculate dates: from 364 days ago to 1 day ago
        const today = new Date();
        const oneDayAgo = new Date(today);
        oneDayAgo.setDate(today.getDate() - 1);
        
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 364);
        
        // Format dates as 'YYYY-MM-DD'
        const to = oneDayAgo.toISOString().split('T')[0];
        const from = fromDate.toISOString().split('T')[0];
        
        const response = await axios.get<CompanyTenK[]>(`https://financialmodelingprep.com/stable/sec-filings-search/symbol?symbol=${query}&from=${from}&to=${to}&page=${page}&limit=${limit}&apikey=${process.env.REACT_APP_FINANCIAL_KEY}`)
        return response;
    } catch (error) {
        return generalErrorProcess(error, 'getTenKData');
    }
}
export { searchCompanies, getCompanyProfile, getCompanyKeyMetrics, getCompanyIncomeStatement, getCompanyBalanceSheet, getCompanyCashFlow, getCompanyPeers, getTenKData};