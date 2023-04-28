let select = document.querySelectorAll("select"),
  from = document.querySelector(".from textarea"),
  to = document.querySelector(".to textarea"),
  textarea = document.querySelector("textarea"),
  change = document.querySelector(".fa-exchange"),
  icons = document.querySelectorAll(".icons i");

select.forEach((tag, name) => {
  for (const k in countries) {
    // select as English language and Arabic language by default
    let selected;
    if (name == 0 && k == "en-US") {
      selected = "selected";
    } else if (name == 1 && k == "ar-SA") {
      selected = "selected";
    }

    let option = `<option value="${k}" ${selected}>${countries[k]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

change.addEventListener("click", () => {
  // exchange textarea values onclick
  let temp = from.value;
  from.value = to.value;
  to.value = temp;
  // exchange select values onclick
  let tempSelect = select[0].value;
  select[0].value = select[1].value;
  select[1].value = tempSelect;
  translate();
});

select.forEach((e) => {
  e.addEventListener("change", () => {
    translate();
  });
});
function translate() {
  const n_from = from.value;
  const transFrom = select[0].value;
  const transTo = select[1].value;
  if (!n_from) return;
  to.setAttribute("placeholder", "translation here");
  // add my text to api and take the translate
  let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${transFrom}&tl=${transTo}&dt=t&q=${n_from}`;
  fetch(url)
    .then((result) => result.json())
    .then((data) => (to.value = data[0][0][0]));
  to.setAttribute("placeholder", "translation here");
}
textarea.onkeyup = translate;

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    // if clicked in the icon has from id ,speak the from textarea value ,else speak to text area valuo
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(from.value);
      } else {
        navigator.clipboard.writeText(to.value);
      }
    } else {
      let utterance;
      // if clicked in the icon has from id ,speak the from textarea value ,else speak to text area valuo

      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(from.value);
        utterance.lang = select[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(to.value);
        utterance.lang = select[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
