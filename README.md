# QYourself

Bienvenue sur **QYourself**, une application de quiz personnalisés développée avec ElectronJS. Cette application vous permet de créer et de réaliser des quiz personnalisés en utilisant des fichiers JSON au format spécifique.

## Fonctionnalités

- **Quiz personnalisés** : Chargez vos propres fichiers JSON pour créer des quiz adaptés à vos besoins.
- **Deux modes de jeu** :
  - *Résultat Immédiat* : Obtenez des retours instantanés après chaque question.
  - *Test Réel* : Recevez vos résultats à la fin du quiz.
- **Support multimédia** : Intégrez des images dans vos questions pour une expérience enrichie.
- **Compatibilité multiplateforme** : Disponible pour Windows (`.exe`) et Linux (`.deb`).

## Installation

### Windows

1. Téléchargez le fichier `QYourself-Setup-x.x.x.exe` depuis la section [Releases](https://github.com/Nolan-BY/QYourself/releases) du dépôt GitHub.
2. Exécutez le fichier téléchargé et suivez les instructions à l'écran pour installer l'application.

### Linux

1. Téléchargez le fichier `QYourself-x.x.x.deb` depuis la section [Releases](https://github.com/Nolan-BY/QYourself/releases) du dépôt GitHub.
2. Installez le paquet en utilisant votre gestionnaire de paquets préféré ou en exécutant la commande suivante dans le terminal :

   ```bash
   sudo dpkg -i QYourself-x.x.x.deb
   ```

   Remplacez `x.x.x` par le numéro de version correspondant.

## Utilisation

1. **Lancement de l'application** : Ouvrez QYourself depuis votre menu d'applications ou en exécutant la commande `qyourself` dans le terminal.
2. **Chargement d'un quiz** :
   - Glissez-déposez un fichier JSON contenant vos questions dans la zone désignée de l'application ou cliquez pour sélectionner un fichier.
   - Assurez-vous que le fichier JSON respecte le format requis (voir section suivante).
3. **Configuration du quiz** :
   - Sélectionnez le mode de jeu : *Résultat Immédiat* ou *Test Réel*.
   - Choisissez le nombre de questions si votre fichier en contient plus de 20.
4. **Démarrage du quiz** : Cliquez sur "Démarrer" pour commencer le quiz.
5. **Navigation dans le quiz** :
   - Répondez aux questions en sélectionnant les choix appropriés.
   - En mode *Résultat Immédiat*, cliquez sur "Valider" pour vérifier votre réponse avant de passer à la suivante.
   - En mode *Test Réel*, répondez à toutes les questions puis cliquez sur "Suivant" pour avancer.
6. **Résultats** : À la fin du quiz, consultez votre score et les explications pour chaque question.

## Format du fichier JSON

Pour que QYourself puisse lire et interpréter correctement vos quiz, vos fichiers JSON doivent respecter la structure suivante :

```json
{
    "Questions": {
        "1": {
            "Q": "Votre question ici",
            "Choices": {
                "C1": "Choix 1",
                "C2": "Choix 2",
                "C3": "Choix 3",
                "C4": "Choix 4"
            },
            "Answer": ["C1"],
            "Expl": "Explication de la réponse.",
            "Image": "nom_de_l_image.png"
        },
        "2": {
            "Q": "Votre question ici",
            "Choices": {
                "C1": "Choix 1",
                "C2": "Choix 2",
                "C3": "Choix 3",
                "C4": "Choix 4"
            },
            "Answer": ["C2", "C3"],
            "Expl": "Explication de la réponse."
        }
    }
}
```

**Détails** :

- `Questions` : Contient l'ensemble des questions du quiz.
  - Chaque question est identifiée par un numéro unique.
  - `Q` : Énoncé de la question. Peut inclure du HTML pour le formatage.
  - `Choices` : Liste des choix possibles pour la question.
  - `Answer` : Liste des identifiants des bonnes réponses (par exemple, `["C1"]` pour une seule réponse correcte, `["C2", "C3"]` pour des réponses multiples).
  - `Expl` : Explication de la réponse correcte. Peut inclure du HTML pour le formatage.
  - `Image` : Nom du fichier image associé à la question (si applicable). L'image doit être placée dans le même dossier que le fichier JSON.

**Remarques** :

- Les fichiers JSON doivent être encodés en UTF-8.
- Les champs `Expl` et `Image` sont facultatifs, mais recommandés pour une meilleure expérience utilisateur.

## Développement

QYourself est développé en utilisant [Electron](https://www.electronjs.org/), ce qui permet de créer des applications de bureau multiplateformes avec JavaScript, HTML et CSS.

**Structure du projet** :

- `main.js` : Point d'entrée principal de l'application. Initialise la fenêtre principale et gère les événements principaux.
- `index.html` : Page HTML principale affichée dans la fenêtre de l'application.
- `css/` : Contient les fichiers CSS pour le style de l'application.
- `js/` : Contient les scripts JavaScript pour la logique côté client.
- `assets/` : Contient les ressources telles que les images et les polices.

**Scripts principaux** :

- `startnconfig.js` : Gère le chargement des fichiers JSON, la configuration du quiz et le démarrage du jeu.
- `questions.js` : Gère l'affichage des questions, la validation des réponses et l'affichage des résultats.

## Licence

Ce projet est sous licence [GPL-3.0](https://github.com/Nolan-BY/QYourself/blob/main/LICENSE).

---

Merci d'utiliser QYourself ! Nous espérons que cette application vous aidera à créer et à profiter de quiz personnalisés adaptés à vos besoins.
