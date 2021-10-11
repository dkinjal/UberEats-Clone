var assert = require("chai").assert
var app = require("../server")

var chai = require("chai")
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app)

//Unit Test begin
describe("MochaTest", function () {
  //User Login
  it("should not login",  ()=> {
    agent.post("/user/login")
      .send({
        email: "user1@sjsu.edu",
        password: "User123",
      })
      
      .then(function ( res) {
        console.log("Status: ", res.status);
        expect(JSON.parse(res.text)["message"]).to.equal("Wrong username/password!");
        
      }).catch(error=>{
          console.log(error)
      })
      
  });
    //user sign up
    it("Should sign up", function () {
        agent
          .put("/user/signup")
          .send({
            
            email: "subway@sjsu.edu",
            password: "Subway"
          })
          .expect(200)
          .end(function ( res) {
            console.log("Status: ", res.status);
            res.status.should.equal(200);
            done();
          });
      });
      //Add group page
      it("Should add group", function (done) {
        agent
          .get("/favourite/1")
          .send({
            
          })
          .expect(200)
          .end(function (err, res) {
            console.log("Status: ", res.status);
            res.status.should.equal(200);
            done();
          });
      });
       //Get Single Event
  it("Should search the given user by username", function (done) {
    agent
      .get("/users/searchbyname")
      .query({ username: "admin" })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
  it("Should search the given user by email", function (done) {
    agent
      .get("/order/update1/1")
      .query()
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});