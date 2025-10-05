import App from 'App'
import CompanyDetail from 'Pages/CompanyPage/SubPages/CompanyDetail'
import IncomeStatement from 'Pages/CompanyPage/SubPages/IncomeStatement'
import CompanyTTM from 'Pages/CompanyPage/SubPages/CompanyTTM'
import CompanyPage from 'Pages/CompanyPage/CompanyPage'
import HomePage from 'Pages/HomePage/HomePage'
import SearchPage from 'Pages/SearchPage/SearchPage'
import CompanyRedirect from 'Pages/CompanyPage/CompanyRedirect'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import CompanyBalanceSheet from 'Pages/CompanyPage/SubPages/CompanyBalanceSheet'
import CompanyCashFlow from 'Pages/CompanyPage/SubPages/CompanyCashFlow'
import NotFound from 'Pages/NotFound/NotFound'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "company/:symbol",
                element: <CompanyPage />,
                children: [
                    {
                        index: true,
                        element: <CompanyRedirect />
                    },
                    {
                        path: "company-detail",
                        element: <CompanyDetail />
                    },
                    {
                        path: "income-statement",
                        element: <IncomeStatement />
                    },
                    {
                        path: "company-ttm",
                        element: <CompanyTTM />
                    },
                    {
                        path: "company-balance-sheet",
                        element: <CompanyBalanceSheet />
                    },
                    {
                        path: "company-cash-flow",
                        element: <CompanyCashFlow />
                    }
                ]
            }
            ,
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])