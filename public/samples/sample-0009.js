var emailHash = CryptoJS.HmacSHA256(resultCallback.email.value, resultCallback.blockchainid.value);

var validationRequest = {
    email: emailHash.toString()
}

$.ajax({
    url : "https://api1.originalmy.com/users/validate-hash-user-data/" + resultCallback.blockchainid.value,
    headers: {
        'authorization': ...OMID_KEY
    },
    data: validationRequest,
    type: "post",
    success: (result) => {
        var rsEmail = result.data.valdation_info.filter((item) => item.key == 'email')[0];
        console.log(rsEmail.valid === true ? "Sim" : "Não");
    },
    error: function(result) {
        console.error(result);
    },
    
})