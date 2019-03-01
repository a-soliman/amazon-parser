let cheerio = require("cheerio");
let axios = require("axios");
let url =
  "http://www.whateverorigin.org/get?url=" +
  encodeURIComponent("https://www.amazon.com/gp/aw/ref=mw_access") +
  "&callback=?";

console.log(url);

$.getJSON(url, function(data) {
  let content = cheerio.load(data.contents);
  console.log(content("title").html());
  appendHTML(content);
});

const appendHTML = content => {
  const container = document.querySelector(".amazon-content");
  container.innerHTML = content("body").html();
  removeAdBox();
  addUserName();
  generateMobileNavList();
  generateDeliverTo();
};

const removeAdBox = () => {
  const selector = "#desktop-grid-1-D1";
  document.querySelector(selector).remove();
};

const addUserName = () => {
  const selector = "#nav-link-accountList .nav-line-1";
  const name = "Trigg";
  document.querySelector(selector).innerText = `Hello, ${name}`;
};

const generateMobileNavList = () => {
  const template = `<a id="deals" href="/gp/aw/gb?ref_=navm_deals_btn" class="nav-a">Deals</a>
  
  <a id="wholefoods" href="/wholefoods?ref_=navm_whole_foods_non_prime_btn" class="nav-a">Whole Foods</a>
  
  <a id="prime" href="/prime?ref_=navm_prime_btn" class="nav-a">Prime</a>
  
  <a id="video" href="/b?node=2858778011&amp;rh=i%3Ainstant-video%2Cn%3A2858778011&amp;ref_=navm_video_btn" class="nav-a">Video</a>
  
  <a id="music" href="/gp/browse.html?node=14981443011&amp;ref_=navm_music_btn" class="nav-a">Music</a>`;
  let container = document.createElement("div");
  container.setAttribute("id", "nav-gwbar");
  container.className =
    "nav-gwbar-single-row nav-genz nav-gwbar-white nav-gwbar-scroll";
  container.innerHTML = template;
  document.getElementById("nav-main").append(container);
};

const generateDeliverTo = () => {
  const template = `<div class="a-declarative" data-action="glow-sheet-trigger" id="nav-global-location-slot"><div class="nav-sprite" id="nav-packard-glow-loc-icon"></div><div id="glow-ingress-block"><span class="nav-single-line" id="glow-ingress-single-line">Deliver to Trigg</span></div><input data-addnewaddress="new" id="unifiedLocation1ClickAddress" name="addressID" type="hidden" value="okmopxllpjp"></div>`;
  let container = document.createElement("div");
  container.setAttribute("id", "nav-subnav-container");
  container.className = "glow-subnav-template glow-mobile-subnav";
  container.innerHTML = template;
  document.getElementById("nav-main").append(container);
};
