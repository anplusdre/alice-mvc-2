<?php


header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
if(!isset($_POST)) die();
session_start();
$response = [];
$con = mysqli_connect('localhost', 'root', '', 'loginus');
//$con = mysqli_connect('localhost:3306', 'lizw8739_andre', '@Defalt123', 'lizw8739_agent');
$username = mysqli_real_escape_string($con, $_POST['username']);
$password = mysqli_real_escape_string($con, $_POST['password']);
$query = "SELECT * FROM `lusers` WHERE username='$username' AND password='$password'";
$result = mysqli_query($con, $query);
if(mysqli_num_rows($result) > 0) {
	$response['status'] = 'loggedin';
	$response['user'] = $username;
	$response['id'] = md5(uniqid());
	$_SESSION['id'] = $response['id'];
	$_SESSION['user'] = $username;
} else {
	$response['status'] = 'error';
}
echo json_encode($response);


?>
