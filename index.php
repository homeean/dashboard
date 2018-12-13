<?php

require __DIR__ . '/vendor/autoload.php';

use Proxy\Proxy;
use Proxy\Adapter\Guzzle\GuzzleAdapter;
use Proxy\Filter\RemoveEncodingFilter;
use Zend\Diactoros\ServerRequestFactory;

//load config
try {
    $config = json_decode(file_get_contents(__DIR__ . '/config.json'));
} catch(Exception $e) {
    throw new Error("Cant't load or parse config file");
}

$request = ServerRequestFactory::fromGlobals();
$guzzle = new GuzzleHttp\Client();
$proxy = new Proxy(new GuzzleAdapter($guzzle));
$proxy->filter(new RemoveEncodingFilter());

// Manipulate the request object.
$response = $proxy->forward($request)->filter(function ($request, $response, $next) use ($config) {
    $request = $request->withHeader('User-Agent', 'homeean/1.0');
    $request = $request->withHeader('Host', $config->homee_url);
    $response = $next($request, $response);

    if ($request->getRequestTarget() === '/webapp/') {
        // Load custom css and js
        $css = '<style type="text/css">' . file_get_contents(__DIR__ . '/style.css') . '</style>';
        $js = '<script type="text/javascript">' . file_get_contents(__DIR__ . '/script.js') . '</script>';

        // Manipulate the response object.
        $content = $response->getBody()->getContents();
        $content = str_replace('</head>', $css . '</head>', $content);
        $content = str_replace('</body>', $js . '</body>', $content);

        $response = $response->withBody(GuzzleHttp\Psr7\stream_for($content));
    }

    return $response;
})->to($config->homee_url);

(new Zend\Diactoros\Response\SapiEmitter)->emit($response);