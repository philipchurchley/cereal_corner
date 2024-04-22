//CEREAL JAVASCRIPT

window.addEventListener("load", function () {
   console.log("Good job opening the window");
});

//use javascript for breakpoint because it's easier
function changeViewpoint(event) {
   var elems = document.getElementsByClassName('noncurrent');
   if (event.matches) {
      /* the viewport is 550 pixels wide or less */
      console.log("This is a narrow screen — less than 550px wide.");
      for (var i = 0; i < elems.length; i += 1) {
         elems[i].style.display = 'none';
      }
      document.getElementById('menu-button').style.display = 'block';
      document.getElementById('nav-dropdown').style.display = 'block';
      document.getElementById("nav-dropdown").classList.add('hide');
   } else {
      /* the viewport is more than 550 pixels wide */
      console.log("This is a wide screen — more than 550px wide.");
      for (var i = 0; i < elems.length; i += 1) {
         elems[i].style.display = 'block';
      }
      document.getElementById('menu-button').style.display = 'none';
      document.getElementById('nav-dropdown').style.display = 'none';
   }
}

changeViewpoint(window.matchMedia("(max-width: 550px)"));

window.matchMedia("(max-width: 550px)").addEventListener("change", (event) => {
   changeViewpoint(event);
});

var elem = document.getElementById("nav-dropdown");

function slide() {
   console.log("slide");
   elem.classList.toggle('hide');
}

document.querySelector("#menu-button").addEventListener("click", function () {
   slide();
   console.log("clicked");
});
