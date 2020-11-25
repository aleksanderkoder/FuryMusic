<?php
session_start();

$servername = "localhost";
$username = "id15398232_furydb";
$password = "Konbra7250**";

// Create connection
$conn = new mysqli($servername, $username, $password,"id15398232_furymusicdb");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
  echo json_encode("Can't connect to database");
}

$sql = "SELECT * FROM Songs";
$res = $conn->query($sql);

if($conn->affected_rows > 0 && $_SESSION["loggedIn"]) 
{
    // $UserInfo = array();
    // while($res->fetch_object())
    // {
    //     $UserInfo[] = $res->fetch_object()->SongID;
    //     $UserInfo[] = $res->fetch_object()->ArtistName;
    //     $UserInfo[] = $res->fetch_object()->SongName;
    //     $UserInfo[] = $res->fetch_object()->URL;
    // }

    // echo json_encode($UserInfo);
    echo json_encode("ja");
}
else
{
    echo json_encode("Error occurred when fetching all songs");
}


?>