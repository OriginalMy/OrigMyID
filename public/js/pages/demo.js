$(document).ready(() => {
    
    var startSession = $("#startSessionID");
    var loginSession = $("#loginSessionID");
    var btnBackId    = $("#btnBackId");
    var btnGetPhotoId    = $("#btnGetPhotoId");
    var photoNonce = null;
    var photoModal = $('#photoModal');


    btnBackId.on('click', () => {
        loginSession.hide();
        startSession.show();
    });

    btnGetPhotoId.on('click', getPhoto);


    /**
     * Neste retorno você era receber um objeto contendo as seguintes informações
     * { auth : true , nonce : ‘hash aleatório gerado pela plataforma’}
     */
    if(window.OMID){
        window.OMID = new OMID('06', 'stag', ['name', 'blockchainid', 'email', 'photo'], function(result){
            if(result.auth && result.nonce){
                console.info("Nonce: " + result.nonce);
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

        photoNonce = result.photo.value;
        startSession.hide();
        loginSession.show();
    }

    function getPhoto(){

        btnPhotoLoading(true);
        
        $.ajax({
            url : "/demo/get-photo/" + photoNonce,
            success: (result) => {
                console.log(result);
                btnPhotoLoading(false);
                var img = photoModal.find('img.img-photo');
                img.attr('src', result.data.image.data );
                photoModal.modal('show');
            },
            error: function(result) {
                btnPhotoLoading(false);
                console.error(result);
            },
        })
    };

    function btnPhotoLoading(flgStatus)
    {
        var fas = btnGetPhotoId.find('i.fas');
        
        if(flgStatus){
            fas.removeClass('fa-image');
            fas.addClass('fa-circle-notch fa-spin');
            btnGetPhotoId.attr('disabled', true);
        } else {
            fas.removeClass('fa-circle-notch');
            fas.removeClass('fa-spin');
            fas.addClass('fa-image');
            btnGetPhotoId.attr('disabled', false);
        }
    }

});