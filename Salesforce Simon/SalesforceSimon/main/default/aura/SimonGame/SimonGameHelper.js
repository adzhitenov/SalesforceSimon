({

    nextSeq : function(min, max){
        console.log("NEXT SEQ");
        return (Math.floor(Math.random()*(max-min+1)) + min);
    },


    seqGen : function(sequence){
        console.log("SEQ GEN");
        let newNum = this.nextSeq(1,4);
        console.log(newNum);
        sequence.push(newNum);
        console.log("PUSHED");
        return sequence;
    },


    playSequence : function(component){

        let sequence = component.get("v.sequence");
        console.log("HELPER");
        for (let iii=0; iii<sequence.length; ++iii){
            console.log("FOR" + iii);
            setTimeout(function(){
                console.log("TIMEOUT" + iii);
                component.set("v.current", sequence[iii]);
            }, 1000*iii);
        }
    },


    gameOver : function(component){
        // Ends the game by re-setting sequence and playerInput to empty arrays
        console.log("GAME OVER");
        component.set("v.sequence", []);
        component.set("v.playerInput", []);
    }
})
