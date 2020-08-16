// TO DO:
// populate spotlight & book blocks (need google API for description and picture)
// tailor info to specific pages (i.e. reference, etc.)
// push to github
// -----
// show certain number of book results with dropdown
// add sorting option
// send counter to top of page on scroll



// --------- LOADING SPINNER ---------
// loading spinner vars
var loader = document.getElementsByClassName("loader");
var pageContent = document.getElementsByClassName("pageContent");
var scrollDownBtn = document.getElementsByClassName("scrollDownBtn");
var hvrHang = document.getElementsByClassName("hvr-hang");

document.onreadystatechange = function () {
  var state = document.readyState
  if (state !== "complete") {
    for (i = 0; i < pageContent.length; i++) {
      pageContent[i].style.visibility = "hidden";
    }
  } else {
    setTimeout(function(){
      for (i = 0; i < loader.length; i++) {
        loader[i].style.display = "none";
      }
      for (i = 0; i < scrollDownBtn.length, i < hvrHang.length; i++) {
        scrollDownBtn[i].style.visibility = "visible";
        hvrHang[i].style.visibility = "visible";
      }
      for (i = 0; i < pageContent.length; i++) {
        pageContent[i].style.visibility = "visible";
      }
    }, 1500);
  }
}
// --------- /LOADING SPINNER ---------



// arrays so JSON content can be pushed to them
var titles = [];
var authorsF = [];
var authorsL = [];
var dates = [];

// for counting number of books
var count = [];
var total;

// determines page (i.e. <body class="homePage">)
var pageClass = document.body.classList;

// only encompassing div of book blocks
var bookItems = document.getElementsByClassName("bookItem");
var picture;
if (pageClass.contains("classicsPage") || pageClass.contains("allBooksPage")) {
  picture = '.Pictures/placeholder.png';
} else {
  picture = '../.Pictures/placeholder.png';
}

// entire book blocks
var bookItem = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 bookItem"><a href="#" class="thumbnail bookBtn"><div class="bookTitle"></div><img src="' + picture + '" class="img-responsive"><div class="bookCaption"><div class="bookAuthor"></div><div class="bookDate"></div></div></div></div>';

var spotlightBlock = '<div class="spotlight"><img src="' + picture + '" class="spotImg"><div class="spotHead"><div class="spotTitle">&lt;Title&gt; | <span class="spotEdition">&lt;Edition&gt;</span></div><div class="spotAuthor">&lt;Author&gt;</div><hr><div class="spotInfo"><div class="spotDate"><i class="fa fa-calendar-o"></i>&nbsp;&nbsp;&lt;Date&gt;</div><div class="spotLocation">&nbsp;<i class="fa fa-map-marker"></i>&nbsp;&nbsp;&lt;Location&gt;</div><div class="spotFNF"><i class="fa fa-book"></i>&nbsp;&nbsp;&lt;Fiction / Non-Fiction&gt;</div><div class="spotShared"><i class="fa fa-share"></i>&nbsp;&nbsp;&lt;Shared / Not Shared&gt;</div></div></div></div><div class="spotDesc">&lt;Description&gt;<a class="readMore">read more <i class="fa fa-chevron-circle-right"></i></a><a class="readLess"><i class="fa fa-chevron-circle-left"></i> read less</a></div>';


// make for loop index vars global
var i;
var j;


// MAIN FUNCTION
function getData() {
  var googleSheetsURL = 'https://docs.google.com/spreadsheets/d/1KriPafCaLcft_ROnGqkA6gl7al4TZvuloyZSJ18KTeU/pubhtml';

  function init() {
    Tabletop.init({
      key: googleSheetsURL,
      callback: showInfo
    })
  }

  function showInfo(data, tabletop) {
    // arrays so JSON content can be pushed to them
    var allBooks = [];
    var allFiction = [];
    var allNonFiction = [];

    // push multiple pages' content onto one page each
    allBooks.push(data.Fantasy.elements, data["Science Fiction"].elements, data["Young Adult/Children's"].elements, data["General Fiction"].elements, data.Novels.elements, data.Reference.elements, data.Classics.elements);
    allFiction.push(data.Fantasy.elements, data["Science Fiction"].elements, data["Young Adult/Children's"].elements, data["General Fiction"].elements);
    allNonFiction.push(data.Novels.elements, data.Reference.elements);

    // --------- BOOK PAGES ---------
    // ALL BOOKS
    if (pageClass.contains("allBooksPage")) {
      for (i = 0; i < allBooks.length; i++) {
        for (j = 0; j < allBooks[i].length; j++) {
        // push content to arrays
        titles.push(allBooks[i][j]["Title"]);
        authorsF.push(allBooks[i][j]["Author (First)"]);
        authorsL.push(allBooks[i][j]["Author (Last)"]);
        dates.push(allBooks[i][j]["Date"]);

        // build book blocks
        document.getElementById("allBooksRow").innerHTML += bookItem;

        // number of books on page
        count.push(j);
        }
      }
      total = count.length;
    }
    if (pageClass.contains("allFictionPage")) {
      for (i = 0; i < allFiction.length; i++) {
        for (j = 0; j < allFiction[i].length; j++) {
        // push content to arrays
        titles.push(allFiction[i][j]["Title"]);
        authorsF.push(allFiction[i][j]["Author (First)"]);
        authorsL.push(allFiction[i][j]["Author (Last)"]);
        dates.push(allFiction[i][j]["Date"]);

        // build book blocks
        document.getElementById("allFictionRow").innerHTML += bookItem;

        // number of books on page
        count.push(j);
        }
      }
      total = count.length;
    }
    // FANTASY
    if (pageClass.contains("fantasyPage")) {
      for (i = 0; i < data.Fantasy.elements.length; i++) {
        titles.push(data.Fantasy.elements[i]["Title"]);
        authorsF.push(data.Fantasy.elements[i]["Author (First)"]);
        authorsL.push(data.Fantasy.elements[i]["Author (Last)"]);
        dates.push(data.Fantasy.elements[i]["Date"]);

        document.getElementById("fantasyRow").innerHTML += bookItem;

        count.push(i);
        total = count.pop() + 1;
      }
    }

    // SCIENCE FICTION
    if (pageClass.contains("scienceFictionPage")) {
      for (i = 0; i < data['Science Fiction'].elements.length; i++) {
        // push content to arrays
        titles.push(data['Science Fiction'].elements[i]["Title"]);
        authorsF.push(data['Science Fiction'].elements[i]["Author (First)"]);
        authorsL.push(data['Science Fiction'].elements[i]["Author (Last)"]);
        dates.push(data['Science Fiction'].elements[i]["Date"]);

        // build book blocks
        document.getElementById("scienceFictionRow").innerHTML += bookItem;

        // number of books on page
        count.push(i);
        total = count.pop() + 1;
      }
    }

    // YOUNG ADULT / CHILDREN'S
    if (pageClass.contains("yaChildPage")) {
      for (i = 0; i < data["Young Adult/Children's"].elements.length; i++) {
        // push content to arrays
        titles.push(data["Young Adult/Children's"].elements[i]["Title"]);
        authorsF.push(data["Young Adult/Children's"].elements[i]["Author (First)"]);
        authorsL.push(data["Young Adult/Children's"].elements[i]["Author (Last)"]);
        dates.push(data["Young Adult/Children's"].elements[i]["Date"]);

        // build book blocks
        document.getElementById("yaChildRow").innerHTML += bookItem;

        // number of books on page
        count.push(i);
        total = count.pop() + 1;
      }
    }

    // GENERAL FICTION
    if (pageClass.contains("generalFictionPage")) {
      for (i = 0; i < data["General Fiction"].elements.length; i++) {
        // push content to arrays
        titles.push(data["General Fiction"].elements[i]["Title"]);
        authorsF.push(data["General Fiction"].elements[i]["Author (First)"]);
        authorsL.push(data["General Fiction"].elements[i]["Author (Last)"]);
        dates.push(data["General Fiction"].elements[i]["Date"]);

        // build book blocks
        document.getElementById("generalFictionRow").innerHTML += bookItem;

        // number of books on page
        count.push(i);
        total = count.pop() + 1;
      }
    }

    // ALL NON-FICTION
    if (pageClass.contains("allNonFictionPage")) {
      for (i = 0; i < allNonFiction.length; i++) {
        for (j = 0; j < allNonFiction[i].length; j++) {
        // push content to arrays
        titles.push(allNonFiction[i][j]["Title"]);
        authorsF.push(allNonFiction[i][j]["Author (First)"]);
        authorsL.push(allNonFiction[i][j]["Author (Last)"]);
        dates.push(allNonFiction[i][j]["Date"]);

        // build book blocks
        document.getElementById("allNonFictionRow").innerHTML += bookItem;

        // number of books on page
        count.push(j);
        }
      }
      total = count.length;
    }

    // NOVELS
    if (pageClass.contains("novelsPage")) {
      for (i = 0; i < data.Novels.elements.length; i++) {
        // push content to arrays
        titles.push(data.Novels.elements[i]["Title"]);
        authorsF.push(data.Novels.elements[i]["Author (First)"]);
        authorsL.push(data.Novels.elements[i]["Author (Last)"]);
        dates.push(data.Novels.elements[i]["Date"]);

        // build book blocks
        document.getElementById("novelsRow").innerHTML += bookItem;

        // number of books on page
        count.push(i);
        total = count.pop() + 1;
      }
    }

    // REFERENCE
    if (pageClass.contains("referencePage")) {
      for (i = 0; i < data.Reference.elements.length; i++) {
        // push content to arrays
        titles.push(data.Reference.elements[i]["Title"]);
        authorsF.push(data.Reference.elements[i]["Author (First)"]);
        authorsL.push(data.Reference.elements[i]["Author (Last)"]);
        dates.push(data.Reference.elements[i]["Date"]);

        // build book blocks
        document.getElementById("referenceRow").innerHTML += bookItem;

        // number of books on page
        count.push(i);
        total = count.pop() + 1;
      }
    }

    // CLASSICS
    if (pageClass.contains("classicsPage")) {
      for (i = 0; i < data.Classics.elements.length; i++) {
        // push content to arrays
        titles.push(data.Classics.elements[i]["Title"]);
        authorsF.push(data.Classics.elements[i]["Author (First)"]);
        authorsL.push(data.Classics.elements[i]["Author (Last)"]);
        dates.push(data.Classics.elements[i]["Date"]);

        // build book blocks
        document.getElementById("classicsRow").innerHTML += bookItem;

        // number of books on page
        count.push(i);
        total = count.pop() + 1;
      }
    }
    // --------- /BOOK PAGES ---------



    // --------- SPOTLIGHT ---------
    // spotlight vars
    var spotMini = document.getElementsByClassName("spotMini");
    var spotMiniBtn = document.getElementsByClassName("spotMiniBtn");
    var spotToggle = document.getElementsByClassName("spotToggle");
    var spotlight = document.getElementsByClassName("spotlight");
    var spotDesc = document.getElementsByClassName("spotDesc");
    var bookBtn = document.getElementsByClassName("bookBtn");

    // expand spotlight & truncate description
    function spotBtn() {
      // expand spotlight
      for (i = 0; i < spotToggle.length; i++) {
        spotToggle[i].style.display = "block";
        spotToggle[i].innerHTML = spotlightBlock;
        for (j = 0; j < spotMini.length; j++) {
          spotMini[j].style.display = "block";
        }
      }

      // .DOTDOTDOT
      // truncate long descriptions and add 'readmore'/'readless' buttons
      $(".spotDesc").dotdotdot({
        // show readMore button
        ellipsis: "... ",
        wrap: "word ",
        fallbackToLetter: true,
        after: "a.readMore",
        watch: "window",
        // change spotDesc height based on window size
        height: function() {
          if ($(window).width() < 768) {
            return 160;
          } else {
            return 230;
          }
        },
        tolerance: 0,
        callback: function dotdotdotCallback(isTruncated, originalContent) {
          $("a.readLess").hide();
          if (isTruncated) {
            $("a.readMore").show();
            $("a.readMore").on("click", function(event) {
              // show readLess button
              $("a.readMore").parent().trigger("destroy");
              $("a.readMore").hide();
              $("spotDesc").dotdotdot({
                after: "a.readLess"
              });
              $("a.readLess").show();
              $("a.readLess").on("click", function() {
                // show readMore button (uses recursion)
                $("a.readLess").hide();
                $(".spotDesc").dotdotdot({
                  ellipsis: "... ",
                  wrap: "word ",
                  fallbackToLetter: true,
                  after: "a.readMore",
                  watch: "window",
                  height: function() {
                    // change spotDesc height based on window size
                    if ($(window).width() < 768) {
                      return 160;
                    } else {
                      return 230;
                    }
                  },
                  tolerance: 0,
                  callback: dotdotdotCallback
                });
              });
            });
          } else {
            // if not truncated, do nothing
            $("a.readMore").hide();
          }
        }
      });
      // /.DOTDOTDOT
    }
    // /spotBtn()


    // expand spotlight on bookBtn click
    for (i = 0; i < bookBtn.length; i++) {
      bookBtn[i].addEventListener("click", spotBtn, false);
    }
    for (i = 0; i < spotMiniBtn.length; i++) {
      spotMiniBtn[i].addEventListener("click", function() {
        for (j = 0; j < spotToggle.length; j++) {
          spotToggle[j].style.display = "none";
        }
        for (j = 0; j < spotMini.length; j++) {
          spotMini[j].style.display = "none";
        }
      });
    }
    // --------- /SPOTLIGHT ---------



    // --------- SCROLL TO TOP BUTTON ---------
    var scrollTopBtn = document.getElementsByClassName("scrollTopBtn");

    // call scrollTop() which calls topFunction()
    window.onscroll = function() {
      scrollTop();
    };

    // scroll to top on click
    function topFunction() {
      document.body.scrollTop = 0; // Chrome, Safari, Opera
      document.documentElement.scrollTop = 0; // IE & Firefox
    }

    // initiated on scroll
    function scrollTop() {
      for (i = 0; i < scrollTopBtn.length; i++) {
        // show button when scrolled down 300px from top (all browser support)
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollTopBtn[i].style.display = "block";
        } else {
            scrollTopBtn[i].style.display = "none";
        }

        // when scrollTopBtn reaches bottom of page, make color solid
        if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 5) {
          scrollTopBtn[i].style.backgroundColor = "orange";
        } else {
          scrollTopBtn[i].style.backgroundColor = "rgba(255,165,0,0.7)";
        }

        // scroll to top on click
        scrollTopBtn[i].addEventListener("click", topFunction, false);
      }
    }
    // --------- /SCROLL TO TOP BUTTON ---------



    // --------- SCROLL DOWN BUTTON ---------
    // scroll down vars
    var row = document.getElementsByClassName("row");
    var footer = document.getElementsByClassName("footer");

    // keeps track of number of books displayed on page
    var n = 12;

    // only display 12 books to start
    for (i = 1; i < bookItems.length; i++) {
      if (i > i % 12) {
        bookItems[i].style.display = "none";
      }
      if (i === 12) {
        document.querySelector(".counter").innerHTML = '<p>Showing <span class="numCounter">' + i + '</span> results of <span class="numCounter">' + total + '</span></p>';
      }
    }

    // scroll down on click
    function scrollDown() {
      for (i = n; i < bookItems.length; i++) {
        // hide scrollDownBtn when reach bottom
        if (i + 1 === total) {
          document.querySelector(".counter").innerHTML = '<p>Showing <span class="numCounter">' + total + '</span> results of <span class="numCounter">' + total + '</span></p>';
          for (j = 0; j < scrollDownBtn.length; j++) {
            scrollDownBtn[j].style.display = "none";
          }
        }
        // display 12 more books on click of scrollDownBtn
        if (n !== i && i % 12 === 0) {
          n = i;
          document.querySelector(".counter").innerHTML = '<p>Showing <span class="numCounter">' + n + '</span> results of <span class="numCounter">' + total + '</span></p>';
          break;
        }
        bookItems[i].style.display = "block";
      }
    }
    // /scrollDown()

    // scroll down on click
    for (i = 0; i < scrollDownBtn.length; i++) {
      scrollDownBtn[i].addEventListener("click", scrollDown, false);
    }

    // hide scrollDownBtn if there are no more than 12 books
    if (total <= 12) {
      for (i = 0; i < scrollDownBtn.length; i++) {
        scrollDownBtn[i].style.display = "none";
      }
      document.querySelector(".counter").innerHTML = '<p>Showing ' + total + ' results of ' + total + '</p>';
    }
    // --------- /SCROLL DOWN BUTTON ---------



    // --------- SORT, COUNTER, DROP ---------

    if (total === undefined) {
      total = 0;
    }
    // --------- /SORT, COUNTER, DROP ---------



    var authors = [];
    for (i = 0; i < authorsF.length, i < authorsL.length; i++) {
      // replace excel's '-' with empty string for missing first/last names (i.e. '- Herodotus' would become 'Herodotus')
      if (authorsF[i] === "-") {
        authorsF[i] = "";
      }
      if (authorsL[i] === "-") {
        authorsL[i] = "";
      }
      authors.push(authorsF[i] + " " + authorsL[i]);
    }

    // --------- BOOKS ---------
    // JSON content vars
    var bookTitle = document.querySelectorAll(".bookTitle");
    var bookAuthor = document.querySelectorAll(".bookAuthor");
    var bookDate = document.querySelectorAll(".bookDate");

    // populate book blocks with JSON content
    for (i = 0; i < bookTitle.length, i < bookAuthor.length, i < bookDate.length; i++) {
      // replace excel's '-' with 'Unknown' for missing dates
      if (dates[i] === "-") {
        dates[i] = "Unknown";
      }
      // replace lame dates (6/0/2016) with good ones (June 2016)
      if (dates[i].match(/\/0\//)) {
        dates[i] = dates[i].replace(/^1\/0\//, "January ").replace(/^2\/0\//, "February ").replace(/^3\/0\//, "March ").replace(/^4\/0\//, "April ").replace(/^5\/0\//, "May ").replace(/^6\/0\//, "June ").replace(/^7\/0\//, "July ").replace(/^8\/0\//, "August ").replace(/^9\/0\//, "September ").replace(/^10\/0\//, "October ").replace(/^11\/0\//, "November ").replace(/^12\/0\//, "December ");
      }

      // display JSON content in book blocks
      bookTitle[i].innerHTML = titles[i];
      bookAuthor[i].innerHTML = "<strong>Author: </strong>" + authors[i]; // combine first and last names
      bookDate[i].innerHTML = "<strong>Date: </strong>" + dates[i];
    }
    // --------- /BOOKS ---------



    var ajax;
    var apiKey = "AIzaSyBSzt49xIBDAIoch_WI-dZDQDkfm_F0fck";
    var searchTerm = [];
    var bookURL = "https://www.googleapis.com/books/v1/volumes/?key=" + apiKey;
    var searchURL = [];

    for (i = 0; i < titles.length; i++) {
      searchTerm.push(titles[i].replace(/ /g, '+').replace(/[^A-Za-z0-9\+]/g, ''));
    }
    for (i = 0; i < searchTerm.length; i++) {
      searchURL.push("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm[i] + "&key=" + apiKey);
    }

  }
  window.addEventListener('DOMContentLoaded', init)
}
// /MAIN FUNCTION

getData();