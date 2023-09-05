const allSelects = [...document.querySelectorAll("select")];
const optionsSet = [];
const selectedLabelsSet = [...Array(allSelects.length)].map((a) => []);

//convert options to stated object and replace select with dropdown menu
allSelects.forEach((select) => {
  const options = [...select.children];
  const optionSet = options.map((option) => ({
    name: option.innerText,
    isSelected: false,
  }));
  optionsSet.push(optionSet);
  const multiDropWrapper = document.createElement("div");
  multiDropWrapper.className = "multiDropWrapper";
  multiDropWrapper.innerHTML = `     
    <div class="selectedLabelBarContainer">
      <span class="selectedLabelBar"></span>
      <button class="openOptionButton">🔻</button>
    </div>
    <div class="selectionPanelContainer">
      <div class="selectionPanel"></div>
    </div>
    <button class="submitButton">submit</button>
  `;
  select.replaceWith(multiDropWrapper);
});

const selectedLabelBarSet = [...document.querySelectorAll(".selectedLabelBar")];
const selectionPanelSet = [...document.querySelectorAll(".selectionPanel")];
const openOptionButtons = [...document.querySelectorAll(".openOptionButton")];
const submitButtons = [...document.querySelectorAll(".submitButton")];

//set dropdown menu toggle button
openOptionButtons.forEach((button, index) =>
  button.addEventListener("click", (e) => {
    selectionPanelSet[index].parentElement.classList.toggle("open");
  })
);
//set submit button
submitButtons.forEach((button, index) =>
  button.addEventListener("click", () => {
    console.log(selectedLabelsSet[index]);
  })
);

//main renderer
export function renderer() {
  for (let i = 0; i < allSelects.length; i++) {
    selectedLabelsSet[i].length = 0;

    optionsSet[i].forEach((option) => {
      const checkStatus = option.isSelected ? "checked" : "";
      option.isSelected && selectedLabelsSet[i].push(option.name);
      const dropOption = document.createElement("li");
      dropOption.innerHTML = `
      <label class="option">
        <input id=${option.name} type="checkbox" ${checkStatus} value=true />
        ${option.name}
      </label>
    `;

      const checkbox = dropOption.children[0].children[0];
      checkbox.addEventListener("click", () => {
        option.isSelected = !option.isSelected;
        selectionPanelSet.forEach(
          (selectionPanel) => (selectionPanel.innerHTML = "")
        );
        renderer();
      });
      selectionPanelSet[i].appendChild(dropOption);
    });

    //put in the selected labels
    const html = selectedLabelsSet[i].reduce((string, label) => {
      string += `<span class="label">${label}</span>`;
      return string;
    }, "");
    selectedLabelBarSet[i].innerHTML = html;
  }
}
