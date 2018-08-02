<?php

//...
$app = new \Slim\App;
// ...

$app->get('/auth/{nonce}', function (Request $request, Response $response, array $args) {
    
    $urlAPI = 'https://api1.testnet.originalmy.com/login/user';
    $CID = 'ID do CLiente fornecida pela OriginalMy';
    $OMID_KEY = 'Chave do OMID fornecida pela OriginalMy';
    $CRYPTOGRAPHY_KEY ='Chave de criptografia fornecida pela OriginalMy';
    $IV = "Chave de criptografia fornecida pela OriginalMy";
    $ALGORITHM = 'AES-256-CBC';
    $nonce = $args['nonce'];

    $client = new GuzzleHttp\Client();

    $result = $client->request('POST', $urlAPI, [
        'headers' => [
            'Content-Type'    => 'application/json',
            'Authorization'   => $OMID_KEY
        ],
        'json' => [
            "cid" => $CID,
            "nonce" => $nonce,
        ]
    ]);

    $json = json_decode($result->getBody());

    $jsonOut = [];

    if($json->data->user){
        $base64D = base64_decode($json->data->user);
        $stringOut = openssl_decrypt( $base64D, $ALGORITHM, $CRYPTOGRAPHY_KEY, TRUE, $IV);
        $jsonOut = json_decode($stringOut);
    } else {
        $jsonOut['status'] = FALSE;
    }

    return $response->withJson($jsonOut, 200);
    
});

// ....