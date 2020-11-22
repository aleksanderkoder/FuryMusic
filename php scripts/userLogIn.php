<?php
session_start();

$servername = "localhost";
$username = "id15398232_furydb";
$password = "Konbra7250**";
$inUsername = $_POST["username"];
$inPassword = $_POST["password"];

// Create connection
$conn = new mysqli($servername, $username, $password,"id15398232_furymusicdb");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
  echo json_encode("Can't connect to database");
}

$sql = "SELECT Password FROM UserAccounts WHERE Username = '$inUsername'";
$res = $conn->query($sql);

if($conn->affected_rows > 0) {
    $rad = $res->fetch_object();
    $passCheck = $rad->Password; 

    if(password_verify($inPassword,$passCheck)){
      $_SESSION["loggedIn"] = true; 
      $sql = "SELECT * FROM UserAccounts WHERE Username = '$inUsername'";
      $res = $conn->query($sql);
      $row = $res->fetch_object();
      $UserInfo = array();

      $UserInfo[0] = $row->Username;
      $UserInfo[1] = $row->Email;
      echo json_encode($UserInfo);
    }
    else {
      echo json_encode("Wrong info");
    }
}
else {
    echo json_encode("Wrong info");
}


?>