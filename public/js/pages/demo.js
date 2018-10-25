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
    window.OMID = new OMID('01', 'stag', ['name', 'blockchainid', 'email', 'photo', 'latitude', 'longitude','photodocument','photoresidence'], function(result){
        if(result.auth && result.nonce){
            callAuth(result.nonce);
        }
    });
    
    function callAuth(nonce){
        $.ajax({
            url : "/demo/auth/" +nonce,
            success: callAuthSuccess,
            error: function(result) {
                console.error(result);
            },
        })
    }

    function callAuthSuccess(resultCallback)
    {
        var emailHash = CryptoJS.HmacSHA256(resultCallback.email.value, resultCallback.blockchainid.value);
        var nameHash = CryptoJS.HmacSHA256(resultCallback.name.value, resultCallback.blockchainid.value);

        var validationRequest = {
            email: emailHash.toString()
            , name: nameHash.toString()
        }

        $.ajax({
            url : "https://api1.originalmy.com/users/validate-hash-user-data/" + resultCallback.blockchainid.value,
            headers: {
                'authorization': 'T1JJRy04NzQyLURFVlY='
            },
            data: validationRequest,
            type: "post",
            success: (result) => {
                debugger;
                var rsEmail = result.data.valdation_info.filter((item) => item.key == 'email')[0];
                var rsName = result.data.valdation_info.filter((item) => item.key == 'name')[0];

                loginSession.find('span.log-user-email').html(resultCallback.email.value + ', <b>Informacao validada por hmac:</b> ' + (rsEmail.valid === true ? "Sim" : "Não"));
                loginSession.find('span.log-user-name').html(resultCallback.name.value + ', <b>Informacao validada por hmac:</b> ' + (rsName.valid === true ? "Sim" : "Não"));
                loginSession.find('span.log-user-blockchainid').html(resultCallback.blockchainid.value);
                loginSession.find('span.log-user-mobile_lat').html(resultCallback.latitude.value);
                loginSession.find('span.log-user-mobile_lng').html(resultCallback.longitude.value);

                photoNonce = resultCallback.photodocument.value;
                startSession.hide();
                loginSession.show();
            },
            error: function(result) {
                console.error(result);
            },
            
        })

        
        
    }

    function getPhoto(){

        btnPhotoLoading(true);
        
        $.ajax({
            url : "/demo/get-photo/" + photoNonce,
            success: (result) => {

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