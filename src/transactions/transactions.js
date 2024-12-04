function username() {
    if (!localStorage.getItem('username')) {
        localStorage.setItem('username', 'User')
    }
    return localStorage.getItem('username')
}

function setTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
function getTransactions() {
    if (!localStorage.getItem('transactions')) {
        setTransactions([])
    }
    return JSON.parse(localStorage.getItem('transactions'))
}

function handleForm(ev) {
    ev.preventDefault()
    const data = new FormData(ev.target)
    const date = data.get('date')
    const amount = data.get('amount')
    const desc = data.get('desc')

    if (!(desc && date && amount)) {
        return;
    }
    const ts = getTransactions()
    const id = ts.reduce((acc, x) => Math.max(acc, x.id), -1) + 1
    const transaction = { id: id, amount: parseFloat(amount), desc: desc, date: date }
    ts.push(transaction)
    setTransactions(ts)
    update()
}

function loadTransactions(transactions) {
    const table = document.getElementById('transactions');
    table.innerHTML = `
        <thead>
            <tr>
                <th class='text-lg text-left text-dracula-purple'>Date</th>
                <th class='text-lg text-left text-dracula-purple'>Amount</th>
                <th class='text-lg text-left text-dracula-purple'>Description</th>
                <th class='text-lg text-left text-dracula-purple'></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        `
    const tbody = document.querySelector('tbody')

    const start = getPage() * 22
    const ts = transactions.slice(start, start + 22)
    ts.map(x => {
        const tr = document.createElement('tr')
        tr.classList.add('even:bg-gray-500', 'odd:bg-white')
        tr.innerHTML = `
            <td>${x.date}</td>
            <td>${x.amount}</td>
            <td>${x.desc}</td>
            <td></td>`

        const button = document.createElement('button')
        button.classList.add('text-red-500')
        button.textContent = 'X'
        button.addEventListener('click', () => {
            setTransactions(getTransactions().filter(y => y.id != x.id))
            update()
        })
        tr.lastChild.appendChild(button)

        return tr;
    }).forEach(x => tbody.appendChild(x))
}

function calcBalance() {
    return getTransactions().reduce((acc, x) => acc + x.amount, 0).toFixed(2);
}

function update() {
    loadTransactions(getTransactions())
    const balance = document.getElementById('balance')
    balance.innerHTML = `
    Balance: 
        <p class='text-dracula-foreground'>${calcBalance()}</p>
    `
    document.getElementById('page').textContent = getPage()
}

function handleSearchForm(ev) {
    ev.preventDefault()
    const data = new FormData(ev.target)
    const needed = data.get('input')
    loadTransactions(getTransactions().filter(x => x.desc.includes(needed)))
}

function getPage() {
    if (!localStorage.getItem('page')) {
        setPage(0)
    }
    return JSON.parse(localStorage.getItem('page'))
}

function setPage(page) {
    localStorage.setItem('page', JSON.stringify(page))
}

function getLastPage() {
    return Math.floor(getTransactions().length / 22)
}

function nextPage(_) {
    setPage(Math.min(getPage() + 1, getLastPage()))
    update()
}

function prevPage(_) {
    setPage(Math.max(getPage() - 1, 0))
    update()
}

function lastPage(_) {
    setPage(getLastPage())
    update()
}

function firstPage(_) {
    setPage(0)
    update()
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('welcome').textContent = `Welcome, ${username()}!`
    document.getElementById('addForm').addEventListener('submit', handleForm)
    document.getElementById('searchForm').addEventListener('submit', handleSearchForm)
    document.getElementById('nextPage').addEventListener('click', nextPage)
    document.getElementById('prevPage').addEventListener('click', prevPage)
    document.getElementById('firstPage').addEventListener('click', firstPage)
    document.getElementById('lastPage').addEventListener('click', lastPage)
    update()
})
