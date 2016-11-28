<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

/*
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS', 'HEAD')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');
});
*/