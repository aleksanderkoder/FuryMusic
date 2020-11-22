<?php

$servername = "localhost";
$username = "id15398232_furydb";
$password = "Konbra7250**";
$inUsername = $_POST["username"];
$inPassword = $_POST["password"];
$inEmail = $_POST["email"];

// Create connection
$conn = new mysqli($servername, $username, $password,"id15398232_furymusicdb");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
  echo json_encode("Can't connect to database");
}

$sql = "SELECT * FROM UserAccounts WHERE Username = '$inUsername' OR Email = '$inEmail'";
$res = $conn->query($sql);

if($conn->affected_rows > 0) 
{
    echo json_encode("Username taken");
}
else
{
    $inPasswordHash = password_hash($inPassword, PASSWORD_DEFAULT);
    $sql3 = "INSERT INTO UserAccounts (Username, Password, Email) VALUES ('$inUsername','$inPasswordHash','$inEmail')";
    $res3 = $conn->query($sql3);

    if($conn->affected_rows > 0) 
    {
        echo json_encode("OK");
    }
}


?>