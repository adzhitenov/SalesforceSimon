({

    startGame : function(component, event, helper){
        // Starts the game by initiating sequence generation and playback
        component.set("v.game", true);
        component.set("v.displayMessage", false);

        helper.sequencer(component);

    },


    playerInput : function(component, event, helper){
        // Accepts player input from one of the 4 buttons, and stores it in the player's sequence
        
        if (component.get("v.allowInput")){

            let input = event.getSource().get("v.label");

            clearTimeout(component.get("v.lastTimeout"));

            helper.displayNum(component, input, 1000);

            let sequence = component.get("v.sequence");
            let currentInput = component.get("v.playerInput");

            currentInput.push(input);
            component.set("v.playerInput", currentInput);

            let currentStep = currentInput.length;
        
            if (input == sequence[currentStep-1]){
                if (currentStep == sequence.length){
                    component.set("v.score", sequence.length); //Update the player's score to the last successfully completed sequence
                    component.set("v.playerInput", []);
                    setTimeout(function(){helper.sequencer(component);}, 1100);
                }
            }
            else
                helper.gameOver(component);
        }
    },


    endGame : function(component, event, helper){
        helper.gameOver(component);
    },

})