<?php


header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
if(!isset($_POST)) die();
session_start();
$response = [];
$con = mysqli_connect('localhost', 'root', '', 'login');
//$con = mysqli_connect('localhost:3306', 'lizw8739_andre', '@Defalt123', 'lizw8739_agent');
$username = mysqli_real_escape_string($con, $_POST['username']);
$password = mysqli_real_escape_string($con, $_POST['password']);
$query = "SELECT * FROM `users` WHERE username='$username' AND password='$password'";
$result = mysqli_query($con, $query);
if(mysqli_num_rows($result) > 0) {
	$response['status'] = 'loggedin';
	$response['user'] = $username;
	$response['userid'] = $username;
	$response['id'] = md5(uniqid());
	$_SESSION['id'] = $response['id'];
	$_SESSION['user'] = $username;
	$_SESSION['userid'] = $username;
} else {
	$response['status'] = 'error';
}
echo json_encode($response);


?>
