let dataPaises = null,
dataFavorites = null,
countCountries = 0,
countFavorites = 0,
totalPopulationList = 0,
totalPopulationFavorites = 0;
let data = null;
let data2 = [];

window.addEventListener('load', () => {
    dataPaises = document.querySelector("#tabCountries");
    dataFavorites = document.querySelector("#tabFavorites");
    countCountries = document.querySelector("#countCountries");
    countFavorites = document.querySelector("#countFavorites");
    totalPopulationList = document.querySelector("#totalPopulationList");
    totalPopulationFavorites = document.querySelector("#totalPopulationFavorites");

    numberFormat = Intl.NumberFormat('pt-BR')
    fetchCountries();
});


async function fetchCountries(){
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    data = json.map(country => {
        const {name, numericCode, population, flag} = country;
        return {
            name,
            numericCode,
            population,
            flag,
            formattedPopulation: formatNumber(population)            
        }
    });
    render();
    console.log(data);
    // for (let i = 0; i < data.lenght; i++){
    //     console.log(data[i].numericCode);
    // }
}

function render(){
    showCountries();
    showFavorites();
    renderSummary(); 
}

function showCountries(){
    let countriesHTML = '<div>';
    data.forEach(country => {
        const {name, numericCode, population, flag, formattedPopulation} = country;
        const id = parseInt(numericCode);
        const resposta = `
        <div class='country'>       
        <button onclick="addToFavorites(${id})">Fav</button>        
        <img src='${flag}' alt="Country Flag" width="500" height="600">
        <div class='name'>${name}</div>
        <div>${formattedPopulation}</div>        
        <div class='numero'>${numericCode}</div>
        </div>`;
        countriesHTML += resposta;
    });
    countriesHTML += '</div>';
    dataPaises.innerHTML = countriesHTML;
}
function showFavorites(){    
    let favoritesHTML = '<div>'; 
    data2.forEach(country => {
        const {name, numericCode, population, flag} = country;
        const id = parseInt(numericCode);
        const formattedPopulation = formatNumber(population);
        const resposta = `
        <div class='country'>
        <button onclick="addToCountries(${id})">Remov</button>
        <img src='${flag}' alt="Country Flag" width="500" height="600">
        <div class='name'>${name}</div>
        <div>${formattedPopulation}</div>        
        <div class='numero'>${numericCode}</div>
        </div>`;
        favoritesHTML += resposta;        
    });    
    favoritesHTML += '</div>';
    dataFavorites.innerHTML = favoritesHTML;

}


function addToFavorites(id){    
    const returnValue = data.find((country) => country.numericCode == id);        
    data2 = [...data2, returnValue];
    data = data.filter(country => country.numericCode != id);
    render();   
}

function addToCountries(id){
    const returnValue2 = data2.find((country) => country.numericCode == id);        
    data = [...data, returnValue2];
    data2 = data2.filter(country => country.numericCode != id);
    render();
}

function renderSummary(){
    countCountries.textContent = data.length;
    countFavorites.textContent = data2.length;

    const totalPopulation = data.reduce((acc, cur) => {
        return acc + cur.population;        
    }, 0);
    const totalFavorites = data2.reduce((acc, cur) => {
        return acc + cur.population;        
    }, 0);

    totalPopulationList.textContent = formatNumber(totalPopulation);
    totalPopulationFavorites.textContent = formatNumber(totalFavorites);
    
}

function formatNumber(number){
    return numberFormat.format(number);
}