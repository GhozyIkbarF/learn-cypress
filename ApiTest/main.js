const expect = require("chai").expect;
const request = require("supertest")("https://dummyjson.com");
const BaseUrl = "https://dummyjson.com";
const Endpoint = {
  getAllProduct: "/products",
  getSingleProduct: "/products/:id",
  addProduct: "/products/add",
  updateProduct: "/products/update/:id",
  deleteProduct: "/products/delete/:id",
};
const Token = '321d6a221f8926b5ec41ae89a3b2ae7be';
const Headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${Token}`,
};

//Block Test Case untuk membuat block scenario
describe("Test Dummy API", async function () {
  // It Block untuk membuat test case
  it("Get All Product", async function () {
    // Send Get Request
    const response = await request.get("/products").send();
    expect(response.status).to.equal(200);
    expect(response.body.products).to.be.an("array");
  });

  it("Invalid Endpoint", async function () {
    // Send Get Request
    const response = await request.get("/invalid").send();
    expect(response.status).to.equal(404);
  });

  it("Add Product", async function () {
    // Send Post Request
    const response = await request
      .post("/products/add")
      .set("Content-Type", "application/json")
      .send({
        title: "Laptop Baru",
      });
    expect(response.status).to.equal(201);
  });

  it.only("Get Single Product - Negative", async function () {
    // Send Get Request
    this.timeout(5000);
    const response = await request.get("/products/5000").send();
    expect(response.status).to.equal(404);
    expect(response.body.message).to.include(
      "Product with id '5000' not found"
    );
  });
});
