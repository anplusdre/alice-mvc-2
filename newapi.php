<?php
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "application");

$result = $conn->query("SELECT * FROM talents");

$outp = array();
while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $outp
        [$rs["id"]] = [
        "images" => $rs["images"],
        "images02" => $rs["images02"],
        "images03" => $rs["images02"]
    ];
}
$conn->close();

echo (json_encode($outp));
?>
