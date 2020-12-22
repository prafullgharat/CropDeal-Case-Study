const chai = require("chai");
const server = require("../index");
const chaiHttp = require("chai-http");
const { response } = require("express");

//Assertion Style
chai.should();
chai.use(chaiHttp);

let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";
let wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu49c965F1CO0";
let farmerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDEzMTkwODBmYWMwMDcxNDNjMzA4ZCIsImVtYWlsIjoiamF5ZXNoQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiZmFybWVyIiwiaWF0IjoxNjA4MzgwODIyfQ.fUOhQffrNtUnUNn0mriUtPnjHsiWbMxjDDtjBjUCje0"

var token;
describe("Users API", () => {


    /**
     * Test the POST route 
     */

    describe("POST /api/auth/signup", () => {

        it('It should sign up user and save emailid & password in user DB', (done) => {
            const user = {
                "email": "gurunath2@gmail.com",
                "password": "gurunath2@123",
            }
            chai.request('http://localhost:4000')
                .post('/api/auth/signup')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.property("userEmail").eq("gurunath2@gmail.com");
                    response.body.should.have.property("userType").eq("null");
                    response.body.should.have.property("token");
                    token = response.body.token;

                })
            done();
        })

        it('It should not sign up user if user is already registerd', (done) => {
            const user = {
                "email": "jayesh@gmail.com",
                "password": "jayesh@123",
            }
            chai.request('http://localhost:4000')
                .post('/api/auth/signup')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('{"errors":{"email":"The email is already registered","password":"","name":""}}');
                })
            done();
        })
    })


    describe("POST /api/auth/login", () => {

        it('It should login farmer and send jwt token', (done) => {
            const user = {
                "email": "jayesh@gmail.com",
                "password": "jayesh@123",
            }
            chai.request('http://localhost:4000')
                .post('/api/auth/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.property("userEmail").eq("jayesh@gmail.com");
                    response.body.should.have.property("userType").eq("farmer");
                    response.body.should.have.property("token");
                })
            done();
        })

        it('It should login dealer and send jwt token', (done) => {
            const user = {
                "email": "soham@gmail.com",
                "password": "soham@123",
            }
            chai.request('http://localhost:4000')
                .post('/api/auth/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.property("userEmail").eq("soham@gmail.com");
                    response.body.should.have.property("userType").eq("dealer");
                    response.body.should.have.property("token");
                })
            done();
        })

        it('It should not login user if user email id is not registered', (done) => {
            const user = {
                "email": "jay@gmail.com",
                "password": "jayesh@123",
            }
            chai.request('http://localhost:4000')
                .post('/api/auth/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('{"errors":{"email":"Email is not registered","password":"","name":""}}');
                })
            done();
        })

        it('It should not login user if password is incorrect', (done) => {
            const user = {
                "email": "jayesh@gmail.com",
                "password": "jayesh@456",
            }
            chai.request('http://localhost:4000')
                .post('/api/auth/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('{"errors":{"email":"","password":"Password is incorrect","name":""}}');
                })
            done();
        })
    })





    /**
     * Test the GET route for farmer
     */

    describe("GET /api/farmer/all-farmers", () => {

        

        it("It should GET all the farmers", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";
            chai.request('http://localhost:4000')
                .get("/api/farmer/all-farmers")
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    //  response.body.length.should.be.gte(0);
                })
            done();
        })

        it("It should not GET all the farmers using wrong url", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

            chai.request('http://localhost:4000')
                .get("/api/farmer/farmers")
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        })

        it("It should not GET all the farmers without jwt token", (done) => {
            chai.request('http://localhost:4000')
                .get("/api/farmer/all-farmers")
                // .set({"Authorization":`Bearer ${adminToken}`})
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Unauthorized request"}')
                })
            done();
        })

        it("It should not GET all the farmers without using admin's jwt token", (done) => {
           let farmerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDEzMTkwODBmYWMwMDcxNDNjMzA4ZCIsImVtYWlsIjoiamF5ZXNoQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiZmFybWVyIiwiaWF0IjoxNjA4MzgwODIyfQ.fUOhQffrNtUnUNn0mriUtPnjHsiWbMxjDDtjBjUCje0"

            chai.request('http://localhost:4000')
                .get("/api/farmer/all-farmers")
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Admin Privilege needed"}')
                })
            done();
        })

    })


    /**
     * Test the GET route for Dealer
     */

    describe("GET /api/dealer/all-dealers", () => {

        let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

        it("It should GET all the dealers", (done) => {
            chai.request('http://localhost:4000')
                .get("/api/dealer/all-dealers")
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    //  response.body.length.should.be.gte(0);
                })
            done();
        })

        it("It should not GET all the dealers using wrong url", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

            chai.request('http://localhost:4000')
                .get("/api/dealer/dealers")
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        })

        it("It should not GET all the dealers without jwt token", (done) => {
            chai.request('http://localhost:4000')
                .get("/api/dealer/all-dealers")
                // .set({"Authorization":`Bearer ${adminToken}`})
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Unauthorized request"}')
                })
            done();
        })

        it("It should not GET all the dealers without using admin's jwt token", (done) => {
            let farmerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDEzMTkwODBmYWMwMDcxNDNjMzA4ZCIsImVtYWlsIjoiamF5ZXNoQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiZmFybWVyIiwiaWF0IjoxNjA4MzgwODIyfQ.fUOhQffrNtUnUNn0mriUtPnjHsiWbMxjDDtjBjUCje0"

            chai.request('http://localhost:4000')
                .get("/api/dealer/all-dealers")
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Admin Privilege needed"}')
                })
            done();
        })

    })



    /**
    * Test the GET (by id) route for farmer
    */

    describe("GET  /api/farmer/get/:email", () => {

        it("It should GET farmer by using farmer's email id", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

            let farmerEmail = "jayesh@gmail.com"
            let farmerName = "jayesh"
            chai.request('http://localhost:4000')
                .get("/api/farmer/get/" + farmerEmail)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("_id");
                    response.body.should.have.property("email").eq(farmerEmail);
                    response.body.should.have.property("name").eq(farmerName);
                    response.body.should.have.property("phone");
                    response.body.should.have.property("userType").eq("farmer");

                })
            done();
        })

        it("It should not GET the farmer with wrong email id", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

            let farmerEmail = "jay@gmail.com"
            chai.request('http://localhost:4000')
                .get("/api/farmer/get/" + farmerEmail)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"User does not exits with given email id"}')
                })
            done();
        })

        it("It should not GET the farmer without jwt token", (done) => {
            let farmerEmail = "jayesh@gmail.com";
            chai.request('http://localhost:4000')
                .get("/api/farmer/get/" + farmerEmail)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Unauthorized request"}')
                })
            done();
        })

    })

    /**
     * Test the GET (by id) route for dealer
     */

    describe("GET  /api/dealer/get/:email", () => {

        let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

        it("It should GET dealer by using dealer's email id", (done) => {
            let dealerEmail = "soham@gmail.com"
            let dealerName = "soham"
            chai.request('http://localhost:4000')
                .get("/api/dealer/get/" + dealerEmail)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("_id");
                    response.body.should.have.property("email").eq(dealerEmail);
                    response.body.should.have.property("name").eq(dealerName);
                    response.body.should.have.property("phone");
                    response.body.should.have.property("userType").eq("dealer");

                })
            done();
        })

        it("It should not GET the dealer with wrong email id", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

            let dealerEmail = "jay@gmail.com"
            chai.request('http://localhost:4000')
                .get("/api/dealer/get/" + dealerEmail)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"User does not exits with given email id"}')
                })
            done();
        })

        it("It should not GET the dealer without jwt token", (done) => {
            let dealerEmail = "soham@gmail.com";
            chai.request('http://localhost:4000')
                .get("/api/dealer/get/" + dealerEmail)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Unauthorized request"}')
                })
            done();
        })

    })



    /**
    * Test the PUT route for farmer
    */

    describe('PUT /api/farmer/update/:email', () => {

        it("It should update farmer's data", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";
            let farmerEmail = "jayesh@gmail.com";
            const farmer = {
                "address": "Mumbai"
            }
            chai.request('http://localhost:4000')
                .put('/api/farmer/update/' + farmerEmail)
                .send(farmer)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("email").eq(farmerEmail);
                    response.body.should.have.property("address").eq("Mumbai");
                })
            done();
        })

        it("It should not update farmer if email id is wrong", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

            let farmerEmail = "jay@gmail.com";
            const farmer = {
                "address": "Thane"
            }
            chai.request('http://localhost:4000')
                .put('/api/farmer/update/' + farmerEmail)
                .send(farmer)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"User does not exits with given email id"}')
                })
            done();
        })

        it("It should not update farmer's data if user is neither admin nor the farmer himself", (done) => {
            let farmerEmail = "jayesh@gmail.com";
            let diffUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGI5M2I1NWIwMTgzMTM1OGUxN2VlMiIsImVtYWlsIjoiZG5naGFyYXQ5NDI5QGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiZmFybWVyIiwiaWF0IjoxNjA4Mzg0OTAzfQ.5_Kxdzs8K8SLCWBV5HK-h2PKnbGZCogzjZuh80ZrvbE";
            const farmer = {
                "address": "Thane"
            }
            chai.request('http://localhost:4000')
                .put('/api/farmer/update/' + farmerEmail)
                .send(farmer)
                .set({ "Authorization": `Bearer ${diffUserToken}` })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"You are not authorized"}')
                })
            done();
        })
    })



    /**
     * Test the PUT route for dealer
     */

    describe('PUT /api/dealer/update/:email', () => {

        it("It should update dealer's data", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";
            let dealerEmail = "soham@gmail.com";
            const dealer = {
                "address": "Dombivali"
            }
            chai.request('http://localhost:4000')
                .put('/api/dealer/update/' + dealerEmail)
                .send(dealer)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("email").eq(dealerEmail);
                    response.body.should.have.property("address").eq("Dombivali");
                })
            done();
        })

        it("It should not update dealer if email id is wrong", (done) => {
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

            let dealerEmail = "jay@gmail.com";
            const dealer = {
                "address": "Thane"
            }
            chai.request('http://localhost:4000')
                .put('/api/dealer/update/' + dealerEmail)
                .send(dealer)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"User does not exits with given email id"}')
                })
            done();
        })

        it("It should not update dealer's data if user is neither admin nor the dealer himself", (done) => {
            let dealerEmail = "soham@gmail.com";
            let diffUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGI5M2I1NWIwMTgzMTM1OGUxN2VlMiIsImVtYWlsIjoiZG5naGFyYXQ5NDI5QGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiZmFybWVyIiwiaWF0IjoxNjA4Mzg0OTAzfQ.5_Kxdzs8K8SLCWBV5HK-h2PKnbGZCogzjZuh80ZrvbE";
            const dealer = {
                "address": "Thane"
            }
            chai.request('http://localhost:4000')
                .put('/api/dealer/update/' + dealerEmail)
                .send(dealer)
                .set({ "Authorization": `Bearer ${diffUserToken}` })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"You are not authorized"}')
                })
            done();
        })

        it("It should push crop name in dealer's subscribed_crops array", (done) => {
            let dealerEmail = "soham@gmail.com";
            let dealerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2U1OTc2OWRlNGRhMTJjNGZmMjQ2ZCIsImVtYWlsIjoic29oYW1AZ21haWwuY29tIiwidXNlclR5cGUiOiJkZWFsZXIiLCJpYXQiOjE2MDg0MDk5Njd9.PPJ-RaYUCERGvoCzP7gVu3CzoQ_sVz_JxYhfoLkEl4Q"
            const dealer = {
                "cropName": "Corn"
            }
            chai.request('http://localhost:4000')
                .put('/api/dealer/subscribe')
                .send(dealer)
                .set({ "Authorization": `Bearer ${dealerToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.should.contain("Corn");

                })
            done();
        })

        it("It should not push crop name in dealer's subscribed_crops array if it already exits", (done) => {
            let dealerEmail = "soham@gmail.com";
            let dealerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2U1OTc2OWRlNGRhMTJjNGZmMjQ2ZCIsImVtYWlsIjoic29oYW1AZ21haWwuY29tIiwidXNlclR5cGUiOiJkZWFsZXIiLCJpYXQiOjE2MDg0MDk5Njd9.PPJ-RaYUCERGvoCzP7gVu3CzoQ_sVz_JxYhfoLkEl4Q"
            const dealer = {
                "cropName": "Mango"
            }
            chai.request('http://localhost:4000')
                .put('/api/dealer/subscribe')
                .send(dealer)
                .set({ "Authorization": `Bearer ${dealerToken}` })
                .end((err, response) => {
                    response.should.have.status(422);
                    response.text.should.be.eq('{"error":"Already Subscribed"}')
                })
            done();
        })


        it("It should remove crop name from dealer's subscribed_crops array", (done) => {
            let dealerEmail = "soham@gmail.com";
            let dealerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2U1OTc2OWRlNGRhMTJjNGZmMjQ2ZCIsImVtYWlsIjoic29oYW1AZ21haWwuY29tIiwidXNlclR5cGUiOiJkZWFsZXIiLCJpYXQiOjE2MDg0MDk5Njd9.PPJ-RaYUCERGvoCzP7gVu3CzoQ_sVz_JxYhfoLkEl4Q"
            const dealer = {
                "cropName": "Corn"
            }
            chai.request('http://localhost:4000')
                .put('/api/dealer/unsubscribe')
                .send(dealer)
                .set({ "Authorization": `Bearer ${dealerToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                })
            done();
        })


        
    })


    /**
    * Test the DELETE route for farmer
    */

    describe('DELETE /api/farmer/delete/:email', () => {
        let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";
   
        it("It should delete farmer", (done) => {
            let farmerEmail = "gurunath@gmail.com";
            chai.request('http://localhost:4000')
                .delete('/api/farmer/delete/' + farmerEmail)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.be.eq('{"message":"Farmer Deleted"}')
                })
            done();
        })

        it("It should not delete farmer if user is not admin", (done) => {
            let farmerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDEzMTkwODBmYWMwMDcxNDNjMzA4ZCIsImVtYWlsIjoiamF5ZXNoQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiZmFybWVyIiwiaWF0IjoxNjA4MzgwODIyfQ.fUOhQffrNtUnUNn0mriUtPnjHsiWbMxjDDtjBjUCje0"

            let farmerEmail = "jayesh@gmail.com";
            chai.request('http://localhost:4000')
                .delete('/api/farmer/delete/' + farmerEmail)
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Admin Privilege needed"}')
                })
            done();
        })
    })

    
    /**
    * Test the DELETE route for dealer
    */

   describe('DELETE /api/dealer/delete/:email', () => {
        let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";

        it("It should delete dealer", (done) => {
            let dealerEmail = "sumit@gmail.com";
            chai.request('http://localhost:4000')
                .delete('/api/dealer/delete/' + dealerEmail)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.be.eq('{"message":"Dealer Deleted"}')
                })
            done();
        })

    
        it("It should not delete dealer if user is not admin", (done) => {
            let farmerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDEzMTkwODBmYWMwMDcxNDNjMzA4ZCIsImVtYWlsIjoiamF5ZXNoQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiZmFybWVyIiwiaWF0IjoxNjA4MzgwODIyfQ.fUOhQffrNtUnUNn0mriUtPnjHsiWbMxjDDtjBjUCje0"

            let dealerEmail = "soham@gmail.com";
            chai.request('http://localhost:4000')
                .delete('/api/dealer/delete/' + dealerEmail)
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Admin Privilege needed"}')
                })
            done();
        })
    })

})









