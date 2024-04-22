window.addEventListener("load", function () {
   console.log("Good job opening the window");
   document.getElementById("result-area").style.display = "none";
   document.getElementById("order-header").style.display = "none";
   for (let i = 0; i < 21; i++) {
      document.getElementsByClassName("results")[i].style.display = "none"
   }
});

let optw = false;

document.getElementById("priceopt").addEventListener("click", function () {
   if (optw) {
      optw = false;
      this.style.backgroundColor = "rgb(255, 245, 230)";
      this.innerHTML = "";
   } else {
      optw = true;
      this.style.backgroundColor = "#79344C";
      this.innerHTML = "✔";
   }
   console.log(optw);
});

document.getElementById("priceopt").addEventListener('keypress', function (e) {
   let a = e.which || e.keyCode || e.charCode;

   if (a == 13) {
      e.preventDefault();
      if (optw) {
         optw = false;
         this.style.backgroundColor = "rgb(255, 245, 230)";
         this.innerHTML = "";
      } else {
         optw = true;
         this.style.backgroundColor = "#79344C";
         this.innerHTML = "✔";
      }
      console.log(optw);
   }
});

// A Dynamic Programming based solution
// for 0-1 Knapsack problem
function knapSack(W, wt, val, n, d) {
   let i, w;
   let K = new Array(n + 1);
   for (i = 0; i < K.length; i++) {
      K[i] = new Array(W + 1);
      for (let j = 0; j < W + 1; j++) {
         K[i][j] = 0;
      }
   }

   // Build table K[][] in bottom up manner
   for (i = 0; i <= n; i++) {
      for (w = 0; w <= W; w++) {
         if (i == 0 || w == 0)
            K[i][w] = 0;
         else if (wt[i - 1] <= w)
            K[i][w] = Math.max(val[i - 1] +
               K[i - 1][w - wt[i - 1]],
               K[i - 1][w]);
         else
            K[i][w] = K[i - 1][w];
      }
   }

   // stores the result of Knapsack
   let res = K[n][W];
   console.log(res);
   console.log(K);
   let O = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

   w = W;
   for (i = n; i > 0 && res > 0; i--) {

      // either the result comes from the top
      // (K[i-1][w]) or from (val[i-1] + K[i-1]
      // [w-wt[i-1]]) as in Knapsack table. If
      // it comes from the latter one/ it means
      // the item is included.
      if (res == K[i - 1][w])
         continue;
      else {

         // This item is included.
         //console.log(i - 1 + " " + Math.floor((i - 1) / Math.ceil(((10 - d) / 2) + 1)));
         O[Math.floor((i - 1) / Math.ceil(((10 - d) / 2) + 1))] += 1;

         // Since this weight is included its
         // value is deducted
         res = res - val[i - 1];
         w = w - wt[i - 1];
      }
   }
   return O;
}

function generateRating(rating, h, e, s, m, c) {
   let x = 0;
   x += rating[0] * h;
   x += rating[1] * e;
   x += rating[2] * s;
   x += rating[3] * m;
   x += rating[4] * ((c * 1) - 5); //makes choc neither a plus or minus, it's just what they decide
   return Math.floor(x);
}

function displayOrder(order) {
   let elements = document.getElementsByClassName("results");
   for (let i = 0; i < order.length; i++) {
      fade(elements[i], order[i]);
      //elements[i].style.display = "none";
   }
   document.getElementById("order-header").style.display = "block";
   document.getElementById("result-area").style.display = "grid";
   for (let i = 0; i < order.length; i++) {
      if (order[i] > 0) {
         unfade(elements[i], order[i]);
         //elements[i].style.display = "flex";
         document.querySelectorAll(".results span")[i].innerHTML = order[i];
      }
   }
}

function unfade(element, i) {
   if (element.style.display == "flex" || i == 0) {
      console.log("returning 2");
      return;
   }
   var op = 0.1;  // initial opacity
   element.style.display = 'flex';
   var timer = setInterval(function () {
      if (op >= 1) {
         clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.1;
   }, 10);
}

function fade(element, i) {
   if (element.style.display == "none" || i > 0) {
      console.log("returning");
      return;
   }

   element.style.display = 'none';

}

document.querySelector("#submit").addEventListener("click", function () {
   let d = document.querySelector("#diversity").value;
   let h = document.querySelector("#health").value;
   let f = document.querySelector("#fruit").value;
   let s = document.querySelector("#sugar").value;
   let m = document.querySelector("#mix").value;
   let c = document.querySelector("#choc").value;
   let b = document.querySelector("#budget").value;

   if (isNaN(d) || d < 1 || d > 10 ||
      isNaN(h) || h < 1 || h > 10 ||
      isNaN(f) || f < 1 || f > 10 ||
      isNaN(s) || s < 1 || s > 10 ||
      isNaN(m) || m < 1 || m > 10 ||
      isNaN(c) || c < 1 || c > 10) {
      alert("Please enter numbers between 1 and 10");
      return;
   }

   if (isNaN(b) || d < 1) {
      alert("Please enter a valid budget");
      return;
   }

   if (d > 100) {
      alert("With that amount of money you could buy out the store! Try to stay under 100 dollars.");
      return;
   }

   let price = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]; //this will result in the same result as if solved w greedy algorithm

   if (optw) {
      let coefficients = [0.31, 0.34, 0.31, 0.35, 0.31, 0.31, 0.32, 0.29, 0.31, 0.29, 0.29, 0.30, 0.32, 0.31, 0.32, 0.31, 0.31, 0.31, 0.31, 0.41, 0.33]
      let total = 0;
      for (let i = 0; i < price.length; i += 1) {
         total += coefficients[i];
      }
      total /= price.length;
      for (let i = 0; i < price.length; i += 1) {
         price[i] = 5 * coefficients[i] / total;
      }
   }

   let prices = [];
   //health, fruit, sugary, mixing, chocolate. Totals to around 22ish (not counting chocolatiness)
   //note that chocolatiness is out of 3, since we don't want it to be too prevalent
   let ratings = [[6, 8, 5, 3, 0], [5, 8, 5, 5, 3], [2, 5, 9, 5, 0], //cheerios, chex, ctc
   [4, 5, 8, 3, 0], [7, 7, 5, 3, 0], [10, 6, 0, 6, 0], //floops, froflakes, Great Grains
   [7, 7, 2, 7, 0], [7, 6, 3, 6, 0], [3, 3, 11, 2, 0], //Hboo, Life, Lucky Charms
   [7, 9, 3, 3, 0], [9, 5, 2, 5, 0], [2, 6, 8, 6, 3], //Mini Wheats, Rbran, Reeces
   [6, 6, 0, 7, 0], [5, 8, 6, 3, 4], [7, 5, 4, 6, 0], //Rkrispies, chococheerios, specialkred
   [4, 6, 5, 6, 4], [2, 6, 7, 6, 4], [7, 6, 4, 5, 0], //cokrispies, cpebs, specialkpurp
   [7, 3, 7, 5, 0], [6, 5, 8, 3, 0], [3, 5, 8, 6, 3]]; //golden grahams, honeyo's, krave
   let values = [];

   for (let i = 0; i < price.length; i += 1) {
      for (let j = 0; j < ((10 - d) / 2) + 1; j += 1) {
         prices.push(Math.round(price[i] * 10));

         values.push(generateRating(ratings[i], h, f, s, m, c));
      }
   }

   console.log(prices);
   console.log(values);

   let order = knapSack(b * 10, prices, values, values.length, d);
   console.log(order);

   displayOrder(order);

});


