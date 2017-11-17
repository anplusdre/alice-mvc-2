<?php
//header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "application");

$result = $conn->query("SELECT * FROM talents");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"' . $rs["id"] . '",';
    $outp .= '"path":"' . $rs["path"] . '",';
    $outp .= '"tag":"'  . $rs["tag"] . '",';
    $outp .= '"name":"'   . $rs["name"]        . '",';
    $outp .= '"video":"'   . $rs["video"]        . '",';
    $outp .= '"images":"'. $rs["images"]     . '",';
     $outp .= '"images02":"'. $rs["images02"] . '",'; 
     $outp .= '"images03":"'. $rs["images03"] . '",';
    $outp .= '"skills":"'. $rs["skills"]     . '",';
    $outp .= '"skills02":"'. $rs["skills02"]     . '",';
    $outp .= '"indexing":"'. $rs["indexing"] . '",';
    $outp .= '"gender":"'. $rs["gender"] . '",';
    $outp .= '"age":"'. $rs["age"] . '",';
    $outp .= '"domicile":"'. $rs["domicile"] . '"}';
}
$outp ='{"talents":['.$outp.']}';
$conn->close();

echo($outp);
?>
