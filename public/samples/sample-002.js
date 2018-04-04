$(document).ready(function () {

    window.OMID = new OMID('06', 'stag', ['name', 'blockchainid', 'email'], function(result){
        if(result.auth && result.nonce){
            callAuth(result.nonce);
        }
    });
    
    function callAuth(nonce){
        $.ajax({
            url : "/auth/" + nonce,
            success: function(result){
                // ...
            },
            error: function(result) {
                console.error(result);
            },
        })
    }

});