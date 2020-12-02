<?php 

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


    if($conn->affected_rows > 0) 
    {
        $UserInfo = array();
        while($row = $res->fetch_object())
        {
            $UserInfo[] = $row->SongID;
            $UserInfo[] = $row->ArtistName;
            $UserInfo[] = $row->SongName;
            $UserInfo[] = $row->URL;
        }
    
        echo json_encode($UserInfo);
        }
        else
        {
            echo json_encode("Error occurred when fetching all songs");
        }    




?>