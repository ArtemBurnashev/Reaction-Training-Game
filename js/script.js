const screen = document.querySelector('.screen'),  
      bannerStart = document.querySelector('.screen__start'),
      start = document.getElementById('start'),
      game = document.getElementById('game'),
      time = document.getElementById('time'),
      result = document.getElementById('result'),
      inputTime = document.getElementById('game-time');
        
bannerStart.addEventListener('click', function(event){
     event.preventDefault();
     screen.classList.add('up');
  

});


let score = 0;
let gameStarted = false;

let timeClosest = time.closest('h2').classList,
    resultClosest = result.closest('h2').classList;



start.addEventListener('click', startGame);
game.addEventListener('click', boxClick);
inputTime.addEventListener('input',setTimeHeader);




function startGame() {

  if(inputTime.value){
  
  gameStarted = true;
  
  setTimeHeader();

  start.classList.add('hide');

  let interval = setInterval(function () {
    let times = parseFloat(time.textContent);
    if (times === 0) {
      clearInterval(interval);

      endGame();
    } else {
      time.textContent = (times - 0.1).toFixed(1);
    }
  }, 100);

 inputTime.setAttribute('disabled',true);

  renderBox();

}
}



function renderBox() {
  let box = document.createElement('div');
  let randomSize = getRandom(20, 60);
  let gameSize = game.getBoundingClientRect();
  
  let maxLeft = gameSize.width - randomSize;
  let maxTop = gameSize.height - randomSize;
  color = colorBox();
  box.style.width = box.style.height = randomSize + 'px';
  box.style.backgroundColor = color;
  box.style.borderRadius = '50%';
  box.style.position = 'absolute';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.boxShadow = `0px 0px 2px ${color}, 0px 0px 2px ${color}`;

  box.setAttribute('data-box', true);
  box.style.cursor = 'pointer';

  game.insertAdjacentElement('afterbegin', box);
  
}



function boxClick(event) {
  let target = event.target;
 
  if(!gameStarted)
  {
      return;
  }  


    if (target.dataset.box) {
      score++;
      event.target.remove();
      renderBox();
    }
  
}


function getRandom(start, end) {
  return Math.floor(Math.random() * (start - end) + end);
}




function endGame() {
  gameStarted = false;
 
  start.classList.remove('hide');
  game.innerHTML = '';
  game.style.backgroundColor = '#2c3e50';

  timeClosest.add('hide');
  resultClosest.remove('hide');

  result.textContent = score;
  score =0;

  inputTime.removeAttribute('disabled');

}

function setTimeHeader(){
   
  
   if(timeClosest.contains('hide'))
   {
    resultClosest.add('hide');
    timeClosest.remove('hide');
  
   }
   time.textContent = inputTime.value;
   
    
}


function colorBox()
{   
    return '#' + Math.random().toString(16).substr(2,6);

}

