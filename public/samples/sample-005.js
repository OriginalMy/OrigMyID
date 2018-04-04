$(document).ready(function () {

    var CID = '06';
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
        'photodocument'
    ];

    window.OMID = new OMID(CID, ENV, fields, function(result){
        if(result.auth && result.nonce){
            // ...
        }
    });

});