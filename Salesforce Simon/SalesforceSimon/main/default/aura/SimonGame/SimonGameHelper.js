({

    nextSeq : function(min, max){
        // Generate a random integer between min and max
        return (Math.floor(Math.random()*(max-min+1)) + min);
    },


    seqGen : function(sequence){
        // Generate a Simon Says sequence by adding random integers 1-4 to an array
        let newNum = this.nextSeq(1,4);
        sequence.push(newNum);

        return sequence;
    },


    sequencer : function(component){
        // Handles computer turn by adding a new number to the existing sequence, and then playing back the sequence.
        let sequence = this.seqGen(component.get("v.sequence"));
        component.set("v.sequence", sequence);
        this.playSequence(component);
    },


    playSequence : function(component){
        // Plays back the current sequence, displaying each value for seqDelay ms followed by a pause of seqPause ms
        let seqDelay = 1000;
        let seqPause = 1000;
        let sequence = component.get("v.sequence");
        let seqLength = sequence.length;

        component.set("v.allowInput", false);

        // After playback is finished, re-enable player input
        setTimeout(function(){
            component.set("v.allowInput", true);
        }, seqLength*(seqDelay + seqPause)-seqPause);

        for (let iii=0; iii<sequence.length; ++iii){

            setTimeout(function(){ 
                // Since the same number can be repeated twice, it is best to clear the display afterwards - for this purpose,
                // a pause is introduced by adding a second setTimeout() statement. Since seqPause should always be less than
                // seqPause + seqDelay, this will result in v.current being cleared of any values for some time prior to the next
                // value being displayed

                //this.displayNum(component, sequence[iii], seqPause);

                component.set("v.currentDisplay", sequence[iii]);
                setTimeout(function(){
                    component.set("v.currentDisplay", null);
                }, seqPause);

            }, (seqDelay + seqPause)*iii);
        }
    },


    displayNum : function(component, num, seqPause){
        //Displays the provided num on screen for seqPause ms, and returns a variable that can be used to stop display

        component.set("v.currentDisplay", num);

        let displayCtrl = setTimeout(function(){
            component.set("v.currentDisplay", null);
        }, seqPause);

        component.set("v.lastTimeout", displayCtrl);

        return displayCtrl;
    },


    gameOver : function(component){
        // Ends the game by re-setting sequence and playerInput to empty arrays; also displays a message with the player's score
        component.set("v.sequence", []);
        component.set("v.playerInput", []);
        component.set("v.game", false);
        component.set("v.displayMessage", true);

        setTimeout(function(){
            component.set("v.displayMessage", false);
            component.set("v.score", 0);
        }, 5000);
    }
    
})