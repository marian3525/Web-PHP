<?php
    include("service.php");

    // get delete arguments
    $method = $_SERVER['REQUEST_METHOD'];

    $params =[];
    if ($method == "DELETE") {
        parse_str(file_get_contents('php://input'), $params);
        $GLOBALS["_{$method}"] = $params;
    }

    $service = new Service();
    $entityId = json_decode($_DELETE['entityID']);
    $service->deleteEntityById($entityId);

    echo 'Entity deleted';
 ?>
