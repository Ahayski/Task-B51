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

app.post('/addmyproject', addMp)
app.get('/addmyproject', addMpViews)

app.get('/myproject', myproject)

app.get('/myproject-detail/:id', myprojectDetail)

app.get('/contact', contact)

app.get('/testimonial', testimonial)



// function untuk merender page pada hbs
function home(req, res) {
    res.render('index')
}

function addMp(req, res) {
    const { project, startDate, endDate, desc, checkbox } = req.body //destructuring
    // const project = req.body.project
    // const startDate = req.body.startDate
    // const endDate = req.body.endDate
    // const desc = req.body.desc
    // const checkbox = req.body.checkbox
    // const node = req.body.node
    // const next = req.body.next
    // const react = req.body.react
    // const typeS = req.body.typeS

    console.log('Project :', project)
    console.log('Star Date :', startDate)
    console.log('End Date :', endDate)
    console.log('Description :', desc)
    console.log('Technologies :', checkbox)
    // console.log('Node Js :', node)
    // console.log('Next Js :', next)
    // console.log('React Js :', react)
    // console.log('TypeScript :', typeS)

    res.redirect('addmyproject')

}
function addMpViews(req, res) {
    res.render('addmyproject')
}

function myproject(req, res) {

    const data = [
        {
            project: "Mobile Banking",
            desc: "Aplikasi yang akan M-Banking yang akan digunakan di android"
        },
        {
            project: "Iventory Barang",
            desc: "digunakan untuk me-management barang pada PT.ABC"
        },
        {
            project: "Sistem Pakar",
            desc: "adalah aplikasi untuk mengetahui berbagai macam masalah"
        }
    ]
    res.render('myproject', { data })
}

function myprojectDetail(req, res) {
    const { id } = req.params //destructuring
    const project = "Aplikasi Inventory"
    const desc = "Pembuatan aplikasi inventory barang pada PT. ABC"

    console.log("Id nya adalah", id)

    const dataMP = {
        id,
        project,
        desc
    }

    res.render('myproject-detail', { dataMP })
}

function contact(req, res) {
    res.render('contact')
}

function testimonial(req, res) {
    res.render('testimonial')
}

// setiing untuk mendengarkan/mendapatkan letak portnya
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})