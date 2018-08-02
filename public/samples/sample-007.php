<?php

// ....

$request = new HttpRequest();
$request->setUrl('https://api1.testnet.originalmy.com/login/image');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'Postman-Token' => 'b1952512-7a24-1bb8-fc09-4cf638c7c072',
  'Cache-Control' => 'no-cache',
  'Content-Type' => 'application/json',
  'Authorization' => 'Chave de API fornecida pela OriginalMy'
));

$request->setBody('{ 
    "cid": "ID do CLiente fornecida pela OriginalMy",
    "token": "Fornecido pela API de usuário"
}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

// ....