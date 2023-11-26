const express = require('express')
const path = require('path')
app = express()
const port = 5000

// setting (hbs) variabel global, configuration  dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

// accesible/mengakses assets  sebagai middleware
app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false })) //(Body Parser) untuk ngeparsing data yang client kirim lewat sebuah body
// mengapa menggunakan extended yaitu untuk memakai querryString, lalu mengapa value nya adalah false 
// karena kita ingin memakai querryStringnya Express, sedangkan jika valuenya adalah true kita menggunakan querryStringnya third party contohnya qs


// routing
app.get('/', home)
app.post('/delete-MP/:id', deleteMP)

app.post('/addmyproject', addMp)
app.get('/addmyproject', addMpViews)

app.post('/update-myproject', updateMP)
app.get('/update-myproject/:id', updateMPViews)


app.get('/myproject', myproject)

app.get('/myproject-detail/:id', myprojectDetail)

app.get('/contact', contact)

app.get('/testimonial', testimonial)

// Data source
let days = ""
let months = ""
const data = []



// function untuk merender page pada hbs
function home(req, res) {
    res.render('index', { data })
}




function addMp(req, res) {
    let { project, startDate, endDate, desc, node, next, react, typeS } = req.body //destructuring

    console.log('Project :', project)
    console.log('Star Date :', startDate)
    console.log('End Date :', endDate)
    console.log('Description :', desc)
    // console.log('Technologies :', checkbox)
    console.log('Node Js :', node)
    console.log('Next Js :', next)
    console.log('React Js :', react)
    console.log('TypeScript :', typeS)

    if (typeof node === 'undefined') {
        node = false
    }
    if (typeof next === 'undefined') {
        next = false
    }
    if (typeof react === 'undefined') {
        react = false
    }
    if (typeof typeS === 'undefined') {
        typeS = false
    }

    let checkbox = { node, react, next, typeS }

    const dataMP = {
        project, startDate, endDate, desc, node, react, next, typeS, duration: waktu(startDate, endDate),
        techs: Icon(checkbox)
    }
    data.unshift(dataMP)
    res.redirect('/')

}



function deleteMP(req, res) {
    const { id } = req.params
    console.log("delete index ke ", id)
    data.splice(id, 1)
    res.redirect('/')
}

function updateMP(req, res) {
    let { id, project, startDate, endDate, desc, node, next, react, typeS } = req.body //destructuring

    console.log('ID :', id)
    console.log('Project :', project)
    console.log('Star Date :', startDate)
    console.log('End Date :', endDate)
    console.log('Description :', desc)
    // console.log('Technologies :', checkbox)
    console.log('Node Js :', node)
    console.log('Next Js :', next)
    console.log('React Js :', react)
    console.log('TypeScript :', typeS)

    if (typeof node === 'undefined') {
        node = false
    }
    if (typeof next === 'undefined') {
        next = false
    }
    if (typeof react === 'undefined') {
        react = false
    }
    if (typeof typeS === 'undefined') {
        typeS = false
    }

    let checkbox = { node, react, next, typeS }
    const dataMP = {
        id,
        project,
        startDate,
        endDate,
        desc,
        node,
        next,
        react,
        typeS,
        duration: waktu(startDate, endDate),
        techs: Icon(checkbox)
    }
    data[parseInt(id)] = dataMP
    // const dataMP = { project, startDate, endDate, desc, node, next, react, typeS }
    // data.unshift(dataMP)
    res.redirect('/')
}
function updateMPViews(req, res) {
    const { id } = req.params
    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)
    console.log("Data Filter", dataFilter)
    res.render('update-myproject', { data: dataFilter })
}

function addMpViews(req, res) {
    res.render('addmyproject')
}

function myproject(req, res) {
    res.render('myproject', { data })
}

function myprojectDetail(req, res) {
    const { id } = req.params //destructuring
    const project = "Aplikasi Inventory"
    const desc = "Pembuatan aplikasi inventory barang pada PT. ABC"

    console.log("Id nya adalah", id)

    const dataDetail = {
        id,
        project,
        desc
    }

    res.render('myproject-detail', { dataDetail })
}

function contact(req, res) {
    res.render('contact')
}

function testimonial(req, res) {
    res.render('testimonial')
}


function waktu(awal, akhir) {

    let dataStart = new Date(awal)
    let dataEnd = new Date(akhir)
    let oneDay = 1000 * 3600 * 24

    let selisih = dataEnd.getTime() - dataStart.getTime()
    let totaldays = selisih / oneDay
    months = Math.floor(totaldays / 30)
    days = totaldays % 30
    if (months > 0) {
        return months + " Bulan"
    } else if (days > 0) {
        return days + " Hari"
    }
}

function Icon(icon) {

    let codeIcon = ""

    if (icon.node) {
        codeIcon += `<div class="col-md-auto"><img src="../assets/icon/nodejs.png"></div>`
    }
    if (icon.next) {
        codeIcon += `<div class="col-md-auto"><img src="../assets/icon/nextjs.png"></div>`
    }
    if (icon.react) {
        codeIcon += `<div class="col-md-auto"><img src="../assets/icon/reactjs.png"></div>`
    }
    if (icon.typeS) {
        codeIcon += `<div class="col-md-auto"><img src="../assets/icon/typescript.png"></div>`
    }

    return codeIcon
}

function viewIconHbs(icon) {

    let codeIcon = ""

    if (icon.node) {
        codeIcon += `<i class="fa-brands fa-node-js mb-3">&nbsp Node js</i>`
    }
    if (icon.react) {
        codeIcon += `<i class="fa-brands fa-react mb-3">&nbsp React js</i>`
    }
    if (icon.next) {
        codeIcon += `<i class="fa-brands fa-vuejs mb-3">&nbsp Next js</i>`
    }
    if (icon.script) {
        codeIcon += `<i class="fa-brands fa-js mb-3">&nbsp Type Script</i>`
    }

    return codeIcon
}

function newDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Augu", "Sept", "Oct", "Nov", "Dec"];

    const d = new Date(date)

    let day = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${month} ${year}`
}

// setiing untuk mendengarkan/mendapatkan letak portnya
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})