<?php
  include("service.php");

  $service = new Service();

  $entities = $service->getAll();

  echo json_encode($entities);
 ?>
