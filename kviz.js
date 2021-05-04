
seznamOtazek = [{
    cisloOtazky: "Otázka 1/3",
    zneni: "Co je ikonická hračka z 80.let?",
    foto: "obrazky/moncicak.jpg",
    moznosti: [{
            moznost: "Kočičák",
            typ: false
        }, {
            moznost:"Mončičák",
            typ: true
        }, {
            moznost:"Opičák",
            typ: false
    }] 
}, {
    cisloOtazky: "otázka: 2/3",
    zneni: "Jaké je Matějovo nejoblíbenější ovoce?",
    foto: "obrazky/ovoce.jpg",
    moznosti: [{
            moznost: "Kokos",
            typ: false
        }, {
            moznost: "Melounek",
            typ: false
        }, {
            moznost:"Jahoda",
            typ: true
        }, {
            moznost: "Ani jedna z možností",
            typ: false
    }]
}, {
    cisloOtazky: "otázka 3/3",
    zneni: "Pro úspěšné absolvování kurzu je potřeba...",
    foto: "obrazky/pivo.jpg",
    moznosti: [{
        moznost: "Umět JavaScript",
        typ: true
    }, {
        moznost: "Chodit po kurzu do hospody",
        typ: false
    }]
}]


let i =0;

let body = document.querySelector('body');
let ramecek = document.createElement("div");

let boxMoznosti = document.createElement("div");
let obsah = document.createElement("div");
let poradi = document.createElement("p");
let otazka = document.createElement("p");
let obrazek = document.createElement("img");
let divObrazku = document.createElement("div");

let seznam = document.createElement("ul");
let poleOdpovedi = []

let tvojeHodnoceni = document.createElement("p");
let celkoveZhodnoceni = document.createElement("p");

//funkce se spustí při načtení stránky a vytvoří elementy pro první stranu/otázku
function prvni() {
    //obrázek k otázce
    obrazek.className = ("obrazek");
    obrazek.src = seznamOtazek[i].foto;

    // div obrázku
    divObrazku.className = ("foto");
    divObrazku.appendChild(obrazek);
        
    
    //seznam s možnostmi odpovědí
    seznam.className = ("odpovedi");



    for (let a = 0; a < seznamOtazek[i].moznosti.length; a++){

        item = document.createElement("li");
        seznam.appendChild(item);

        item.className = ("odpovedi li");
        item.innerText = seznamOtazek[i].moznosti[a].moznost;

        item.addEventListener("click", uloz);
        item.addEventListener("click", dalsi);

        function uloz() {
            poleOdpovedi.push(a);
            console.log(poleOdpovedi);
        }
    }


    // div, který obaluje možnosti odpovědí
    boxMoznosti.className = ("moznosti");
    boxMoznosti.appendChild(seznam);

    //div, který obaluje obrázek a možnosti odpovědí
    //let obsah = document.createElement("div");
    obsah.className = ("obsah");
    obsah.appendChild(divObrazku);
    obsah.appendChild(boxMoznosti);

    //znění otázky
    otazka.className = ("otazka");
    otazka.innerHTML = seznamOtazek[i].zneni;

    //pořadí otázky
    poradi.className = ("poradi");
    poradi.innerHTML = seznamOtazek[i].cisloOtazky;

    //bílý rámeček, který to všechno obaluje
    ramecek.className = ("kviz");
    ramecek.appendChild(poradi);
    ramecek.appendChild(otazka);
    ramecek.appendChild(obsah);

    body.appendChild(ramecek);

   
}


//načtení další strany/otázky
function dalsi() {
    
    //vymazání možnéstí z minulé otázky
    for(b = 0; b < seznamOtazek[i].moznosti.length; b++){
        seznam.removeChild(seznam.childNodes[0])
    };
    
    boxMoznosti.removeChild(seznam);
    divObrazku.removeChild(obrazek);
    obsah.removeChild(divObrazku);
    obsah.removeChild(boxMoznosti);
    ramecek.removeChild(poradi);
    ramecek.removeChild(otazka);
    ramecek.removeChild(obsah);
    body.removeChild(ramecek);
   
    i++;
    
   if (i <= 2) {
    prvni();
   } else {
       zaver();
   }
    
}

//funkce, která zbrazuje poslední stranu/zhodnocení
function zaver () {
    
    body.appendChild(ramecek);

    //bílý rámeček, který to všechno obaluje
    ramecek.className = ("kviz");
    ramecek.appendChild(tvojeHodnoceni);
    

    //nadpis Tvoje hodnocení
    tvojeHodnoceni.className = ("tvojeHodnoceni");
    tvojeHodnoceni.innerHTML = "TVOJE HODNOCENÍ";
 

    //znění otázek a jejich vyhodnocení odpovědí
    let skore = 0;

    for (x=0; x < seznamOtazek.length; x++) {
        
        //znení otázky
        let vypisOtazka = document.createElement("p");
        vypisOtazka.className = ("vypisOtazka");
        vypisOtazka.innerHTML = (x+1) + ". " + seznamOtazek[x].zneni;
        ramecek.appendChild(vypisOtazka);

        //vybraná odpověď uživatelem
        let tvojeOdpoved = document.createElement("p");
        tvojeOdpoved.className = ("h1");
        tvojeOdpoved.innerHTML = "Tvoje odpověď: " + seznamOtazek[x].moznosti[poleOdpovedi[x]].moznost
        ramecek.appendChild(tvojeOdpoved);

        //Vvyhodnocení zakliknuté možnosti
        let zhodnoceniOdpovedi = document.createElement("p");
        zhodnoceniOdpovedi.className = ("h1");
        ramecek.appendChild(zhodnoceniOdpovedi);

        console.log (seznamOtazek[x].moznosti[0].typ)

        if (seznamOtazek[x].moznosti[poleOdpovedi[x]].typ === true ) {
            zhodnoceniOdpovedi.innerHTML = "Toto je správně!"
            skore ++;
        } else {
            
           for (let f = 0; f < seznamOtazek[x].moznosti.length; f++) {
               if (seznamOtazek[x].moznosti[f].typ === true) {
                   zhodnoceniOdpovedi.innerHTML = "Správná odpověď: " + seznamOtazek[x].moznosti[f].moznost;
               } 
           }
            
        }

    }

    //Celkové zhodnocení

    let procentualniUspesnost = Math.round(skore/seznamOtazek.length*100);

    
    ramecek.appendChild(celkoveZhodnoceni); 
    celkoveZhodnoceni.innerHTML = "Správně " + skore + " ze " + seznamOtazek.length + " otázek. Úspěšnost " + procentualniUspesnost + " %."
    celkoveZhodnoceni.className = ("tvojeHodnoceni");
    

}
    

    















