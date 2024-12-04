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

    transactions.map(x => {
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
}

function handleSearchForm(ev) {
    ev.preventDefault()
    const data = new FormData(ev.target)
    const needed = data.get('input')
    loadTransactions(getTransactions().filter(x => x.desc.includes(needed)))
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('welcome').textContent = `Welcome, ${username()}!`
    document.getElementById('addForm').addEventListener('submit', handleForm)
    document.getElementById('searchForm').addEventListener('submit', handleSearchForm)
    update()
})
