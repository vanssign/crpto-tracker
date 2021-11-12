//navigation headers
const home_nav = document.getElementById('home_nav');
const about_nav = document.getElementById('about_nav');
const exchange_rate_nav = document.getElementById('exchange_rate_nav');

home_nav.addEventListener('click', buildHomeHTML);
about_nav.addEventListener('click', buildAboutHTML);
exchange_rate_nav.addEventListener('click', buildExchangeRateHTML);

//auxillary functions
const insertHTML = (selector, html) => {
    let targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
}

function buildExchangeRateTable(exchangeRateData) {
    let content = "<div class='container'><table class='table table-hover'><tr><th>Currency</th><th>Rate</th><th>Timestamp</th></tr>";
    for (let i = 0; i < exchangeRateData.length; i++) {
        content += `<tr>
        <td>${exchangeRateData[i].currency}</td>
        <td>${exchangeRateData[i].rate}</td>
        <td>${exchangeRateData[i].timestamp}</td>
        </tr>`
    }
    content += "</table><div>"
    return content;
}

//ajax loader
const showPageLoading = () => {
    const loading_html =
        `<img src='https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif' 
         style="
         display:block;
         width: 100%;
         height:auto;
         overflow-y:hidden;
         margin-left: auto;
         margin-right: auto;"/>`
    insertHTML('#root', loading_html);
}

//caching data
let exchangeRateData = [];
let homePageHTML = '';
let aboutPageHTML = '';
let exchangeRateHTML = '';

//build functions
function buildHomeHTML() {
    showPageLoading();
    if (homePageHTML === '') {
        ajaxReq('GET', `${BASE_URL}/${HOME_HTML_ENDPOINT}`, {}, 'text').then((res) => {
            insertHTML('#root', res);
            ajaxReq('GET', `${BASE_API_URL}/exchange-rates?key=${API_KEY}`, {}, 'json').then((data) => {
                exchangeRateData = data;
                let content = "<option value='NA'>Select Currency</option>";
                for (let i = 0; i < exchangeRateData.length; i++) {
                    content += `<option value="${exchangeRateData[i].currency}">${exchangeRateData[i].currency}</option>`
                }

                insertHTML('#currencyCode', content);
                homePageHTML = document.getElementById('root').innerHTML;
                homePageFunctionality();
            })
        })
    }
    else {
        insertHTML('#root', homePageHTML);
        homePageFunctionality();
    }
}
function buildAboutHTML() {
    showPageLoading();
    if (aboutPageHTML === '') {
        ajaxReq('GET', `${BASE_URL}/${ABOUT_HTML_ENDPOINT}`, {}, 'text').then((res) => {
            aboutPageHTML = res;
            insertHTML('#root', aboutPageHTML);
        })
    }
    else {
        insertHTML('#root', aboutPageHTML);
    }
}

function buildExchangeRateHTML() {
    showPageLoading();
    if (exchangeRateHTML === '') {
        ajaxReq('GET', `${BASE_API_URL}/exchange-rates?key=${API_KEY}`, {}, 'json').then((data) => {
            exchangeRateData = data;
            exchangeRateHTML = buildExchangeRateTable(exchangeRateData);
            insertHTML('#root', exchangeRateHTML);
        })
    }
    else {
        insertHTML('#root', exchangeRateHTML);
    }
}

//homepage intilised
buildHomeHTML();