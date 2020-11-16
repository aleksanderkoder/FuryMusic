<?php

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
  echo json_encode("kan ikke koble til");
}

$sql = "SELECT * FROM UserAccounts WHERE Password = '$inPassword'";
$res = $conn->query($sql);


if($conn->affected_rows > 0) {
    $row = $res->fetch_object();
    $UserInfo = array();

    $UserInfo[0] = $row->Username;
    $UserInfo[1] = $row->Email;

    echo json_encode($UserInfo);
}
else{
    echo json_encode("Wrong info");
}


?>