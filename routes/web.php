<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => false,
        'canRegister' => false,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/mapa', function () {
    return Inertia::render('Mapa/Index', [
        'projeto' => [
            'mapa' => [
                "id" => 1,
                "nome" => "Mapa Teste Frontend",
                "descricao" => "Esta é uma descrição do mapa para o teste de frontend da TerraQ.",
                "configuracao" => [
                    "ativo" => true,
                    "projecao" => "EPSG:4326",
                    "visaoInicial" => [
                        "x" => -49.267279,
                        "y" => -21.5229783,
                        "z" => 13
                    ],
                    "zoom" => [
                        "min" => 9,
                        "max" => 18
                    ],
                    "funcionalidades" => [
                        "escala" => true,
                        "bussola" => true,
                        "coordenadasMouse" => true,
                        "geolocalizacao" => true,
                        "popup" => true,
                        "destacarFeicoes" => true,
                        "atribuicoes" => false,
                        "graficos" => true,
                        "legenda" => true,
                        "menuContexto" => true
                    ],
                    "configuracoesLeaflet" => [
                        "atribuicaoPrefixo" => "Feito por <a href='https://agronomiq.com.br'>AgronomiQ</a>",
                        "zoomControl" => false,
                        "zoomSnap" => 1,
                        "zoomDelta" => 1,
                        "proj4text" => "+proj=longlat +datum=WGS84 +no_defs ",
                        "sistema" => "longlat",
                        "crs" => "EPSG:4326"
                    ]
                ],
                "ferramentas" => null,
                "created_at" => "2023-11-01T17:20:48.000000Z",
                "updated_at" => "2023-11-01T17:20:48.000000Z"
            ],
            'rasters' => [
                [
                    "nome" => "OpenStreetMap",
                    "alias" => "OpenStreetMap",
                    "tipo" => "overlay",
                    "tema" => [
                        "nome" => "Raster",
                        "icone" => "satellite"
                    ],
                    "metadados" => null,
                    "series" => null,
                    "legenda" => null,
                    "arquivo_s3" => null,
                    "xyz_options" => [
                        "enabled" => false,
                        "url" => "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        "subdomains" => [
                            "a",
                            "b",
                            "c"
                        ],
                        "minZoom" => 0,
                        "maxZoom" => 20,
                        "maxNativeZoom" => 19,
                        "zIndex" => 2,
                        "metadados" => [
                            "Descrição" => "OpenStreetMap é um projeto de mapa livre e colaborativo do mundo todo com informações de arruamentos, lugares, bairros, cidades, regiões, países, continentes e mares.",
                            "Fonte" => "OpenStreetMap Contributors",
                            "Data" => "2023"
                        ]
                    ],
                    "created_at" => "2023-08-30T17:20:48.000000Z",
                    "updated_at" => "2023-08-30T17:20:48.000000Z"
                ],
                [
                    "nome" => "Google Satélite",
                    "alias" => "Google Satélite",
                    "tipo" => "overlay",
                    "tema" => [
                        "nome" => "Raster",
                        "icone" => "satellite"
                    ],
                    "metadados" => null,
                    "series" => null,
                    "legenda" => null,
                    "arquivo_s3" => null,
                    "xyz_options" => [
                        "enabled" => true,
                        "url" => "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                        "subdomains" => [
                            "mt0",
                            "mt1",
                            "mt2",
                            "mt3"
                        ],
                        "attribution" => "Google",
                        "minZoom" => 0,
                        "maxZoom" => 20,
                        "maxNativeZoom" => 19,
                        "zIndex" => 1
                    ],
                    "created_at" => "2023-08-30T17:20:48.000000Z",
                    "updated_at" => "2023-08-30T17:20:48.000000Z"
                ]
            ]
        ],
    ]);
});

Route::get('/grafico', function () {
    return Inertia::render('Grafico/Index', [
        'dadosGrafico' => [
            'labels' => ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
            'datasets' => [
                [
                    'label' => 'Precipitação acumulada (mm)',
                    'data' => [200, 300, 120, 80, 30, 25],
                    'backgroundColor' => 'rgba(255, 99, 132, 0.2)',
                    'borderColor' => 'rgba(255, 99, 132, 1)',
                    'borderWidth' => 1
                ],
                [
                    'label' => 'Temperatura Média',
                    'data' => [32, 28, 27, 30, 24, 18],
                    'backgroundColor' => 'rgba(54, 162, 235, 0.2)',
                    'borderColor' => 'rgba(54, 162, 235, 1)',
                    'borderWidth' => 1
                ]
            ]
        ]
    ]);
});