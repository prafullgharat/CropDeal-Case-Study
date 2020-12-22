const chai = require("chai");
const server = require("../index");
const chaiHttp = require("chai-http");
const { response } = require("express");

var fs = require('fs');


//Assertion Style
chai.should();
chai.use(chaiHttp);

let jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";
let farmerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDEzMTkwODBmYWMwMDcxNDNjMzA4ZCIsImVtYWlsIjoiamF5ZXNoQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiZmFybWVyIiwiaWF0IjoxNjA4MzgwODIyfQ.fUOhQffrNtUnUNn0mriUtPnjHsiWbMxjDDtjBjUCje0"
let dealerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2U1OTc2OWRlNGRhMTJjNGZmMjQ2ZCIsImVtYWlsIjoic29oYW1AZ21haWwuY29tIiwidXNlclR5cGUiOiJkZWFsZXIiLCJpYXQiOjE2MDg1NTI1NDV9.uYhpfOXTHa7tjMZaxjYAYjMhJ3LQSvI87Nu43JuWZzM";

describe("Crops API", () => {

    /**
     * Test the GET route 
     */

    describe("GET /api/crops", () => {

        it("It should GET all the crops", (done) => {
            chai.request('http://localhost:3000')
                .get("/api/crops")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                })
            done();
        })
    })
    
    /**
    * Test the GET (by id) route 
    */

   describe("GET  /api/crop/:id", () => {
        // it("It should GET a crop by id ", (done) => {
        //     let jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";
        //     let cropId = "5fdb917eed6a352c88f63097" 
        //     chai.request('http://localhost:3000')
        //         .get("/api/crop/" + cropId)
        //         .set({ "Authorization": `Bearer ${jwtToken}` })
        //         .end((err, response) => {
        //             response.should.have.status(200);
        //             response.body.should.be.a("Object");
        //             response.body.should.have.property("farmerEmail").eq("jayesh@gmail.com");
        //             response.body.should.have.property("farmerName").eq("jayesh");
        //             response.body.should.have.property("name").eq("Mango");
        //             response.body.should.have.property("category").eq("fruit");
        //         })
        //     done();
        // })

        it("It should not GET get a crop by wrong id ", (done) => {
            let cropId = "5fdb9271ed6a352c88f63090" 
            chai.request('http://localhost:3000')
                .get("/api/crop/" + cropId)
                .set({ "Authorization": `Bearer ${jwtToken}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"error":"Crop does not exits with given id"}')
                })
            done();
        })

        it("It should not GET the crop details without jwt token", (done) => {
            let cropId = "5fdb9271ed6a352c88f63099" 
            chai.request('http://localhost:3000')
                .get("/api/crop/" + cropId)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Unauthorized request"}')
                })
            done();
        })

    })


       /**
     * Test the GET crops by farmer id route 
     */

    describe("GET /api/crop/farmer/:email", () => {
        let farmerEmail = "jayesh@gmail.com"
        it("It should GET all the crops by farmer id", (done) => {
            chai.request('http://localhost:3000')
                .get("/api/crop/farmer/" + farmerEmail)
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body[0].should.be.a("object");
                    response.body[0].should.have.property("farmerEmail").eq(farmerEmail);
                })
            done();
        })
    })

    
    /**
     * Test the GET crops subscribed by dealer route 
     */

    describe("POST /api/crop/dealer", () => {

        it("It should GET all the subscribed crops by dealer", (done) => {
            const body = {
                subscribedCrops: ["Mango","Potato"],
                categoryArray: ["vegetable", "fruit"]
            }
            chai.request('http://localhost:3000')
                .post("/api/crop/dealer/")
                .send(body)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    // console.log(response.body);
                })
            done();
        })
    })

    /**
     * Test the GET crops filtered by category  route 
     */

    describe("POST /api/filtered-crops", () => {

        it("It should GET crops filtered by category ", (done) => {
            categoryArray =  ["fruit"]
            chai.request('http://localhost:3000')
                .post("/api/filtered-crops")
                .send(categoryArray)
                .set({ "Authorization": `Bearer ${jwtToken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body[0].should.have.property("category").eq("fruit");
                    // console.log(response.body);
                })
            done();
        })
    })


     /**
     * Test the POST route 
     */

    describe("POST /api/crop", () => {

        it('It should POST a new crop', (done) => {
            chai.request('http://localhost:3000')
                .post('/api/crop')
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .field('Content-Type', 'multipart/form-data')
                .field('name', 'Corn')
                .field('category', 'vegetable')
                .field('description', 'testing upload image...')
                .field('address', 'Thane')
                .field('quantity', 50)
                .field('farmerEmail', 'jayesh@gmail.com')
                .attach('image', './test/images/corn.jpg')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.property("farmerEmail").eq("jayesh@gmail.com");
                    response.body.should.have.property("name").eq("Corn");
                    response.body.should.have.property("category").eq("vegetable");
                    response.body.should.have.property("cropImage");
                })
            done();
        })

        it('It should not POST a new crop if image is not attached', (done) => {
            chai.request('http://localhost:3000')
                .post('/api/crop')
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .field('Content-Type', 'multipart/form-data')
                .field('name', 'Corn')
                .field('category', 'vegetable')
                .field('description', 'testing...')
                .field('quantity', 50)
                .field('farmerEmail', 'jayesh@gmail.com')
                .end((err, response) => {
                    response.should.have.status(422);
                    response.text.should.be.eq('{"error":"Image is required"}')
                })
            done();
        })

        it('It should not POST a new crop if image file size is more than 1MB', (done) => {
            chai.request('http://localhost:3000')
                .post('/api/crop')
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .field('Content-Type', 'multipart/form-data')
                .field('name', 'Mango')
                .field('category', 'fruit')
                .field('description', 'testing...')
                .field('address', 'Thane')
                .field('quantity', 50)
                .field('farmerEmail', 'jayesh@gmail.com')
                .attach('image', './test/images/mango.jpg')
                .end((err, response) => {
                    response.should.have.status(422);
                    response.text.should.be.eq('{"error":"File too large"}')
                })
            done();
        })

        it('It should not POST a new crop if image file type is not jpeg, jpg or png', (done) => {
            chai.request('http://localhost:3000')
                .post('/api/crop')
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .field('Content-Type', 'multipart/form-data')
                .field('name', 'Mango')
                .field('category', 'fruit')
                .field('description', 'testing...')
                .field('address', 'Thane')
                .field('quantity', 50)
                .attach('image', './test/images/mango.pdf')
                .end((err, response) => {
                    response.should.have.status(422);
                    response.text.should.be.eq('{"error":"file should of type jpeg, jpg or png"}')
                    
                })
            done();
        })

        
        it('It should not POST a new crop if category field is not provided', (done) => {
            chai.request('http://localhost:3000')
                .post('/api/crop')
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .field('Content-Type', 'multipart/form-data')
                .field('name', 'banana')
                // .field('category', 'fruit')
                .field('description', 'testing...')
                .field('address', 'Thane')
                .field('quantity', 50)
                .attach('image', './test/images/banana.jpg')
                .end((err, response) => {
                    // console.log(response.body);
                    response.should.have.status(400);
                    response.text.should.be.eq('{"errors":{"name":"","category":"Category field is required","address":"","description":"","quantity":"","cropImage":"","farmerEmail":""}}');
                })
            done();
        })


        it('It should not POST a new crop if address fields is not provided', (done) => {
            chai.request('http://localhost:3000')
                .post('/api/crop')
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .field('Content-Type', 'multipart/form-data')
                .field('name', 'mango')
                .field('category', 'fruit')
                .field('description', 'testing...')
                // .field('address', 'Thane')
                .field('quantity', 50)
                .attach('image', './test/images/mango1.jpg')
                .end((err, response) => {
                    // console.log(response.body);
                    // console.log(response.text);
                    response.should.have.status(400);
                    response.text.should.be.eq('{"errors":{"name":"","category":"","address":"Address field is required","description":"","quantity":"","cropImage":"","farmerEmail":""}}');
                })
            done();
        })

        it('It should not POST a new crop if name fields is not provided', (done) => {
            chai.request('http://localhost:3000')
                .post('/api/crop')
                .set({ "Authorization": `Bearer ${farmerToken}` })
                .field('Content-Type', 'multipart/form-data')
                // .field('name', 'banana')
                .field('category', 'fruit')
                .field('description', 'testing...')
                .field('address', 'Thane')
                .field('quantity', 50)
                .attach('image', './test/images/mango2.jpg')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('{"errors":{"name":"Please enter name of crop.","category":"","address":"","description":"","quantity":"","cropImage":"","farmerEmail":""}}');
                    // console.log(response.body);

                })
            done();
        })

        
        it('It should not POST a new crop if user is not farmer', (done) => {
            chai.request('http://localhost:3000')
                .post('/api/crop')
                .set({ "Authorization": `Bearer ${jwtToken}` })
                .field('Content-Type', 'multipart/form-data')
                .field('name', 'mango')
                .field('category', 'fruit')
                .field('description', 'testing...')
                .field('address', 'Thane')
                .field('quantity', 50)
                .attach('image', './test/images/mango3.jpg')
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('{"error":"Farmer Privilege needed"}');
                    // console.log(response.body);
                })
            done();
        })

    })


    /**
    * Test the DELETE (by id) route 
    */

//    describe("DELETE  /api/crop/:id", () => {

//     it("It should DELETE a crop by id ", (done) => {
//         let cropId = "5fe26f13f330943a24a326da" 
//         chai.request('http://localhost:3000')
//             .delete("/api/crop/" + cropId)
//             .set({ "Authorization": `Bearer ${farmerToken}` })
//             .end((err, response) => {
//                 response.should.have.status(200);
//                 response.body.should.be.a("Object");
//                 response.body.should.have.property("_id").eq(cropId);
            
//                 // console.log(response.body);
//             })
//         done();
//     })
// })



});