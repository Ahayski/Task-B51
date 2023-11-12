const dataMP = []

function submitMP(event) {
    event.preventDefault()
    let inputProject = document.getElementById("inputProject").value
    let inputStart = document.getElementById("inputStart").value
    let inputEnd = document.getElementById("inputEnd").value
    let inputDesc = document.getElementById("inputDesc").value

    let inputNode = document.getElementById("inputNode").checked
    let inputNext = document.getElementById("inputNext").checked
    let inputReact = document.getElementById("inputReact").checked
    let inputTypeS = document.getElementById("inputTypeS").checked

    let inputImage = document.getElementById("inputImage").files

    inputImage = URL.createObjectURL(inputImage[0])

    const MP = {
        Project: inputProject,
        startDate: inputStart,
        endDate: inputEnd,
        Description: inputDesc,
        inputNode,
        inputNext,
        inputReact,
        inputTypeS,
        image: inputImage
    }
    dataMP.push(MP)
    console.log("DataMP", dataMP)
    renderMP()
}

function renderMP() {
    document.getElementById("contents").innerHTML = ''
    for (let index = 0; index < dataMP.length; index++) {
        document.getElementById("contents").innerHTML += `
        <div class="MP-card">
        
        <div class="img-utama"><img src="${dataMP[index].image}" alt="Foto Profil"> </div>
        <div class="card1">
        <a href="./myproject-detail.html"><h3>${dataMP[index].Project}</h3></a>
            <p>Durasi 3 bulan</p>
        </div>
        <div class="card2">
            <p>${dataMP[index].Description}</p>
        </div>
        <div class="card3">
            <div class="card-icon">
            ${renderTechImages(dataMP[index])}
            </div>
        </div>
        <div class="card-bt">
            <div class="btn-aksi"> <button>Edit</button></div>
            <div class="btn-aksi"> <button>Delete</button></div>
        </div>
    </div>`

    }
}

//render tech images
function renderTechImages(Object) {
    let renderIcon = "";

    if (Object.inputNode) {
        renderIcon += `<img src="assets/icon/nodejs.png">`;
    }
    if (Object.inputNext) {
        renderIcon += `<img src="assets/icon/nextjs.png">`;
    }
    if (Object.inputReact) {
        renderIcon += `<img src="assets/icon/reactjs.png">`;
    }
    if (Object.inputTypeS) {
        renderIcon += `<img src="assets/icon/typescript.png">`;
    }

    return renderIcon;
}

// Detail project