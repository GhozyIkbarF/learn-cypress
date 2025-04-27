const dotenv = require("dotenv");
const expect = require("chai").expect;
const request = require("supertest")

dotenv.config();

const BaseUrl = 'https://restful-booker.herokuapp.com'
const Headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};
const authPayload = {
    "username": process.env.MY_USERNAME,
    "password": process.env.MY_PASSWORD
};
let res;
let bookingId;
const bookingPayload = {
    "firstname": "Ghozy Ikbar",
    "lastname": "Fathoni",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
};

describe("API test booker heroku", async function () {
    before(function () {
        console.log("Starting test...");
    });

    afterEach(function () {
        console.log(res.body);
        console.log(res.status);
    });

    after(function () {
        console.log("Test finished.");  
    });

    // API auth - untuk mendapatkan token, dipakai untuk token saat hapus booking
    // ● Credential user harus ditaruh di file .env terpisah
    // ● Expect status code sudah sesuai dokumentasi
    it("Get Auth Token", async function () {
        res = await request(BaseUrl).post("/auth").send(authPayload).set(Headers);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");
        Headers.Cookie = `token=${res.body.token}`;  
    });

    // API createBooking - untuk membuat data booking baru, output responsenya
    // mendapatkan bookingId
    // ● Data booking harus ditaruh di file .json terpisah
    // ● Expect status code sudah sesuai dokumentasi
    // ● Expect isi body sudah sesuai dengan body yang digunakan saat request
    it("Create Booking", async function () {
        this.timeout(5000);
        res = await request(BaseUrl).post("/booking").send(bookingPayload).set(Headers);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("bookingid");
        expect(res.body.bookingid).to.be.a("number");
        expect(res.body).to.have.property("booking");
        expect(res.body.booking).to.be.an("object");
        expect(res.body.booking).to.have.property("firstname");
        expect(res.body.booking.firstname).to.equal(bookingPayload.firstname);
        expect(res.body.booking).to.have.property("lastname");
        expect(res.body.booking.lastname).to.equal(bookingPayload.lastname);
        expect(res.body.booking).to.have.property("totalprice");
        expect(res.body.booking.totalprice).to.equal(bookingPayload.totalprice);
        expect(res.body.booking).to.have.property("depositpaid");
        expect(res.body.booking.depositpaid).to.equal(bookingPayload.depositpaid);
        expect(res.body.booking).to.have.property("bookingdates");
        expect(res.body.booking.bookingdates).to.be.an("object");
        expect(res.body.booking.bookingdates).to.have.property("checkin");
        expect(res.body.booking.bookingdates.checkin).to.equal(bookingPayload.bookingdates.checkin);
        expect(res.body.booking.bookingdates).to.have.property("checkout");
        expect(res.body.booking.bookingdates.checkout).to.equal(bookingPayload.bookingdates.checkout);
        expect(res.body.booking).to.have.property("additionalneeds");
        expect(res.body.booking.additionalneeds).to.equal(bookingPayload.additionalneeds);
        bookingId = res.body.bookingid;
    });

    // API getBooking - untuk memastikan data booking sudah dibuat
    // ● bookingId harus didapatkan dari API createBooking pada step 2
    // ● Expect status code sudah sesuai dokumentasi
    // ● Expect isi body sudah sesuai dengan body yang digunakan saat
    // createBooking
    it("Get Booking", async function () {
        this.timeout(5000);
        res = await request(BaseUrl).get(`/booking/${bookingId}`).set(Headers);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("firstname");
        expect(res.body.firstname).to.equal("Ghozy Ikbar");
        expect(res.body).to.have.property("lastname");
        expect(res.body.lastname).to.equal("Fathoni");
        expect(res.body).to.have.property("totalprice");
        expect(res.body.totalprice).to.equal(111);
        expect(res.body).to.have.property("depositpaid");
        expect(res.body.depositpaid).to.equal(true);
        expect(res.body).to.have.property("bookingdates");
        expect(res.body.bookingdates).to.be.an("object");
        expect(res.body.bookingdates).to.have.property("checkin");
        expect(res.body.bookingdates.checkin).to.equal("2018-01-01");
        expect(res.body.bookingdates).to.have.property("checkout");
        expect(res.body.bookingdates.checkout).to.equal("2019-01-01");
    });

    // API deleteBooking - untuk menghapus data booking, memerlukan bookingId dan
    // token
    // ● Token harus didapatkan dari API auth pada step 1
    // ● Expect status code sudah sesuai dokumentasi

    it("Delete Booking", async function () {
        this.timeout(5000);
        res = await request(BaseUrl).delete(`/booking/${bookingId}`).set(Headers);
        expect(res.status).to.equal(201);
    });

});