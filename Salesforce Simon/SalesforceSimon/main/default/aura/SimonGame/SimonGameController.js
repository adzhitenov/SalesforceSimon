({

    startGame : function(component, event, helper){

        console.log("START GAME");

        let currentSeq = component.get("v.sequence");
        console.log("RETRIEVED");
        let newSeq = helper.seqGen(currentSeq);
        console.log("SET");
        component.set("v.sequence", newSeq);

    },


    playerInput : function(component, event, helper){

        let input = event.getSource().get("v.label");
        console.log("INPUT");
        console.log(input);
        let currentInput = component.get("v.playerInput");
        currentInput.push(event.getSource().get("v.label"));
        console.log(currentInput);
        component.set("v.playerInput", currentInput);
        console.log(component.get("v.playerInput"));
    },


    gameOverTest : function(component, event, helper){
        console.log("GAME OVER TEST");
        helper.gameOver(component);
    },


    playSequenceTest : function(component, event, helper){
        helper.playSequence(component);
    }

})
