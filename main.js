// https://github.com/legobitna/currency-convert/commit/4a196a3dec899c45ea3df1257bf6e63204ba347f
// https://www.w3schools.com/css/css_dropdowns.asp
let currencyRatio = {
    USD: {
        KRW: 1228.50,
        USD: 1,
        VND: 23472.50,
        unit: "달러"
    },
    KRW: {
        KRW: 1,
        USD: 0.00081,
        VND: 19.11,
        unit: "원"
    },
    VND: {
        VND: 1,
        USD: 0.000043,
        KRW: 0.052,
        unit: "동"
    }
}
let formCurrency = "USD";
let toCurrency = "KRW";

//1. console.log(currencyRatio.USD.unit)
//2. console.log(currencyRatio['VND']['unit']);

document.querySelectorAll("#form-currency-list a").forEach(menu=>menu.addEventListener("click",function() {
    //1. 버튼을 가져온다
    //2. 버튼의 값을 바꾼다
    document.getElementById("from-button").textContent = this.textContent;
    //3. 선택된 currency 값을 변수에 저장해준다
    formCurrency = this.textContent;
}));

document.querySelectorAll("#to-currency-list a").forEach(menu=>menu.addEventListener("click", function() {
    document.getElementById("to-button").textContent = this.textContent;
    toCurrency = this.textContent;
}));

//1. 키를 입력하는 순간
//2. 환전이 되어서
//3. 환전 값이 보인다

function newConvert(type) {
    let amount = 0;
    if (type == 'from') {
        amount = document.getElementById("from-input").value;
        console.log(amount);
        let convertedAmount = amount * currencyRatio[formCurrency][toCurrency];

        document.getElementById("to-input").value = convertedAmount;
        renderKoreanNumber(amount, convertedAmount);
    } else if (type == 'to') {
        amount = document.getElementById("to-input").value;
        let convertedAmount = amount * currencyRatio[toCurrency][formCurrency];
        
        document.getElementById("from-input").value = convertedAmount;
        renderKoreanNumber(convertedAmount, amount);
    }
}

var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;

function renderKoreanNumber (form, to) {
    document.getElementById("text1").textContent = readNum(from) + currencyRatio[formCurrency].unit;
    document.getElementById("text2").textContent = readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num) {
    let resultString = "";
    let resultArray = [];

    for (let i = 0; i < unitWords.length; i++) {
        let unitResult = (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);

        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }

    for (let i = 0; i < resultArray.length; i++) {
        if (!resultArray[i])
            continue;
        
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
        console.log(resultString);
    }
    return resultString;
}