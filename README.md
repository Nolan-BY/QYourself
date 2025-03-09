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

### Balises HTML utilisables dans les questions

QYourself supporte certaines balises HTML dans les questions (`Q`), les choix (`Choices`), et les explications (`Expl`). Voici les balises les plus courantes que vous pouvez utiliser :

- `<br>` : Saut de ligne.
- `<code>` : Affichage de texte en style code.
- `<b>` : Texte en gras.
- `<ul>` et `<li>` : Liste à puces.
- `<ol>` et `<li>` : Liste numérotée.

**Exemple :**

```json
{
    "Questions": {
        "1": {
            "Q": "Your router is configured as follows:<br><code>R1# show run | i aaa|username<br>aaa new-model<br>username ENARSI password 0 EXAM<br>R1# show run | s vty<br>line vty 0 4<br>password cisco<br>transport input all<br>R1#</code><br>Based on the configuration, what will occur when someone uses Telnet to reach the router?",
            "Choices": {
                "C1": "<code>aaa authentication login default group radius local</code>",
                "C2": "<code>aaa authentication login<br>default group radius local</code>",
                "C3": "The user will be <code>required to use the username ENARSI</code> with the password EXAM",
                "C4": "The user will be <code>required to use the username ENARSI</code><br>with the password EXAM"
            },
            "Answer": ["C3", "C4"],
            "Expl": "The <code>show cef interface</code> command is used to verify that<ul><li>CEF is enabled on an interface</li><li>When uRPF is <code>configured on an interface</code>, the correct mode should be chosen.</li></ul>If strict mode is used when asymmetric routing occurs, <code>the legitimate<br>traffic is dropped</code><br>Where asymmetric routing might occur<ol><li>uRPF should be configured with loose mode</li><li>and where symmetric routing is guaranteed to occur</li>/ol>the strict mode <b>should be used</b>. On router interfaces that connect to subnets with end stations, strict mode is typically used, and on uplinks, loose mode is typically used."
        }
    }
}
```

### Remarques :

- Les fichiers JSON doivent être encodés en UTF-8.
- Les balises HTML doivent être correctement fermées et adaptées à l'affichage du contenu du quiz.
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
