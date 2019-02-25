let cheerio = require("cheerio");
let url =
  "http://www.whateverorigin.org/get?url=" +
  encodeURIComponent("https://www.amazon.com/") +
  "&callback=?";

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
