// Créer un jeu simple de devinette de nombre. Le jeu choisit aléatoirement un nombre 
// entre 1 et 100, puis il met le joueur au défi de le deviner en 10 tentatives maxi.À chaque tour, le 
// joueur doit être informé s'il a deviné ou non le bon nombre — si ce n'est pas le cas, le jeu lui 
// indique si son estimation est trop basse ou trop élevée.Le jeu se termine quand le joueur a deviné le nombre mystère, ou 
// s'il a épuisé ses 10 chances. À la fin du jeu, le joueur a la possibilité de débuter une nouvelle 
// partie.
// Bonus : Le jeu doit également rappeler au joueur les 
// nombres déjà proposés

//* Nombre d'essais
let essais = 10;

//* génère un chiffre au hasard entre 1 et 100 (inclus)
const randomNumber = Math.floor(Math.random() * 100) + 1 /* le + 1 pour commencer à 1 et non pas à zéro */;

//* récupérer le bouton
const bouton = document.querySelector(".btn");

//* Je créé un tableau vide pour "enregistrer" toutes les valeurs saisies par le joueur lors du jeu
const tableauSaisies = [];

bouton.addEventListener("click", () => {    //* on gère l'évènement "onclick" sur le bouton de jeu
    
    //* récupérer le nombre saisi par le joueur
    let nbreSaisi = parseInt(document.querySelector("#nombre").value);

    //* je boucle pour limiter le nombre de tentatives selon le chiffre défini dans "essais"
    if(essais > 0) {        
        
        //* SI LE CHIFFRE EST LE BON
        if(nbreSaisi === randomNumber){
            document.querySelector("#jouer").classList.add("cache");
            document.querySelector("#nbreTours").classList.add("cache");
            document.querySelector("#result").classList.add("bg-success");
            document.querySelector("#result").innerHTML = `Tu as saisi le chiffre ${nbreSaisi}, Bravo, c'est le bon chiffre !`;
            document.querySelector("#divCache").classList.remove("cache");
            essais = 0;
        }
        //* je vérifie qu'il y ai bien une saisie...
        else if(isNaN(nbreSaisi)){
            document.querySelector("#result").innerHTML = `Tu n'as rien saisi... On te demande un chiffre entre <strong>1</strong> et <strong>100</strong> !!!`;
            document.querySelector("#result").removeAttribute("class");
            document.querySelector("#result").classList.add("bg-warning");
        }
        //* je vérifie que le chiffre saisi soit bien entre 1 et 100
        else if(nbreSaisi < 0 || !nbreSaisi){
            document.querySelector("#result").innerHTML = `Tu as saisi le chiffre <strong>${nbreSaisi}</strong>... On te demande un chiffre entre <strong>1</strong> et <strong>100</strong> !!!`;
            document.querySelector("#result").removeAttribute("class");
            document.querySelector("#result").classList.add("bg-warning");
        }
        //* SINON
        else{
            //* si le nombre saisi est inférieur au chiffre généré aléatoirement
            if(nbreSaisi < randomNumber){
                document.querySelector("#result").innerHTML = `Tu as saisi le chiffre <strong>${nbreSaisi}</strong>, c'est trop bas !`;
                document.querySelector("#result").removeAttribute("class");
                document.querySelector("#result").classList.add("bg-warning");
            }
            //* si le nombre saisi est supérieur au chiffre généré aléatoirement
            if(nbreSaisi > randomNumber){
                document.querySelector("#result").innerHTML = `Tu as saisi le chiffre <strong>${nbreSaisi}</strong>, c'est trop haut !`;
                document.querySelector("#result").removeAttribute("class");
                document.querySelector("#result").classList.add("bg-warning");
            }
            
            //* je rajoute la valeur du nombre saisi dans le tableau "tableauSaisies"
            tableauSaisies.push(nbreSaisi);
            document.querySelector("#nbresSaisis").innerHTML = `Tu as saisi ces nombres ${tableauSaisies}.`;

            //* j'enlève "1" à "essais"
            essais -= 1;
            document.querySelector("#nbreTours").innerHTML = `Il te reste ${essais} essais.`;
        }   

    }
    else{
    //* Le joueur à dépassé les 10 tentatives, on masque le jeu et on lui écrit un message
    document.querySelector("#jouer").classList.add("cache");
    document.querySelector("#nbreTours").classList.add("cache");
    document.querySelector("#result").innerHTML = `C'est terminé ! Le nombre mystère était : <strong>${randomNumber}</strong>`;
    document.querySelector("#result").removeAttribute("class");
    document.querySelector("#result").classList.add("bg-warning");
    document.querySelector("#divCache").classList.remove("cache");
    }
});

//* fonction pour recharger la page et rejouer au click sur le bouton dédié
const boutonRejouer = document.querySelector("#rejouer");
boutonRejouer.addEventListener("click", () => {
    document.location.reload();    
})