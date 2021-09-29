    //This balls variable was given to us.  I added the rest of the variables to support additional functions.
    var balls = document.getElementsByClassName("ball");
    var bothEyes = document.getElementsByClassName("eye");
    var watch = false;
    var eyeShadows= [
      "hotpink",
      "plum",
      "cyan",
      "gold",
      "lemonchiffon",
      "chartreuse"
    ];
    var eyeShadow = eyeShadows[0];

    //This script was given to us, but I modified it.
    //Initially it was set to listen for mouse movement once the page loaded.
    //I changed it to be a function that had to be called ("watchingUser" instead of "document.onmousemove").
    //I also added the "- 50" to var y because I wanted the pupils to be able to look up more.
    watchingUser = () => {
      var x = (event.clientX * 100) / window.innerWidth + "%";
      var y = ((event.clientY * 100) / window.innerHeight) - 50 + "%";
      for (let i = 0; i < 2; i++) {
        balls[i].style.left = x;
        balls[i].style.top = y;
      }
    };
    
    // I converted the given listening function into the first two functions.
    // This Q&A showed me how to do the simple toggle syntax:
    // https://stackoverflow.com/questions/37164993/javascript-toggle-between-2-functions
    function onWatch() {
      document.addEventListener('mousemove', watchingUser);
      watch = true;
    }

    function offWatch() {
      document.removeEventListener('mousemove', watchingUser);
      watch = false;
    }

    function toggleWatch() {
      watch ? offWatch() : onWatch();
    }

    //I added these two functions so that the end-user could switch between the initial shape of the eyes (calm) and a rounder shape representing "surprised" eyes.
    surpriseEyes = () => {
      for (let i = 0; i < 2; i++) {
        bothEyes[i].style.height = "200px";
      }
    }

    calmEyes = () => {
      for (let i = 0; i < 2; i++) {
        bothEyes[i].style.height = "120px";
      }
    };

    //I added a hotpink top border to the styles.css document for class eye to represent a top eyelid.
    //I then wrote this function to make it appear as if the eyes blinked at the end-user.
    //A later function gives the user the ability to change the eyeshadow.
    blink = () => {
      for (let i = 0; i < 2; i++) {
        balls[i].style.borderWidth = "0px";
        balls[i].style.backgroundColor = eyeShadow;
        bothEyes[i].style.borderWidth = "0px";
        bothEyes[i].style.backgroundColor = eyeShadow;
      }

      setTimeout(() => {
        for (let i = 0; i <2; i++){
          balls[i].style.borderWidth = "20px";
          balls[i].style.backgroundColor = "black";
          bothEyes[i].style.borderWidth = "5px";
          bothEyes[i].style.backgroundColor = "white";
        }
      }, 200);
    };

    //I added this function so that the end-user could add an iris of a random color with a click of the mouse.
    //Early in my course, we were challenged to figure out a way to make a bouncing call change to a random color
    //everytime it hit a wall. This is how I solved for that challenge and I decided to reuse the code here.
    //I also added the corresponding border styling to the styles.css document.
    randomIris= () => {
      let red = Math.floor(Math.random()*255);
      let green = Math.floor(Math.random()*255);
      let blue = Math.floor(Math.random()*255);       
      let newColor = "rgb(" + red + ", " + green + ", " + blue + ")";
      for (let i = 0; i < 2; i++) {
        balls[i].style.borderColor = newColor;
      }
    };

    //I added this function to let the user change the eyeshadow.
    makeover = (n) => {
      eyeShadow = eyeShadows[n];
      for (let i = 0; i < 2; i++) {
        bothEyes[i].style.borderColor = eyeShadow;
      }
    }

    // I also added this function so that the user could use the arrow keys instead of some of the buttons.
    // I got the idea from an exercise in "JavaScript for Kids" by Nick Morgan that used JQuery.
    // I chose not to use JQuery and had to find a different way to do this here. I based it on the code example found in this article:
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event

      document.addEventListener('keyup', function (event) {
        if (event.key === "ArrowUp"){
          toggleWatch();
        }
        if (event.key === "ArrowLeft"){
          surpriseEyes();
        }
        if (event.key === "ArrowRight"){
          calmEyes();
        }
        if (event.key === "ArrowDown"){
          blink();
        }
      });
