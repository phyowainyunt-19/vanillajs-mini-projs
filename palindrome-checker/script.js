const textInput = document.querySelector(".form input"),
  checkBtn = document.querySelector(".form button"),
  infoText = document.querySelector(".info-text");
let filterInput;

checkBtn.addEventListener("click", () => {
  let reverseInput = filterInput.split("").reverse().join("");
  infoText.style.display = "block";
  if (filterInput != reverseInput) {
    return (infoText.innerHTML = `No, <span>'${textInput.value}'</span> isn't a palindrome!`);
  }
  return (infoText.innerHTML = `Yes, <span>'${textInput.value}'</span> is a palindrome!`);
});
textInput.addEventListener("keyup", () => {
  // remove spaces and all special chars
  filterInput = textInput.value.toLowerCase().replace(/[^A-Z0-9]/gi, "");
  if (filterInput) {
    return checkBtn.classList.add("active");
  }
  infoText.style.display = "none";
  checkBtn.classList.remove("active");
});
