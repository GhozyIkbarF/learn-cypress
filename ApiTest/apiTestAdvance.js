const expect = require("chai").expect;
const request = require("supertest")
const BaseUrlTravelayouts = "https://api.travelpayouts.com";
const BaseUrlDummyJson = "https://dummyjson.com";
const EndpointTravelPayouts = {
  getCheapPrice: "/v1/prices/cheap",
  getAllAirports: "/v2/airports",
  getAllCities: "/v2/cities",
  getAllCountries: "/v2/countries",
  getAllCountriesByCode: "/v2/countries/:code",
  getAllCountriesByName: "/v2/countries/:name",
};
const Endpoint = {
  getAllProduct: "/products",
  getSingleProduct: "/products/:id",
  searchProduct: "/products/search",
  addProduct: "/products/add",
  updateProduct: "/products/update/:id",
  deleteProduct: "/products/delete/:id",
};

const HeadersTravelPayouts = {
  "Content-Type": "application/json",
  "X-Access-Token" : "321d6a221f8926b5ec41ae89a3b2ae7b"
};

const HeadersDummyJson = {
  "Content-Type": "application/json",
};

let res;

describe("Test api travel payouts", async function () {
    it("Get cheap price", async function () {
        // Send Get Request
        const res = await request(BaseUrlTravelayouts).get('/v1/prices/cheap').set(HeadersTravelPayouts);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.an("object");
        // console.log(res.body);
        }
    );
});


describe("Dummy json search product", async function () {
    const parameter = {
        q: "phone",
        limit: 10,
        skip: 10,
        select: 'title,price',
        // desc: true,
    }

    afterEach(function () {
        console.log(res.body);
        console.log(res.status);
        // console.log(res.headers);
    });

    it("Search Product", async function () {
        // Send Get Request
        res = await request(BaseUrlDummyJson).get(`/products/search?${parameter.q}`).set(HeadersDummyJson);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("products");
        expect(res.body.products).to.be.an("array");
        }
    );

    delete parameter.q;

    it("API search products with limit and skip", async function () {
        // Send Get Request
        res = await request(BaseUrlDummyJson)
        .get('/products/search')
        .set(HeadersDummyJson)
        .query(parameter);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("products");
        expect(res.body.products).to.be.an("array").that.has.lengthOf(10);
        // console.log(res.body);
        
        res.body.products.forEach((product) => {
            expect(product).to.have.property("id");
            expect(product).to.have.property("title");
            // expect(product).to.have.property("description");
            // expect(product).to.have.property("category");
            expect(product).to.have.property("price");
            // expect(product).to.have.property("stock");
            // expect(product).to.have.property("rating");
            // expect(product).to.have.property("discountPercentage");
            // expect(product).to.have.property("thumbnail");
            // expect(product).to.have.property("images").to.be.an("array");
            // expect(product).to.have.property("brand");
            expect(Object.keys(product).length).to.be.at.most(3); // check if the object has at most 3 properties
        });
    });


    // it.only("Get single product", async function () { it only untuk menjalankan test case ini saja
    it("Get single product", async function () {
        // Send Get Request
        res = await request(BaseUrlDummyJson).get('/products/1').set(HeadersDummyJson);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("title");
        expect(res.body).to.have.property("description");
        expect(res.body).to.have.property("category");
        expect(res.body).to.have.property("price");
        expect(res.body).to.have.property("stock");
        expect(res.body).to.have.property("rating");
        expect(res.body).to.have.property("discountPercentage");
        expect(res.body).to.have.property("thumbnail");
        expect(res.body).to.have.property("images").to.be.an("array");
        expect(res.body).to.have.property("brand");
    });

    it("Get single product - negative", async function () {
        // Send Get Request
        res = await request(BaseUrlDummyJson).get('/products/5000').set(HeadersDummyJson);
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message").that.includes("Product with id '5000' not found");
    });

    after(function () {
        console.log("Test selesai");
    });
});
