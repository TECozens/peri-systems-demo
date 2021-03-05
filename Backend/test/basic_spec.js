let expect = require("chai").expect;
let request = require("supertest");
const app = require('../server.js');

describe("GET /", () => {
  it("respond with Hello World", (done) => {
    request(app).get("").expect("Server is up and running", done);
  })
});

// describe("Basic test", () => {
//   it("Sanity check", () => {
//     expect(1 + 1).to.equal(2)
//   })
// });
//
// describe("Server tests", () => {
//   it("Index returns 200 status code", () => {
//     request('http://localhost:5000/', body => {
//       console.log("res:", body)
//       expect(body.response.statusCode).to.equal(200)
//     })
//   })

// it("Index has a plain white background", () => {
//   request('http://localhost:5000/', (error, body, response) => {
//     expect(body).to.equal("ffffff");
//   })
// })
// })