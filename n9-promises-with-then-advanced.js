const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function skaiciausIvedimas(msg) {
    return new Promise((resolve, reject) => {
        rl.question(msg, data => {
            resolve(parseInt(data));
        });
    });
}

async function tekstoIvedimas(msg) {
    return new Promise((resolve, reject) => {
        rl.question(msg, data => {
            resolve(data);
        });
    });
}

function readFile(name, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(name, options, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

async function main() {
    const failuPavadinimai = (await tekstoIvedimas("Įvesk failų pavadinimus atskirtus tarpais, kuriuos nori perskaityti:")).split(' ');
    // console.log(failuPavadinimai);
    var allData = '';
    let data = '';
    url = './n9-failai/';

    let i = 0;
    console.log('failai: ', failuPavadinimai);
    console.log('kiek failu: ', failuPavadinimai.length);

    getFileContent();

    function getFileContent() {
        let failas = readFile(`./n9-failai/${failuPavadinimai[i]}`, 'utf-8');

        failas
            .then(data => {
                i++;
                // console.log('koeficientas: ', i);
                allData += data + '   ';
                // console.log(allData);
                if (i < failuPavadinimai.length) {
                    getFileContent();
                } else {
                    console.log('Rezultatas: ', allData);
                }
            })
            .catch(error => {
                console.log('\n--------------------');
                console.log('Toks failas nerastas. Detali informacija', error)
            })
    }
    rl.close();
}
main();



/*
paprasyti ivesti failo varda
perskaityti faila
jei perskaite be klaidu - atspausdinti teksta
jei klaidos - atspausdinti klaida

*)
paprasyti ivesti failo vardus (atskirtus tarpais)
pvz: Ivesk failu fardus: a.txt b.txt d.txt
suskaldot stringa per tarpa - gaunat masyva su failu pavadinimais
perskaitot visus failus nurodyta tvarka
jei perskaite be klaidu - kaupti teksta kintamajame
jei klaidos - atspausdinti klaida
pabaigoj atspausdinti sukaupta teksta


*/