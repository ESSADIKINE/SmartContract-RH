# DApp de Gestion RH sur Ethereum

## Prérequis
- Node.js et npm
- Ganache (blockchain locale)
- MetaMask (extension navigateur)
- Truffle

## 1. Lancer Ganache
- Ouvrez Ganache et démarrez un workspace (Ethereum local, port par défaut 7545).

## 2. Installer les dépendances
```
npm install
```

## 3. Compiler et déployer le smart contract
```
truffle compile
truffle migrate --network development
```

## 4. Lancer le frontend React
```
cd src
npm install
npm start
```

## 5. Utilisation
- Connectez MetaMask au réseau Ganache (localhost:7545).
- L'admin (première adresse Ganache) peut ajouter des employés et voir la liste.
- Un employé connecté peut voir ses propres infos.

## Structure du projet
```
/contracts         → Smart contract RHContract.sol
/migrations        → Script de déploiement Truffle
/src               → Frontend React (JS)
/public            → Fichiers publics React
/build             → Généré par Truffle après compilation
```

## Fichiers principaux
- `contracts/RHContract.sol` : Smart contract RH
- `migrations/2_deploy_contracts.js` : Script de déploiement
- `src/` : Frontend React (connexion MetaMask, ajout employé, liste, infos)

---

**Tous les fichiers sont commentés pour débutants.** 