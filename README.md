⚠️ Please note with Heroku not offering free tier hosting anymore the "monster search" functionality will not work! However the rest of the app should work fine!
# Natural20

Natural20 is a battle tracker to be used for Dungeons & Dragons or other table-top RPGs. Natural 20 will help you track your RPG battle scenarios while maintaing factors such as initiative, turn order, health, armour class and more!

## How to Access Natural20

Natural20 can be accessed via this url:

https://natural20battletracker.web.app/

## How to Use Natural20
### 1. Use form to add battle participants
You can add battle participants by filling out the form and clicking on the "Add to Battle" button. These are the following inputs in the form:

- **Type**: Determines what type of battle participant you will be adding. Note that some fields will be disabled depending on which type is selected.
- **Name**: The name of the battle participant.
- **Monster Search**: Use this search bar to search for D&D 5e monsters. Selecting on one of the monsters will autofill their stats into the form.
- **Initiative**: The initiative of the battle participant.
- **Roll Initiative**: Select this checkbox to roll initiative for the battle participant instead of setting it in the Initiative input field.
- **Initiative Modifier**: The initiative modifier of the battle participant.
- **Armour Class**: The armour class of the battle participant.
- **Hit Points**: The hit points of the battle participant.
- **Quantity**: The number of battle participants you would like to add with the stats you filled out in the form. Note that if you add more than 1 it will automatically assign numbers to their names to differentiate (e.g. adding 3 Goblins will assign names Goblin #1, Goblin #2, and Goblin #3).

### 2. Use battle cards to track battle
After adding battle participants, use the associated battle cards below the form to track your battle. Note that the cards will be ordered by intiative. The following information and features can be found on the battle cards:

- **Type**: Labeled by an icon and located first in the header of the battle card. A Skull icon represents a monster or NPC and a user icon represents a player.
- **Name**: The name of the battle participant, which is located after the type icon in the header.
- **Initiative**: Labeled by the sort icon and located on the top left of the battle card content.
- **Armour Class**: Labeled by the shield icon andlocated on the top right of the battle card content.
- **Hit Points**: Hit points are represented by a progress bar and located in the center of the battle card content.
- **Damage Input**: This input field located underneath the Hit Points is used to damage or heal the battle participant. To damage the battle participant, input a positive value and click on the checkmark button. To heal the battale participant, input a negative value and click on the checkmark button.
- **Conditions**: Conditions can be added to a battle participant by selecting the different conditions that pop up after clicking the conditions button on the bottom left of the battle card. To remove the conditions from the battle participant, click on on the conditions in the battle card content or deselect the conditions in the conditions pop up button.
- **Delete Card**: Click on the button labeled with an "x" icon to delete the card and remove the battle participant from the battle.

### 3. Rinse and Repeat
After finishing your battle you can click on the "Delete All" button located at the bottom of the page to remove all of the current battle participants and add a new set for the next battle!

## Credits
- App built with https://reactjs.org/
- Design and styling from https://semantic-ui.com/ and icons from https://fontawesome.com/
- D&D 5e monsters from https://www.dnd5eapi.co/
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Deployed with Firebase https://firebase.google.com/
