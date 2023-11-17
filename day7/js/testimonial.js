// OOP 

// class untuk membuat blueprint/cetakan yang akan digunakan pada objet
class Testimonial {
    constructor(name, review, image) {
        this.name = name
        this.review = review
        this.image = image
    }
    // methode html untuk mendapatkan/mengembalikan nilai pada html 
    html() {
        return `
            <div class="testimonial">
                <img src="${this.image}" class="profile-testimonial" />
                <p class="quote">"${this.review}"</p>
                <p class="author">- ${this.name}</p>
            </div>
        `
    }
}


// membuat objek dari cetakan atau blueprint class yang telah kita buat
const testimonial1 = new Testimonial("Febryan", "Dumbways sangat debestt", "https://images.pexels.com/photos/5220075/pexels-photo-5220075.jpeg?auto=compress&cs=tinysrgb&w=600")
const testimonial2 = new Testimonial("Sahal", "MU tetap dihati, meski harus masuk goa setiap hari", "https://i.pinimg.com/736x/78/d3/7a/78d37a52a7faea9c4dcfcf2a83292cb5.jpg")
const testimonial3 = new Testimonial("Mentor Surya", "Manusia hanyalah alat", "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600")

// sebuah array yang berisi data object
const testimonials = [testimonial1, testimonial2, testimonial3]

// perulangan untuk menambahkan hmtl() sesuai dengan length/ banyak data yang ada
let testimonialHTML = ``
for (let index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html()
}

// untuk mengisi data pada pada html menggunakan innerHTML diambil dari 
document.getElementById("testimonials").innerHTML = testimonialHTML