<?php
//header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "application");

$result = $conn->query("SELECT * FROM talents");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"images":[{"'. $rs["images"]     . '",'. $rs["images02"]     . '",'. $rs["images03"]     . '"}]}';
}
$outp ='{"img":['.$outp.']}';
$conn->close();

echo($outp);
?>
