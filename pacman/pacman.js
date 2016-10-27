$(document).ready(function(){		
	var world = [
		[2,2,2,2,2,2,2,2,2,2],			
		[2,0,1,1,1,1,1,1,1,2],
		[2,1,2,1,2,2,1,2,1,2],			
		[2,1,2,1,1,3,1,2,1,2],
		[2,1,2,1,3,1,1,2,1,2],
		[2,1,2,1,2,2,1,2,1,2],
		[2,1,1,1,1,1,1,1,1,2],
		[2,2,2,2,2,2,2,2,2,2]
	];
	var lives = 1;
	var score = 0;
	var pacman = {
		x: 1,
		y: 1
	};
	var ghost = {
		x: 4,
		y: 3
	};
	var ghost_direction = 1;

	function displayWorld(){
		var output='';
		for(var i=0; i<world.length; i++){
			output += "\n<div class='row'>";
			for(var j=0; j<world[i].length; j++){
				if(world[i][j]==3)
					output +="\n\t<div class='cherry'></div>";
				else if(world[i][j]==2)
					output +="\n\t<div class='brick'></div>";	
				else if(world[i][j]==1)
					output +="\n\t<div class='coin'></div>";
				else if(world[i][j]==0)
					output +="\n\t<div class='empty'></div>";			
			}
			output += "\n</div>"
		}
		// console.log(world);
		document.getElementById('world').innerHTML = output;
	}
	function displayPacMan(){
		document.getElementById('pacman').style.top = pacman.y*20+'px';
		document.getElementById('pacman').style.left = pacman.x*20+'px';
	}
	function displayGhost(){
		document.getElementById('ghost').style.top = ghost.y*20+'px';
		document.getElementById('ghost').style.left = ghost.x*20+'px';
	}
	function displayScore(){
		document.getElementById('score').innerHTML = 'Score: ' + score;
	}
	function displayLives(){
		document.getElementById('lives').innerHTML = 'Lives: ' + lives;
	}
	function gameOver(){
		console.log('Game Over!');
		console.log('ggpacman '+pacman.x+','+pacman.y);
		console.log('ggghost '+ghost.x+','+ghost.y);
		document.getElementById('game_over').innerHTML = '<p>GAME OVER</p>'+'<p>Score: '+score+'</p><button id="reset">Play Again</button>';
		document.getElementById('game_over').style.display = 'block';
		document.getElementById('score').style.display = 'none';
		document.getElementById('lives').style.display = 'none';
		document.getElementById('reset').addEventListener("click", function(){
			lives = 1;
			score = 0;
			world = [
				[2,2,2,2,2,2,2,2,2,2],			
				[2,0,1,1,1,1,1,1,1,2],
				[2,1,2,1,2,2,1,2,1,2],			
				[2,1,2,1,1,3,1,2,1,2],
				[2,1,2,1,3,1,1,2,1,2],
				[2,1,2,1,2,2,1,2,1,2],
				[2,1,1,1,1,1,1,1,1,2],
				[2,2,2,2,2,2,2,2,2,2]
			];
			pacman = {
				x: 1,
				y: 1
			};
			ghost = {
				x: 4,
				y: 3
			};
			document.getElementById('game_over').style.display = 'none';
			document.getElementById('score').style.display = 'block';
			document.getElementById('lives').style.display = 'block';
			document.getElementById('pacman').className = 'right';
			displayWorld();
			displayPacMan();
			displayGhost();
			displayScore();
			displayLives();
		});

	}

	displayWorld();
	displayPacMan();
	displayGhost();
	displayScore();
	displayLives();

	//Game Movement & Scoring
	document.onkeydown = function(e){
		//////////////////
		//PacMan Movement
		//////////////////
		if(e.keyCode == 37 && world[pacman.y][pacman.x-1] != 2){
			pacman.x--;
			document.getElementById('pacman').className = 'left';
		}
		else if(e.keyCode == 39 && world[pacman.y][pacman.x+1] != 2){
			pacman.x++;
			document.getElementById('pacman').className = 'right';
		}
		else if(e.keyCode == 38 && world[pacman.y-1][pacman.x] != 2){
			pacman.y--;
			document.getElementById('pacman').className = 'up';
		}
		else if(e.keyCode == 40 && world[pacman.y+1][pacman.x] != 2){
			pacman.y++;
			document.getElementById('pacman').className = 'down';
		}
		////////////////////////
		//Ghost Movement
		////////////////////////
		ghost_direction = Math.floor((Math.random() * 4) + 1);
		if(ghost_direction == 1 && world[ghost.y][ghost.x-1] != 2){
			ghost.x--;
		}
		else if(ghost_direction == 2 && world[ghost.y][ghost.x+1] != 2){
			ghost.x++;
		}
		else if(ghost_direction == 3 && world[ghost.y-1][ghost.x] != 2){
			ghost.y--;
		}
		else if(ghost_direction == 4 && world[ghost.y+1][ghost.x] != 2){
			ghost.y++;
		}

		console.log('pacman '+pacman.x+','+pacman.y);
		console.log('ghost '+ghost.x+','+ghost.y);
		//Scoring 10 points for a coin
		if(world[pacman.y][pacman.x] == 1){
			world[pacman.y][pacman.x] = 0;
			score += 10;
			displayWorld();
			displayScore();
		}
		//Scoring 50 points for a cherry
		if(world[pacman.y][pacman.x] == 3){
			world[pacman.y][pacman.x] = 0;
			score += 50;
			displayWorld();
			displayScore();
		}
		//if Pacman hits a ghost he loses a life and player loses 25 points
		if(pacman.y == ghost.y && pacman.x == ghost.x){
			score -= 25;
			lives -= 1;
			if(lives == 0){
				setTimeout(gameOver, 500);
			}
			displayScore();
			displayLives();
		}
		displayGhost();
		displayPacMan();
	}
});