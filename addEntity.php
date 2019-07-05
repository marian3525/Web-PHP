<?php
    include("service.php");

    $service = new Service();
    $service->addEntity(json_decode($_POST['newEntity']));
 ?>
