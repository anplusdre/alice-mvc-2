<?php include 'header.php';?>




<div class="addData">
    <form>
        <input type=text placeholder="#" class="first">
        <input type=text placeholder="name" class="last">
        <div class="clearfix">
        </div>
        <label for="file-upload" class="custom-file-upload">
    <img src="assets/icons/cloud-computing.svg"> <span>Upload Photos</span>
</label>
        <input id="file-upload" type="file" />

        <input type=email placeholder="e-mail" class="last">
        <div class="clearfix">
        </div>
        <!--  <input type="file" ng-file-select="onFileSelect($files)" multiple> -->
        <label class="radio">Model</label>
        <input type="radio" name="skill1" value="skill1">
        <label class="radio">Usher</label>
        <input type="radio" name="skill2" value="skill2">
        <label class="radio">Escort</label>
        <input type="radio" name="skill3" value="skill3">
        <label class="radio">Spg</label>
        <input type="radio" name="skill4" value="skill4">
    </form>

    <div class="addDataBase">Submit</div>
</div>


<div class="talentDatabase">
    <div> </div>
</div>




<?php include 'footer.php';?>
