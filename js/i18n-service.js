var gTrans = {
    'title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'price': {
        en: 'Price',
        he: 'מחיר',
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'read': {
        en: 'Read',
        he: 'על הספר'
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף ספר',
    },
    'prev-page': {
        en: 'Previous Page',
        he: 'לעמוד הקודם',
    },
    'nxt-page': {
        en: 'Next Page',
        he: 'לעמוד הבא',
    },
    'modal-save': {
        en: 'Save',
        he: 'שמור',
    },
    'modal-close': {
        en: 'Close',
        he: 'סגור',
    },
    'update': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete': {
        en: 'Delete',
        he: 'הסר'
    },
    'modal-details': {
        en: 'Book Details',
        he: 'על הספר'
    },
    'modal-name': {
        en: 'Name:',
        he: 'שם הספר:'
    },
    'modal-price': {
        en: 'Price:',
        he: 'מחיר:'
    },
    'modal-rtng': {
        en: 'Ratings (out of 5):',
        he: 'דירוג (מתוך 5):'
    }
}

var gCurrLang = 'en';

function doTrans() {

    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    })
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    // if not found return en
    if (!txt) txt = keyTrans['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    if (gCurrLang === 'he') return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    if (gCurrLang === 'en') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num / 3.5);
    }
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}