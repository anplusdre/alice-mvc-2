
<?php include 'header.php';?>

<?
$pass = $_POST['pass'];

if ($pass == "admin")
{
        include("details.php.html");
}
else
{
    if(isset($_POST))
    {?>
       <h5 style="text-align:center;top:35%;margin:0 auto;position:absolute;font-weight:400;left:50%;transform:translateX(-50%);">Please input the Client Key</h5>
        <div class="key-form">
            <form method="POST" action="secure.php">
            <span>Client - Key</span> <input type="text" name="pass"></input><br/>
            <input type="submit" name="submit" value="&rarr;" class="keyBtn"></input>
            </form>
                <div class="rql" style="padding-top:12px;font-size:12px;text-align:right;"><p style="    display: inline;">Don't have one? <a href="#" style="color:cornflowerblue;">contact</a> us or</p>
                    <a href="#" class="requestKeyBtn" style="padding:2px 8px;display:inline-block;font-size:12px;margin-left:9px;font-weight:500;background:#3575ef;color:#fff;border-radius:4px;box-shadow:0 1px 1px rgba(4,42,117,.33);-moz-box-sizing:border-box;">REQUEST</a>
                </div>
            </div>
    <?}
}
?>