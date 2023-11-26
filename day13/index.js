const express = require('express')
const path = require('path')
app = express()
const port = 5000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

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
const data = []



// function untuk merender page pada hbs
async function home(req, res) {
    const query = 'SELECT * FROM tb_projects'
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log('ini adlaah table Project dari database', object)
    res.render('index', { data: object })
}




function addMp(req, res) {
    const { project, startDate, endDate, desc, node, next, react, typeS } = req.body //destructuring

    console.log('Project :', project)
    console.log('Star Date :', startDate)
    console.log('End Date :', endDate)
    console.log('Description :', desc)
    // console.log('Technologies :', checkbox)
    console.log('Node Js :', node)
    console.log('Next Js :', next)
    console.log('React Js :', react)
    console.log('TypeScript :', typeS)

    const dataMP = { project, startDate, endDate, desc, node, next, react, typeS }
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
    const { id, project, startDate, endDate, desc, node, next, react, typeS } = req.body //destructuring

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

    data[parseInt(id)] = {
        id,
        project,
        startDate,
        endDate,
        desc,
        node,
        next,
        react,
        typeS
    }
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

// setiing untuk mendengarkan/mendapatkan letak portnya
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})