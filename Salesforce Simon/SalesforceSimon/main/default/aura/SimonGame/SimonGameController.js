({

    startGame : function(component, event, helper){
        // Starts the game by initiating sequence generation and playback
        console.log("START GAME");

        component.set("v.game", true);

        helper.sequencer(component);

        /*
        while(game){

            let sequence = helper.seqGen(component.get("v.sequence"));
            component.set("v.sequence", sequence);
            helper.playSequence(component);
            component.set("allowInput", true);

            while (component.get("v.playerInput").length < sequence.length){

                if ()

            }

            component.set("v.allowInput", false);

        }
        */

    },


    playerInput : function(component, event, helper){
        // Accepts player input from one of the 4 buttons, and stores it in the player's sequence

        if (component.get("v.allowInput")){

            let input = event.getSource().get("v.label");

            helper.displayNum(component, input, 1000);

            let sequence = component.get("v.sequence");
            let currentInput = component.get("v.playerInput");



            currentInput.push(input);
            component.set("v.playerInput", currentInput);

            let currentStep = currentInput.length;
        
            if (input == sequence[currentStep-1]){
                if (currentStep == sequence.length){
                    component.set("v.playerInput", []);
                    setTimeout(function(){helper.sequencer(component);}, 1100);
                }
            }
            else
                helper.gameOver(component);
        }
    },


    endGame : function(component, event, helper){
        console.log("GAME OVER TEST");
        helper.gameOver(component);
    },


    playSequenceTest : function(component, event, helper){
        helper.playSequence(component);
    }

})
