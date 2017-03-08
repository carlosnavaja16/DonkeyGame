
var today = new Date();
today = ((today.getMonth() + 1) + '/' + today.getDate() + '/' +  today.getFullYear());

var player = {
	"name":"",
	"distance":0,
	"position1":0,
	"position2":0,
	"date":0

	};


var highscore = {
     "highscore1" : {"score" :0,"date_of_Score" :"","userName":""},
     "highscore2" : {"score" :0, "date_of_Score" :"","userName":""},
     "highscore3" : {"score" :0, "date_of_Score" :"", "userName":"" },
 }
$(document).ready(function(){


  //instantiate fabric object
  var canvas = new fabric.Canvas('c');
  canvas.setWidth(1600);
  canvas.setHeight(900);
  canvas.hoverCursor = 'default';
  var backgroundObject = 0;
  var tailObject = 0;
  var donkeyObject = 0;
  var blindFoldObject = 0;
  var startButtonObject = 0;

  

  function showInst() {

    var text1 = new fabric.Text("Instructions", { left: 140, top: 80,fontFamily: 'Bahiana', fontSize: 40, fill: 'white', fontWeight: 'bold', });

    text1.selectable = false;
    canvas.add(text1);
    var text2 = new fabric.Text("Pay attention to the target on the donkey's rear.", { left: 15, top: 120, fontSize: 30,fontFamily: 'Bahiana', fill: 'white'});
    text2.selectable = false;
    canvas.add(text2);
    var text3 = new fabric.Text("You will be 'blind-folded' and will need to pin the tail on the donkey!", { left: 15, top: 160, fontSize: 25,fontFamily: 'Bahiana', fill: 'white',  });
    text3.selectable = false;
    canvas.add(text3);
    var text4 = new fabric.Text("Score is based on how close you pin the tail to the target.", { left: 15, top: 200, fontSize: 25,fontFamily: 'Bahiana', fill: 'white',  });
    text4.selectable = false;
    canvas.add(text4);

  }

function gameIntro(){
    drawBackground();
    showInst();
    drawStartButton();
    drawSaveButton();
    drawResumeButton();
    drawDonkey();
    drawTailObject();
  }

  //draw background
  function drawBackground()
  {
    fabric.Image.fromURL('Assets/background.png', function(bg){
      canvas.add(bg);
      bg.moveTo(0);
      bg.selectable = false;
	  backgroundObject = bg;

    });
  }


  //draw donkey
  //tail point at 705,245
  function drawDonkey(){
    fabric.Image.fromURL('Assets/donkey.png', function(donkey){
    donkey.setWidth(400);
    donkey.setHeight(320);
    donkey.setTop(570);
    donkey.setLeft(40);
    donkey.selectable = false;
    canvas.add(donkey);
    donkey.moveTo(1);
    donkeyObject = donkey;

    });
  }


  //draw tail
  function drawTailObject(){
    fabric.Image.fromURL('Assets/tail.png', function(tail){
    tail.setWidth(131);
    tail.setHeight(131);
    tail.setTop(80);
    tail.setLeft(1400);
    tail.set({
          originX: "center",
          originY: "center"
      });
    tail.selectable = false;
    tail.hasControls = false;
    tail.hoverCursor = 'default';
    canvas.add(tail);
    tail.moveTo(1);
    tailObject = tail;
    });
  }


  //Draw the Start Game button
 function drawStartButton(){
     var rec = new fabric.Rect({
        width: 150, height: 50,
        originX: 'center',
        originY: 'center',
        fill: 'yellowGreen',
        rx: 10,
        ry: 10
      });
      var text = new fabric.Text('Start Game', {
        fontFamily: "Bahiana",
        fontSize: 25,
        originX: 'center',
        originY: 'center'
      });
      var startButton = new fabric.Group([ rec,  text ], {
        left: 50,
        top: 250,
      });
      startButton.hoverCursor = 'pointer';
      startButton.hasControls = startButton.hasBorders = false;
      startButton.lockMovementX = true;
      startButton.lockMovementY = true;
      canvas.add(startButton);

      startButtonObject = startButton;

      startButton.on('selected', function(){
        startButton.moveTo(0);
        startGame();

      });
  }
  
   //Draw the Save Game button
  function drawSaveButton(){
      var rec = new fabric.Rect({
        width: 150, height: 50,
        originX: 'center',
        originY: 'center',
        fill: '#FF0',
        rx: 10,
        ry: 10
      });
      var text = new fabric.Text('Save Game', {
        fontSize: 25,
        originX: 'center',
        originY: 'center'
      });
      var saveButton = new fabric.Group([ rec,  text ], {
        left: 220,
        top: 250,
      });
      saveButton.hoverCursor = 'pointer';
      saveButton.hasControls = saveButton.hasBorders = false;
      saveButton.lockMovementX = true;
      saveButton.lockMovementY = true;
      canvas.add(saveButton);

      saveButton.on('selected', function(){
      saveGame();

      });

  }

  //Draw the Resume Game button
  function drawResumeButton(){

      var rec = new fabric.Rect({
        width: 150, height: 50,
        originX: 'center',
        originY: 'center',
        fill: '#FF0',
        rx: 10,
        ry: 10
      });
      var text = new fabric.Text('Resume Game', {
        fontSize: 25,
        originX: 'center',
        originY: 'center'
      });
      var resumeButton = new fabric.Group([ rec,  text ], {
        left: 390,
        top: 250,
      });
      resumeButton.hoverCursor = 'pointer';
      resumeButton.hasControls = resumeButton.hasBorders = false;
      resumeButton.lockMovementX = true;
      resumeButton.lockMovementY = true;
      canvas.add(resumeButton);

      resumeButton.on('selected', function(){
      resumeGame();

      });

  }

    function drawPinButton(){

      var rec = new fabric.Rect({
        width: 200, height: 75,
        originX: 'center',
        originY: 'center',
        fill: 'red',
        rx: 10,
        ry: 10
      });
      var text = new fabric.Text('PIN!', {
        fontSize: 40,
        originX: 'center',
        originY: 'center',
		fontFamily: 'Bahiana'
      });
      var pinButton = new fabric.Group([ rec,  text ], {
        left: 1375,
        top: 800,
      });
      pinButton.hoverCursor = 'pointer';
      pinButton.hasControls = pinButton.hasBorders = false;
      pinButton.lockMovementX = true;
      pinButton.lockMovementY = true;
      canvas.add(pinButton);

      pinButton.on('selected', function(){
      pinTail();

      });

  }



  //When game starts
  //draw blindfold and enlarge so it takes up the entire screen
  function startGame(){

    fabric.Image.fromURL('Assets/blindfold.png', function(Img){
      Img.setWidth(131);
      Img.setHeight(131);
      Img.setTop(450);
      Img.setLeft(800);
      Img.set({
          originX: "center",
          originY: "center"
      });

      Img.selectable = false;
      canvas.add(Img);
      canvas.moveTo(Img, 2);


      Img.animate('width', 10000, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 2000,
        easing: fabric.util.ease.easeInCubic
      });

      Img.animate('height', 10000, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 2000,
        easing: fabric.util.ease.easeInCubic
      });
	  blindFoldObject = Img;

    drawPinButton();

    tailObject.selectable = true;
    tailObject.hoverCursor = 'pointer';
    donkeyObject.moveTo(0);

   });

  }

  // pin tail function detects the pin location and measure distant from target
  function pinTail()
  {
	  var x = tailObject.left-13;
	  var y = tailObject.top-63;
	  var dX = donkeyObject.left+385;
	  var dY = donkeyObject.top+87;

	  var distance = Math.round(Math.sqrt(((x-dX)*(x-dX))+((y-dY)*(y-dY))));

	  alert("x position: " + x +"\n y position: " + y + "\n donkey tail x position: "+dX + "\n donkey tail y position: "+dY + "\n you were " + distance+" pixels from the target!");

	  blindFoldObject.animate('width', 0, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 2000,
        easing: fabric.util.ease.easeInCubic
      });

      blindFoldObject.animate('height', 0, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 2000,
        easing: fabric.util.ease.easeInCubic
      });

	  donkeyObject.moveTo(10);
    tailObject.moveTo(99);
    tailObject.selectable = false;

		//if list is empty push score to 1 spot
		if(!localStorage.getItem("score1"))
		{
			alert("Congratulations! You have set a new high score!");
			player.name = prompt("Please enter your initials");
			player.distance = distance;
			player.date = today;

			localStorage.setItem("score1",JSON.stringify(player));
		}


		//if score is better than score 1
		else if(distance < JSON.parse(localStorage.getItem("score1")).distance)
		{
			alert("Congratulations! You have set a new high score!");
			player.name = prompt("Please enter your initials");
			player.distance = distance;
      player.date = today;
			if(localStorage.getItem("score2"))
			{
				localStorage.setItem("score3",localStorage.getItem("score2"));
				localStorage.setItem("score2",localStorage.getItem("score1"));
				localStorage.setItem("score1",JSON.stringify(player));
			}

			else
			{
				localStorage.setItem("score2",localStorage.getItem("score1"));
				localStorage.setItem("score1",JSON.stringify(player));
			}
		}

		else if(!localStorage.getItem("score2"))
		{
			alert("Congratulations! You have set a new high score!");
			player.name = prompt("Please enter your initials");
			player.distance = distance;
      player.date = today;
			localStorage.setItem("score2",JSON.stringify(player));
		}

		else if(distance < JSON.parse(localStorage.getItem("score2")).distance)
		{
			alert("Congratulations! You have set a new high score!");
			player.name = prompt("Please enter your initials");
			player.distance = distance;
      player.date = today;
			localStorage.setItem("score3",localStorage.getItem("score2"));
			localStorage.setItem("score2",JSON.stringify(player));
		}

		else if(!localStorage.getItem("score3"))
		{

			alert("Congratulations! You have set a new high score!");
			player.name = prompt("Please enter your initials");
			player.distance = distance;
      player.date = today;
			localStorage.setItem("score3",JSON.stringify(player));
		}

		else if(distance < JSON.parse(localStorage.getItem("score3")).distance)
		{
			alert("Congratulations! You have set a new high score!");
			player.name = prompt("Please enter your initials");
			player.distance = distance;
      player.date = today;
			localStorage.setItem("score3",JSON.stringify(player));
		}
	  showScore();
  };

  // Show results and scorboard
  function showScore(){

	var score1 = JSON.parse(localStorage.getItem("score1"));
	var score2;
	var score3;

	var leaderboardHeader= new fabric.Text("Player   Score   Date"   , { left: 800, top: 400, fontSize: 40,fontFamily: 'Bahiana', fill: 'white', fontWeight: 'bold' });
    leaderboardHeader.selectable = false;
    canvas.add(leaderboardHeader);

	var text1 = new fabric.Text(score1.name+"   "+score1.distance+"    "+score1.date , { left: 800, top: 450, fontSize: 40,fontFamily: 'Bahiana', fill: 'white', fontWeight: 'bold' });
    text1.selectable = false;
    canvas.add(text1);

	if(localStorage.getItem("score2"))
	{
		var score2 = JSON.parse(localStorage.getItem("score2"));
		var text2 = new fabric.Text(score2.name+"   "+score2.distance+"   "+score2.date, { left: 800, top: 500, fontSize: 40,fontFamily: 'Bahiana', fill: 'white', fontWeight: 'bold' });
		text2.selectable = false;
		canvas.add(text2);

		if(localStorage.getItem("score3"))
		{
			var score3 = JSON.parse(localStorage.getItem("score3"));
			var text3 = new fabric.Text(score3.name+"   "+score3.distance+"    "+score3.date, { left: 800, top: 550, fontSize: 40,fontFamily: 'Bahiana', fill: 'white', fontWeight: 'bold' });
			text3.selectable = false;
			canvas.add(text3);
		}
	}



  };
  // save game function
  function saveGame(){
	player.name = prompt("Please enter your name");
	player.position1 = tailObject.left;
	player.position2 =tailObject.top;
 // tailObject.moveTo(99);
	localStorage.setItem("savedState",JSON.stringify(player));


  }


	function resumeGame(){
		player.name = prompt("Please enter your initials");

		player = JSON.parse(localStorage.getItem("savedState"));
		startGame();
		tailObject.left = player.position1;
		tailObject.top = player.position2;
    
		tailObject.selectable = true;
		
		tailObject.hoverCursor = 'pointer';

		
		
   
	}


   //When the page loads automatically shows instructions
   gameIntro();

});
