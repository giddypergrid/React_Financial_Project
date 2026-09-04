# Financial Project, React client

> **Status: finished learning project, October 2025. Not maintained.** Built to learn React and
> TypeScript before starting my Masters. It is here as a record, not as live work. For current
> projects see [Fine Print](https://github.com/giddypergrid/nzfineprint-backend) or
> [NZ Bird Sound](https://github.com/giddypergrid/NZBirdSoundDatabase-AWS).

A stock research front end. Search a company, read its filings and financials, leave a comment.

Talks to two things: the
[.NET API](https://github.com/giddypergrid/DotNet_Financial_Project) in the sibling repository for
users and comments, and the Financial Modeling Prep API for market data and SEC filings.

```
  SearchPage   ──►  company search
  CompanyPage  ──►  profile · income statement · balance sheet · cash flow · SEC filings
  HomePage     ──►  saved portfolio
```

`src/Api/apiProcess.tsx` wraps every outbound call so an API error is handled in one place instead of
per component, which was the point of the last change made to it.

---

React 18, TypeScript, React Router, Axios, Create React App.
