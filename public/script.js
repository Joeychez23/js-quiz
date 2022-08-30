const data = document.querySelector('.data');
getData();
async function getData() {
    const response = await fetch('/scores');
    const val = await response.json();
    console.log(val);

    for(item of val) {
        const name = document.createElement('div');
        const score = document.createElement('div');
        score.setAttribute("style", "margin-bottom: 20px");
        name.textContent = `Name: ${item.Name}`;
        score.textContent = `Score: ${item.Score}`;

        data.append(name, score);


    }
}