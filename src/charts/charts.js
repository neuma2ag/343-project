function handleSearchForm(ev) {
    ev.preventDefault()
    const data = new FormData(ev.target)
    const input = data.get('input')

    fetch(`https://financialmodelingprep.com/api/v3/search?query=${input}&apikey=jfjr9JQmDSrJFuWMDeuynmh8Sxu84XVH`)
        .then(data => data.json())
        .then(data => data[0].symbol)
        .then(ticker => fetch(`https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=annual&apikey=jfjr9JQmDSrJFuWMDeuynmh8Sxu84XVH`))
        .then(data => data.json())
        .then(reports => {
            reports.forEach(report => {
                const div = document.createElement('div')
                div.innerHTML = `
                    <p class="text-dracula-purple text-lg">${report.calendarYear}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Accepted Date: ${report.acceptedDate}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Period: ${report.period}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Period: ${report.period}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Revenue: ${report.revenue}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Cost of Revenue: ${report.costOfRevenue}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Gross Profit: ${report.grossProfit}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Gross Profit Ratio: ${report.grossProfitRatio}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Research and Development Expenses: ${report.researchAndDevelopmentExpenses}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">General and Administrative Expenses: ${report.generalAndAdministrativeExpenses}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Selling and Marketing Expenses: ${report.sellingAndMarketingExpenses}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Selling General and Administrative Expenses: ${report.sellingGeneralAndAdministrativeExpenses}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Other Expenses: ${report.otherExpenses}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Operating Expenses: ${report.operatingExpenses}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Cost and Expenses: ${report.costAndExpenses}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Operating Income: ${report.operatingIncome}</p>
                    <p class="text-black even:bg-white odd:bg-gray-500">Net Income: ${report.netIncome}</p>
                `
                document.getElementById('reports').appendChild(div)
            })
        })
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchForm').addEventListener('submit', handleSearchForm)
})
