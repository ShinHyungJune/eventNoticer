<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-171826909-1"></script>
    <script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'UA-171826909-1');
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{config("app.name")}}</title>

    <link rel="stylesheet" href="/css/default.css?{{\Illuminate\Support\Carbon::now()}}">
    <link rel="stylesheet" href="/css/animate.css?{{\Illuminate\Support\Carbon::now()}}">
    <link rel="stylesheet" href="/css/common.css?{{\Illuminate\Support\Carbon::now()}}">
    <link rel="stylesheet" href="/css/style.css?{{\Illuminate\Support\Carbon::now()}}">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js"></script>
</head>
<body>
<div id="app">

</div>
<script src="{{mix('/js/app.js')}}"></script>
</body>
</html>
