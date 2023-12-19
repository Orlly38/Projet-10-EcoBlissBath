# EcoBlissBath
Eco Bliss Bath est une start-up de 20 personnes, spécialisée dans la vente de produits de beauté écoresponsables dont le produit principal est un savon solide. 

La boutique prépare un site de vente en ligne.


# Prérequis
Vous avez besoin d'avoir Docker, Node.js, NPM, Cypress et le plugin Mochawesome


# Lancer le projet 
Back-End : 

Saisir “docker-compose up -d” dans le terminal de commande pour lancer le back-end

Saisir “docker-compose down” dans le terminal de commande pour stopper le back-end


Front-End : 

Saisir “npm install” dans le terminal de commande puis “npm start”


Cypress : 
Saisir “npx cypress run” dans le terminal de commande


# Pour obtenir un rapport de tests au format HTML

Saisir "npx cypress run --reporter mochawesome" et laisser les tests tourner


Ensuite, saisir "npx mochawesome-merge cypress/report/mochawesome-report/*.json > cypress/report/output.json" pour fusionner tous les rapports en un seul


Et pour finir, saisir "npx marge cypress/report/output.json --reportDir ./ --inline" pour convertir le rapport d'un format Json au format HTML


# Login
Identifiant: test2@test.fr

Mot de passe : testtest


# Auteur
DORCHE Aurélie

Contact : dorche.aurelie@gmail.com
