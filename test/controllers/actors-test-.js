const chaiHttp = require("chai-http");
const chai = require("chai");
const { expect } = chai;

chai.use(chaiHttp);

describe("actors routes", () => {
  context("search/movie", () => {
    it("should fetch the movies played by a given actor", (done) => {
      chai
        .request("http://localhost:3090")
        .get("/api/actors/search/movie?name=Chris+Evans")
        .end((err, response) => {
          expect(response.error).to.be.false;
          expect(response.body).has.length.greaterThan(0);
          expect(response.status).eq(200);
          done();
        });
    });

    it("should throw a bad request exception when not specifying the name of the actor in the query", (done) => {
      chai
        .request("http://localhost:3090")
        .get("/api/actors/search/movie")
        .end((err, response) => {
          expect(response.error).to.exist;
          expect(response.status).eq(400);
          done();
        });
    });

    it("should return empty array when given a random actor name that doesn't play in any Marvel movie", (done) => {
      chai
        .request("http://localhost:3090")
        .get("/api/actors/search/movie?name=Exampe")
        .end((err, response) => {
          expect(response.body).to.be.eql([]);
          expect(response.status).eq(200);
          done();
        });
    });
  });

  context("characters", () => {
    it("should fetch the actors that have played more than one character", (done) => {
      chai
        .request("http://localhost:3090")
        .get("/api/actors/characters?min=2")
        .end((err, response) => {
          expect(response.error).to.be.false;
          expect(response.body).to.be.an("array");
          const data = response.body[0];
          expect(data["characters"]).to.have.length.greaterThan(0);
          expect(response.status).eq(200);
          done();
        });
    });

    it("should throw a bad request exception when not specifying the minimum number of characters", (done) => {
      chai
        .request("http://localhost:3090")
        .get("/api/actors/characters")
        .end((err, response) => {
          expect(response.error).to.exist;
          expect(response.status).eq(400);
          done();
        });
    });

    it("should throw a bad request exception when given a wrong query parameter", (done) => {
      chai
        .request("http://localhost:3090")
        .get("/api/actors/characters?min=string")
        .end((err, response) => {
          expect(response.error).to.exist;
          expect(response.status).eq(400);
          done();
        });
    });
  });
});
