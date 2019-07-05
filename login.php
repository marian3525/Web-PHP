<?php
  include("service.php");

  $username = $_POST['username'];
  $password = $_POST['password'];
  
  $service = new Service();

  $auth = $service->checkUser($username, $password);
  echo json_encode($auth);
 ?>
