const express = require('express')
const path = require('path')
app = express()
const port = 5000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const hbs = require('hbs');//import package hbs 1

//untuk membuat/ meregister helperr
hbs.registerHelper('includes', function (arr, val, options) {
    if (arr.includes(val)) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

hbs.registerHelper('waktu', waktu)// register helper 2

// setting (hbs) variabel global, configuration  dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))
// Menggunakan Handlebars sebagai engine view
app.engine('hbs', hbs.__express); 3


// accesible/mengakses assets  sebagai middleware
app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false })) //(Body Parser) untuk ngeparsing data yang client kirim lewat sebuah body
// mengapa menggunakan extended yaitu untuk memakai querryString, lalu mengapa value nya adalah false 
// karena kita ingin memakai querryStringnya Express, sedangkan jika valuenya adalah true kita menggunakan querryStringnya third party contohnya qs


// routing
app.get('/', home, card)
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
const dataWaktu = []
const data = []



// function untuk merender page pada hbs
// Fungsi home
async function home(req, res, next) {

    const query = `SELECT * FROM tb_projects `;

    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log('Data gabungan dari tabel tb_projects dan profiles untuk home:', obj);

    //menyimpan data hasil query ke dalam res.locals atau req.locals
    res.locals.homeData = obj;

    // Lanjutkan ke fungsi atau middleware berikutnya
    next();

}
// Fungsi card
async function card(req, res) {
    const id = 3;
    const query = `SELECT * FROM profiles WHERE id='${id}'`;



    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log('Data dari tabel profiles untuk card:', obj);

    // Render halaman dengan menggunakan data dari home dan card
    res.render('index', { data: res.locals.homeData, dataCard: obj[0] });

}
async function deleteMP(req, res) {
    const { id } = req.params
    console.log("delete index ke ", id)
    data.splice(id, 1)

    const query = `DELETE FROM tb_projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })
    res.redirect('/')
}

async function addMp(req, res) {

    const { project, startDate, endDate, desc, nodejs, nextjs, reactjs, typescript } = req.body // Destructuring

    // Filter nilai yang dicentang saja
    const technologies = [
        { name: 'nodejs', value: nodejs },
        { name: 'nextjs', value: nextjs },
        { name: 'reactjs', value: reactjs },
        { name: 'typescript', value: typescript }
    ].filter(tech => tech.value === 'on').map(tech => tech.name)

    const image = "logo1.jpg"
    const query = `
            INSERT INTO public.tb_projects(name, start_date, end_date, description, technologies, image) 
            VALUES ('${project}', '${startDate}', '${endDate}', '${desc}', '{${technologies}}', '${image}')
        `

    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })



    console.log('Data berhasil disimpan', { obj })
    res.redirect('/')

}

async function updateMPViews(req, res) {
    const { id } = req.params

    const query = `SELECT * FROM tb_projects WHERE id=${id} `
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    res.locals.projectData = obj[0];
    console.log('Technologies:', res.locals.projectData.technologies)
    res.render('update-myproject', { data: res.locals.projectData })
}
async function updateMP(req, res) {
    const { id, project, startDate, endDate, desc, nodejs, nextjs, reactjs, typescript } = req.body // Destructuring

    // Filter nilai yang dicentang saja
    const technologies = [
        { name: 'nodejs', value: nodejs },
        { name: 'nextjs', value: nextjs },
        { name: 'reactjs', value: reactjs },
        { name: 'typescript', value: typescript }
    ].filter(tech => tech.value === 'on').map(tech => tech.name)
    const image = "logo1.jpg"

    const query = `UPDATE tb_projects SET id='${id}',name='${project}', start_date='${startDate}', 
    end_date='${endDate}', description='${desc}', technologies='{${technologies}}', image='${image}' WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })
    // const dataMP = { project, startDate, endDate, desc, node, next, react, typeS }
    // data.unshift(dataMP)
    res.redirect('/')
}


function addMpViews(req, res) {
    res.render('addmyproject')
}

function myproject(req, res) {


    res.render('myproject', { data })
}

async function myprojectDetail(req, res) {
    const { id } = req.params //destructuring

    const query = `SELECT * FROM tb_projects WHERE id=${id} `
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log("ini adlaha id ke", obj)
    res.render('myproject-detail', { data: obj[0] })
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

app.locals.waktu = waktu

// setiing untuk mendengarkan/mendapatkan letak portnya
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})