$(document).ready(function () {

    var CID = 'ID do CLiente fornecida pela OriginalMy';
    var ENV = 'stag';
    var fields = [
        'birthday',
        'blockchainid',
        'email',
        'name',
        'namegov',
        'id',
        'mobile_imei',
        'mobile_brand',
        'mobile_model',
        'mobile_so',
        'mobile_so_version',
        'mobile_screensize',
        'phone',
        'photo',
        'photodocument',
        'photoresidence'
    ];

    window.OMID = new OMID(CID, ENV, fields, function(result){
        if(result.auth && result.nonce){
            // ...
        }
    });

});
