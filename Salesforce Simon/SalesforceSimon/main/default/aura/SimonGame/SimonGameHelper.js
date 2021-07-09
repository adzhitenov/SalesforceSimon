({

    nextSeq : function(min, max){
        // console.log("NEXT SEQ");
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
        console.log("HELPER");
        component.set("v.allowInput", false);

        // After playback is finished, re-enable player input
        setTimeout(function(){
            component.set("v.allowInput", true);
        }, seqLength*(seqDelay + seqPause)-seqPause);

        for (let iii=0; iii<sequence.length; ++iii){
            console.log("FOR" + iii);

            setTimeout(function(){ 
                // Since the same number can be repeated twice, it is best to clear the display afterwards - for this purpose,
                // a pause is introduced by adding a second setTimeout() statement. Since seqPause should always be less than
                // seqPause + seqDelay, this will result in v.current being cleared of any values for some time prior to the next
                // value being displayed
                console.log("TIMEOUT" + iii);
                //this.displayNum(component, sequence[iii], seqPause);

                
                component.set("v.currentDisplay", sequence[iii]);
                setTimeout(function(){
                    component.set("v.currentDisplay", null);
                }, seqPause);
                
                console.log("HELPER RETURNED");
            }, (seqDelay + seqPause)*iii);
        }
    },

/*
    component.set("v.currentDisplay", sequence[iii]);
                setTimeout(function(){
                    component.set("v.currentDisplay", null);
                }, seqPause);
*/

    displayNum : function(component, num, seqPause){
        //Displays the provided num on screen for seqPause ms, and returns a variable that can be used to stop display

        console.log("DISPLAY NUM START");

        component.set("v.currentDisplay", num);

        console.log("DISPLAY NUM");

        let displayCtrl = setTimeout(function(){
            component.set("v.currentDisplay", null);
        }, seqPause);

        return displayCtrl;
    },

    //playerInput : function()


    gameOver : function(component){
        // Ends the game by re-setting sequence and playerInput to empty arrays
        console.log("GAME OVER");
        component.set("v.sequence", []);
        component.set("v.playerInput", []);
        component.set("v.game", false);
    }
})
