<?php

// ....

$request = new HttpRequest();
$request->setUrl('https://api1.testnet.originalmy.com/login/image');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'Postman-Token' => 'b1952512-7a24-1bb8-fc09-4cf638c7c072',
  'Cache-Control' => 'no-cache',
  'Content-Type' => 'application/json',
  'Authorization' => 'ORIG-8742-DEVV'
));

$request->setBody('{ 
    "cid": "01",
    "token": "37f051fefce4429d"
}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

// ....