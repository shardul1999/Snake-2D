
function init()
{
	var canvas = document.getElementById('mycanvas');
	W=canvas.width= 1500;
	H=canvas.height= 700;
	pen = canvas.getContext('2d');
	cs = 46;
	score=0;
	prev_direction="right";
	trophy_img=new Image();
	trophy_img.src="/Users/himanisingh/Documents/GitHub/Snake-2D/assets/img4.png";
	snake_img=new Image();
	snake_img.src="/Users/himanisingh/Documents/GitHub/Snake-2D/assets/img2.png";
	food_img=new Image();
	food_img.src="/Users/himanisingh/Documents/GitHub/Snake-2D/assets/img3.png";
	snake = {
		snake_len:3,
		color:"black",
		cells:[],
		direction:"right",
		speed:20,
		create_snake:function(){
			for(let i=this.snake_len;i>0;i--)
				{
					this.cells.push({x:i,y:0});}
		},
		draw_snake: function(){
			for(let i=0;i<this.cells.length;i++)
			{
				pen.fillStyle=this.color
				pen.drawImage(snake_img,this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},
		update_snake: function(){
			//console.log("update!")

			var headx=this.cells[0].x;
			var heady=this.cells[0].y;
			
			if(headx==food.x && heady==food.y)
			{
				food=getRandomFood();
				while(food.x == headx || food.y == heady)
					food=getRandomFood();

				score+=1;
				console.log("score = ",score);
			}
			else
				this.cells.pop();
			if(snake.direction=="right")
			{
					headx=this.cells[0].x+1;
					heady=this.cells[0].y;
			}
			else if(snake.direction=="left")
			{
					headx=this.cells[0].x-1;
					heady=this.cells[0].y;
			}
			else if(snake.direction=="down")
			{
					headx=this.cells[0].x;
					heady=this.cells[0].y+1;
			}
			else
			{
					headx=this.cells[0].x;
					heady=this.cells[0].y-1;
			}
			if(headx<0 || headx>Math.round(W-cs)/cs || heady<0 || heady>Math.round(H-cs)/cs )
			{
				console.log(headx," ",heady);
					pen.fillStyle="blue";
					pen.font="100px roboto";
					pen.fillText("GAME OVER",450,350);
				clearInterval(f);
			}
			this.cells.unshift({x:headx,y:heady});
		}
	};
	snake.create_snake();

	food = getRandomFood();

	function keyPressed(e)
	{
		if(e.key=="ArrowDown")
		{
			if(prev_direction=="up")
				{
					clearInterval(f);
				}
			snake.direction="down";
			prev_direction="down";
		}
		else if(e.key=="ArrowLeft")
		{
			if(prev_direction=="right")
				clearInterval(f);
			snake.direction="left";
			prev_direction="left";
		}
		else if(e.key=="ArrowRight")
		{
			if(prev_direction=="left")
				clearInterval(f);
			snake.direction="right";
			prev_direction="right";
		}
		else if(e.key=="ArrowUp")
		{
			if(prev_direction=="down")
				clearInterval(f);
			snake.direction="up"
			prev_direction="up";
		}
		//console.log(snake.direction);
	}

	document.addEventListener('keydown',keyPressed);
}

function draw()
{

	pen.clearRect(0,0,W,H);
	snake.draw_snake();
	pen.fillStyle="red";
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
	pen.drawImage(trophy_img,30,30,cs+5,cs+5)
	pen.fillStyle="blue";
	pen.font="20px roboto";
	pen.fillText(score,50,50);
}

function update()
{
	snake.update_snake();
}

function getRandomFood()
{
	var foodx=Math.round(Math.random()*(W-cs)/cs);
	var foody=Math.round(Math.random()*(H-cs)/cs);
	food={
		x:foodx,
		y:foody,
		color:"blue",
	}
	return food;
}
function game_loop()
{
	draw();
	update();
}



init();
var f=setInterval(game_loop,150);