let expect = require("chai").expect;
let request = require("request");

describe("Basic test", () => {
  it("Sanity check", () => {
    expect(1 + 1).to.equal(2)
  })
});

describe("Server tests", () => {
  it("Index returns 200 status code", () => {
    request('http://localhost:5000/', (error, body, response) => {
      expect(response.statusCode).to.equal(200)
    })
  })

  it("Index has a plain white background", () => {
    request('http://localhost:5000/', (error, body, response) => {
      expect(body).to.equal("ffffff");
    })
  })
})