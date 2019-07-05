<<?php
    include("service.php");

    // get delete arguments
    $method = $_SERVER['REQUEST_METHOD'];

    $params =[];
    if ($method == "PUT") {
        parse_str(file_get_contents('php://input'), $params);
        $GLOBALS["_{$method}"] = $params;
    }

    $service = new Service();

    $service->updateEntity(json_decode($_PUT['updated']));
    //echo $_PUT['updated'];
?>
