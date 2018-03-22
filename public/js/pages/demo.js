$(document).ready(() => {
    
    var startSession = $("#startSessionID");
    var loginSession = $("#loginSessionID");
    var btnBackId    = $("#btnBackId");

    btnBackId.on('click', () => {
        loginSession.hide();
        startSession.show();
    });


    /**
     * Neste retorno você era receber um objeto contendo as seguintes informações
     * { auth : true , nonce : ‘hash aleatório gerado pela plataforma’}
     */
    if(window.OMID){
        window.OMID = new OMID('01', 'stag', ['name', 'blockchainid', 'email'], function(result){
            if(result.auth && result.nonce){
                callAuth(result.nonce);
            }
        });
    }
    
    function callAuth(nonce){
        $.ajax({
            url : "/demo/auth/" +nonce,
            success: callAuthSuccess,
            error: function(result) {
                console.error(result);
            },
        })
    }

    function callAuthSuccess(result)
    {
        loginSession.find('span.log-user-email').html(result.email.value);
        loginSession.find('span.log-user-name').html(result.name.value);
        loginSession.find('span.log-user-blockchainid').html(result.blockchainid.value);

        startSession.hide();
        loginSession.show();
    }

});