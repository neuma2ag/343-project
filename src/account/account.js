function setUsername(x) {
    localStorage.setItem('username', x)
}

function getUsername() {
    if (!localStorage.getItem('username')) {
        setUsername('User')
    }
    return localStorage.getItem('username')
}

function handleChangeNameForm(ev) {
    ev.preventDefault()
    const data = new FormData(ev.target);
    const username = data.get('name')
    setUsername(username)
    update()
}

function exportData(_) {
    let username = getUsername();
    let transactions = localStorage.getItem('transactions') || []
    console.log(transactions)
    data = { username: username, transactions: transactions }

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'data.json'
    a.click()
}

function clearData(_) {
    const x = window.confirm("Are you sure?")
    if (x) {
        localStorage.clear()
    }
    update()
}

function update() {
    document.getElementById('welcome').textContent = `Welcome, ${getUsername()}!`
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('changeName').addEventListener('submit', handleChangeNameForm)
    document.getElementById('export').addEventListener('click', exportData)
    document.getElementById('clear').addEventListener('click', clearData)
    update()
})
