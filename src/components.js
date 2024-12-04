function nav() {
    const nav = document.createElement('nav')
    nav.innerHTML = `
        <div class="bg-dracula-background">
            <div class="w-[1300px] mx-auto">
                <h1 class="text-3xl text-dracula-purple">Fun Financial Planner</h1>
            </div>
        </div>
        <div class="bg-dracula-current">
            <ul class="w-[1300px] mx-auto flex gap-5">
            </ul>
        </div>
    `

    const ul = nav.querySelector('ul')
    ul.appendChild(navItem("Home", "fa-home"))
    ul.appendChild(navItem("Transactions", "fa-dollar-sign"))
    ul.appendChild(navItem("Charts", "fa-chart-simple"))
    ul.appendChild(navItem("Account", "fa-user"))

    return nav
}

function navItem(page, icon) {
    const li = document.createElement('li')
    li.innerHTML = `
        <a class="text-dracula-foreground flex gap-1 items-center hover:text-dracula-purple" href="../${page.toLowerCase()}/index.html">
            <i class="fa-solid ${icon}"></i>
            <h2>${page}</h2>
        </a>
    `
    return li
}

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    body.insertBefore(nav(), body.firstChild)
})
