const textInput = document.querySelector(".form input");

textInput.addEventListener("keyup", () => {
  // remove spaces and all special chars
  let filterInput = textInput.value.replace(/[^A-Z0-9]/gi, "");
  console.log(filterInput);
});
