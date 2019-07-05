<?php
class Service {
    private $mysql_conn;

    // db config
    private $server_addr = 'localhost';
    private $username = 'templateUser';
    private $password = '123456789';
    private $db_name = 'TemplateDB';

    // connect to the DB
    function __construct() {
        $this->mysql_conn = new mysqli($this->server_addr, $this->username, $this->password, $this->db_name);

        if ($this->mysql_conn->connect_error) {
            die("Connection failed: " . $mysql_conn->connect_error);
        }
    }

    function checkUser($username, $password) {
        $query_str = "select * from Users where
              username = '$username' and password = '$password'";

        $entries = $this->mysql_conn->query($query_str);
        $result = $entries->fetch_assoc();
        $entries->close();

        if($result['username'] == null) {
          return "";
        }
        else {
          return $result['username'];
        }
    }

    function addEntity($entity) {
      $sql_str = "INSERT into `Entities`(`name`, `other_name`) values ('{$entity->header1}', '{$entity->header2}')";

      $this->mysql_conn->query($sql_str);
    }

    function getAll() {
      $query_str = "SELECT * from Entities";
      $entries = $this->mysql_conn->query($query_str);
      $result = $entries->fetch_all();
      $entries->close();

      return $result;
    }

    function deleteEntityById($eid) {
      $sql_query = 'DELETE from Entities where eid=' . $eid;
      $this->mysql_conn->query($sql_query);
    }

    function updateEntity($entity) {
      $sql_str = "UPDATE `Entities` SET `name`='{$entity->name}', `other_name`='{$entity->other_name}' WHERE eid = '{$entity->eid}'";

      $this->mysql_conn->query($sql_str);
    }
}
 ?>
