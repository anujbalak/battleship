
function home() {
        ///////////header
    let header = document.createElement("header");
    let titleContainer = document.createElement('div');
    let title = document.createElement('p');

    header.classList.add("header", "flex-container")
    titleContainer.classList.add('title-container');
    title.classList.add('title');

    title.innerText = 'Battleship'

    document.body.appendChild(header);
    header.appendChild(titleContainer);
    titleContainer.appendChild(title);

    /////content body
    let content = document.createElement('main');
    document.body.appendChild(content)

    ///footer
    let footer = document.createElement('footer');
    let credit = document.createElement('p');
    let creditLink = document.createElement('a')

    footer.classList.add("footer", "flex-container")
    credit.classList.add('credit');
    creditLink.classList.add('credit-link');

    credit.innerText = 'Made by'
    creditLink.href = "https://github.com/anujbalak";
    creditLink.target = '_blank'
    creditLink.innerText = 'Anuj'
    // creditLink.setAttribute('noopener')
    // creditLink.setAttribute('noreferrer')

    document.body.appendChild(footer);
    footer.appendChild(credit);
    footer.appendChild(creditLink)

}

export { home }