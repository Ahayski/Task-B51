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
    const p_duration = durationInDays(inputStart, inputEnd)


    inputImage = URL.createObjectURL(inputImage[0])
    const duration = durationInMonth(p_duration)

    const MP = {
        Project: inputProject,
        startDate: inputStart,
        endDate: inputEnd,
        duration,
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
    document.getElementById("contents-in").innerHTML = ''
    for (let index = 0; index < dataMP.length; index++) {
        document.getElementById("contents-in").innerHTML += `
        <div class="MP-card">
        
        <div class="img-utama"><img src="${dataMP[index].image}" alt="Foto Profil"> </div>
        <div class="card1">
        <a href="./myproject-detail.html"><h3>${dataMP[index].Project}</h3></a>
            <p>Duration : ${dataMP[index].duration}</p>
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
// add duration in days
function durationInDays(inputStart, inputEnd) {
    // 1000 msec, 60 sec, 60 minutes, 24 hours
    const oneDay = 1000 * 60 * 60 * 24;

    const startDate = new Date(inputStart).getTime();
    const endDate = new Date(inputEnd).getTime();
    const durationMs = endDate - startDate;

    // add 1 day if start & end is same day
    return Math.floor(durationMs / oneDay);
}

// add duration in month
function durationInMonth(days) {
    monthDuration = Math.floor(days / 30);
    daysDuration = days % 30;

    // if less than a month return to days
    if (monthDuration == 0) {
        return `${daysDuration} Days`;
    }

    if (daysDuration > 20) {
        monthDuration++;
    }
    else if (daysDuration <= 20 && daysDuration > 10) {
        monthDuration += 0.5;
    }

    return `${monthDuration} Months`
}