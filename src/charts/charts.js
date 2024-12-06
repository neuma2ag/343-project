function getTransactions() {
    if (!localStorage.getItem('transactions')) {
        setTransactions([])
    }
    return JSON.parse(localStorage.getItem('transactions'))
}

document.addEventListener('DOMContentLoaded', () => {
})
