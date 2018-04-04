<?php

//...
$app = new \Slim\App;
// ...

$app->get('/auth/{nonce}', function (Request $request, Response $response, array $args) {
    
    $urlAPI = 'https://api1.testnet.originalmy.com/login/user';
    $CID = '01';
    $OMID_KEY = 'ORIG-8742-DEVV';
    $CRYPTOGRAPHY_KEY ='27F5DB12FB4F4D1A9EDE13E7C91CA99A';
    $IV = "9383KJSKLL209329";
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