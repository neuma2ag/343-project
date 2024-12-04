function card(page, img, desc) {
    const div = document.createElement('div')
    div.innerHTML = `
            <div class="w-64 bg-dracula-current p-4 border-solid border-4 border-dracula-background hover:border-dracula-purple hover:cursor-pointer">
                <div class="flex justify-center">
                    <img class="h-52" src="../../assets/${img}" />
                </div>
                <span class="text-lg">${desc}<span>
            </div>
    `
    // hacking this because the styling breaks replacing the parent div with an anchor
    div.addEventListener('click', () => {
        location.href = `../${page}/index.html`
    })

    return div
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.getElementById('cards')
    cards.appendChild(card('transactions', 'dollar.png', 'View and edit all of your financial transactions in a table list format'))
    cards.appendChild(card('charts', 'charts.png', 'Chart your financial data in multiple dimensions over different time periods'))
    cards.appendChild(card('account', 'user.png', 'View and edit your account information and completely reset your data'))
})
