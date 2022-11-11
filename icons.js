const icons = {
    'sistema': 'settings_suggest',
    'fitossanitário': 'grass',
    'atividades': 'list_alt',
    'financeiro': 'account_balance',
    'estoque': 'inventory_2',
    'cadastro gererico': 'rebase_edit',
    'login': 'manage_accounts'
}


var divMenuModulo = document.querySelectorAll('.divMenuModulo');

function negrito() {
    let elementBold = this.style.fontWeight
    if(elementBold === ''){
        elementBold = 'bold';
    } else{
        elementBold = 'normal'
    }
}

divMenuModulo.forEach((item) => {
    item.addEventListener('click', negrito);
});