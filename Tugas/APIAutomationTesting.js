const dotenv = require("dotenv");
const expect = require("chai").expect;
const request = require("supertest");

dotenv.config();

// --- Constants ---
const BaseUrl = 'https://restful-booker.herokuapp.com';
const Headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const authPayload = {
    username: process.env.MY_USERNAME,
    password: process.env.MY_PASSWORD,
};

const bookingPayload = require("../Fixtures/bookingPayload.json"); 

// --- Variables ---
let res;
let bookingId;

// --- Helper Functions ---
const compareData = (expected, actual) => {
    for (const key in expected) {
        const expectedValue = expected[key];
        const actualValue = actual[key];

        if (Array.isArray(expectedValue)) {
            expect(actualValue).to.be.an("array").that.has.lengthOf(expectedValue.length);
            expectedValue.forEach((item, index) => {
                if (typeof item === "object" && item !== null) {
                    compareData(item, actualValue[index]);
                } else {
                    expect(actualValue[index]).to.equal(item);
                }
            });
        } else if (typeof expectedValue === "object" && expectedValue !== null) {
            expect(actualValue).to.be.an("object");
            compareData(expectedValue, actualValue);
        } else {
            expect(actual).to.have.property(key);
            expect(actualValue).to.equal(expectedValue);
        }
    }
};

const logResponse = () => {
    console.log("Response Body:", JSON.stringify(res.body, null, 2));
    console.log("Status Code:", res.status);
};

// --- Test Suites ---
describe("API Tests - Restful Booker", function () {
    before(() => console.log("Starting API tests..."));
    after(() => console.log("API tests finished."));

    afterEach(() => logResponse());

    it("Should generate Auth Token", async function () {
        res = await request(BaseUrl)
            .post("/auth")
            .send(authPayload)
            .set(Headers);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("token").that.is.a("string");

        Headers.Cookie = `token=${res.body.token}`;
    });

    it("Should create a Booking", async function () {
        res = await request(BaseUrl)
            .post("/booking")
            .send(bookingPayload)
            .set(Headers);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("bookingid").that.is.a("number");
        expect(res.body).to.have.property("booking").that.is.an("object");
        // expect(res.body.booking).to.have.property("firstname");
        // expect(res.body.booking.firstname).to.equal(bookingPayload.firstname);
        // expect(res.body.booking).to.have.property("lastname");
        // expect(res.body.booking.lastname).to.equal(bookingPayload.lastname);
        // expect(res.body.booking).to.have.property("totalprice");
        // expect(res.body.booking.totalprice).to.equal(bookingPayload.totalprice);
        // expect(res.body.booking).to.have.property("depositpaid");
        // expect(res.body.booking.depositpaid).to.equal(bookingPayload.depositpaid);
        // expect(res.body.booking).to.have.property("bookingdates");
        // expect(res.body.booking.bookingdates).to.be.an("object");
        // expect(res.body.booking.bookingdates).to.have.property("checkin");
        // expect(res.body.booking.bookingdates.checkin).to.equal(bookingPayload.bookingdates.checkin);
        // expect(res.body.booking.bookingdates).to.have.property("checkout");
        // expect(res.body.booking.bookingdates.checkout).to.equal(bookingPayload.bookingdates.checkout);
        // expect(res.body.booking).to.have.property("additionalneeds");
        // expect(res.body.booking.additionalneeds).to.equal(bookingPayload.additionalneeds);
        compareData(bookingPayload, res.body.booking);
        bookingId = res.body.bookingid;
    });

    it("Should retrieve created Booking", async function () {
        res = await request(BaseUrl)
            .get(`/booking/${bookingId}`)
            .set(Headers);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        // expect(res.body).to.have.property("firstname");
        // expect(res.body.firstname).to.equal(bookingPayload.firstname);
        // expect(res.body).to.have.property("lastname");
        // expect(res.body.lastname).to.equal(bookingPayload.lastname);
        // expect(res.body).to.have.property("totalprice");
        // expect(res.body.totalprice).to.equal(bookingPayload.totalprice);
        // expect(res.body).to.have.property("depositpaid");
        // expect(res.body.depositpaid).to.equal(bookingPayload.depositpaid);
        // expect(res.body).to.have.property("bookingdates");
        // expect(res.body.bookingdates).to.be.an("object");
        // expect(res.body.bookingdates).to.have.property("checkin");
        // expect(res.body.bookingdates.checkin).to.equal(bookingPayload.bookingdates.checkin);
        // expect(res.body.bookingdates).to.have.property("checkout");
        // expect(res.body.bookingdates.checkout).to.equal(bookingPayload.bookingdates.checkout);
        // expect(res.body).to.have.property("additionalneeds");
        // expect(res.body.additionalneeds).to.equal(bookingPayload.additionalneeds);
        compareData(bookingPayload, res.body);
    });

    it("Should delete the Booking", async function () {
        res = await request(BaseUrl)
            .delete(`/booking/${bookingId}`)
            .set(Headers);

        expect(res.status).to.equal(201);
    });
});
