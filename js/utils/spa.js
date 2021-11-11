//navigation headers
const home_nav=document.getElementById('home_nav');
const about_nav=document.getElementById('about_nav');

home_nav.addEventListener('click',buildHomeHTML);
about_nav.addEventListener('click',buildAboutHTML);

const insertHTML = (selector, html) => {
    let targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
}

const showPageLoading = () => {
    const loading_html =
        `<img src='https://www.tectonicinteractive.com/wp-content/plugins/contact-form-7/images/ajax-loader.gif' 
         style="
         display:block;
         width: 60%;
         height:auto;
         overflow-y:hidden;
         margin-left: auto;
         margin-right: auto;"/>`
    insertHTML('#root', loading_html);
}

const BASE_URL = "http://127.0.0.1:5500"

const HOME_HTML_ENDPOINT = 'snippets/home.html'
const ABOUT_HTML_ENDPOINT='snippets/about.html'
function buildHomeHTML() {
    showPageLoading();
    ajaxReq('GET', `${BASE_URL}/${HOME_HTML_ENDPOINT}`, {}, 'text').then((res) => {
        console.log(res);
        insertHTML('#root', res);
        homePageFunctionality();
    })
}
buildHomeHTML();

function buildAboutHTML(){
    showPageLoading();
    ajaxReq('GET', `${BASE_URL}/${ABOUT_HTML_ENDPOINT}`, {}, 'text').then((res) => {
        console.log(res);
        insertHTML('#root', res);
    })
}