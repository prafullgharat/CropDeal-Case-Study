const chai = require("chai");
const server = require("../index");
const chaiHttp = require("chai-http");
const { response } = require("express");

//Assertion Style
chai.should();
chai.use(chaiHttp);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDZlMDFkZmQ0ZmFkNDE3NDkwOWNiNiIsImVtYWlsIjoicHJhZnVsZ2hhcmF0NjRAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwODM3NzAwMH0.eRHeNmc_s1a0oLsrSBnvLYKFfIvdCxnu46c965K1bO0";


describe("Orders API", () => {



    /**
     * Test the GET route for farmer
     */

    describe("GET /api/order", () => {

        it("It should GET all the orders", (done) => {
            chai.request('http://localhost:8080')
                .get("/api/order")
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    //  response.body.length.should.be.gte(0);
                })
            done();
        })

    })

    
    /**
     * Test the GET route for order by farmer id
     */

    describe("GET /api/order/farmer/:email", () => {
        farmerEmail = "jayesh@gmail.com"
        it("It should GET all the orders by farmer id", (done) => {
            chai.request('http://localhost:8080')
                .get("/api/order/farmer/" + farmerEmail)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body[0].should.be.a("object");
                    response.body[0].should.have.property("farmerEmail").eq("jayesh@gmail.com");
                    // console.log(response.body[0]);
                    //  response.body.length.should.be.gte(0);
                })
            done();
        })

    })


    
    
    /**
     * Test the GET route for order by dealer id
     */

    describe("GET /api/order/dealer/:email", () => {
        dealerEmail = "soham@gmail.com"
        it("It should GET all the orders by dealer id", (done) => {
            chai.request('http://localhost:8080')
                .get("/api/order/dealer/" + dealerEmail)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body[0].should.be.a("object");
                    response.body[0].should.have.property("dealerEmail").eq("soham@gmail.com");
                    // console.log(response.body[0]);
                    //  response.body.length.should.be.gte(0);
                })
            done();
        })
    })


      
    /**
    * Test the GET (by id) route 
    */

   describe("GET  /api/order/:id", () => {

        it("It should GET a order by id ", (done) => {
            let orderId = "5fdb977a31db7340f0efeeba" 
            chai.request('http://localhost:8080')
                .get("/api/order/" + orderId)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("Object");
                    response.body.should.have.property("farmerEmail").eq("jayesh@gmail.com");
                    response.body.should.have.property("dealerEmail").eq("soham@gmail.com");
                    response.body.should.have.property("cropName").eq("Orange");
                    response.body.should.have.property("category").eq("fruit");
                })
            done();
        })
    })


     /**
     * Test the POST route 
     */

    describe("POST /api/order", () => {
     
        it('It should POST a new order', (done) => {
            const order = {
                paymentId: 'pay_GEBxooRjqsUgVW',
                farmerEmail: 'jayesh@gmail.com',
                dealerEmail: 'soham@gmail.com',
                farmerName: 'jayesh',
                dealerName: 'soham',
                category: 'fruit',
                cropName: 'Mango',
                quantity: '40',
                pricePerKg: 10,
                totalAmount: 400,
            }
            chai.request('http://localhost:8080')
                .post('/api/order')
                .set({ "Authorization": `Bearer ${token}` })
                .send(order)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.property("farmerEmail").eq("jayesh@gmail.com");
                    response.body.should.have.property("dealerEmail").eq("soham@gmail.com");
                    response.body.should.have.property("cropName").eq("Mango");
                    response.body.should.have.property("category").eq("fruit");
                })
            done();
        })

        it('It should not POST a new order if payment id is not provided', (done) => {
            const order = {
                // paymentId: 'pay_GEBxooRjqsUgVW',
                farmerEmail: 'jayesh@gmail.com',
                dealerEmail: 'soham@gmail.com',
                farmerName: 'jayesh',
                dealerName: 'soham',
                category: 'fruit',
                cropName: 'Mango',
                quantity: '40',
                pricePerKg: 10,
                totalAmount: 400,
            }
            chai.request('http://localhost:8080')
                .post('/api/order')
                .set({ "Authorization": `Bearer ${token}` })
                .send(order)
                .end((err, response) => {
                    response.should.have.status(422);
                    // console.log(response.body);
                })
            done();
        })

        
        it('It should not POST a new order if farmer Email id is not provided', (done) => {
            const order = {
                paymentId: 'pay_GEBxooRjqsUgVW',
                // farmerEmail: 'jayesh@gmail.com',
                dealerEmail: 'soham@gmail.com',
                farmerName: 'jayesh',
                dealerName: 'soham',
                category: 'fruit',
                cropName: 'Mango',
                quantity: '40',
                pricePerKg: 10,
                totalAmount: 400,
            }
            chai.request('http://localhost:8080')
                .post('/api/order')
                .set({ "Authorization": `Bearer ${token}` })
                .send(order)
                .end((err, response) => {
                    response.should.have.status(422);
                    // console.log(response.body);
                })
            done();
        })

        it('It should not POST a new order if dealer Email id is not provided', (done) => {
            const order = {
                paymentId: 'pay_GEBxooRjqsUgVW',
                farmerEmail: 'jayesh@gmail.com',
                // dealerEmail: 'soham@gmail.com',
                farmerName: 'jayesh',
                dealerName: 'soham',
                category: 'fruit',
                cropName: 'Mango',
                quantity: '40',
                pricePerKg: 10,
                totalAmount: 400,
            }
            chai.request('http://localhost:8080')
                .post('/api/order')
                .set({ "Authorization": `Bearer ${token}` })
                .send(order)
                .end((err, response) => {
                    response.should.have.status(422);
                    // console.log(response.body);
                })
            done();
        })

        it('It should not POST a new order if total amount is not provided', (done) => {
            const order = {
                paymentId: 'pay_GEBxooRjqsUgVW',
                farmerEmail: 'jayesh@gmail.com',
                dealerEmail: 'soham@gmail.com',
                farmerName: 'jayesh',
                dealerName: 'soham',
                category: 'fruit',
                cropName: 'Mango',
                quantity: '40',
                pricePerKg: 10,
                // totalAmount: 400,
            }
            chai.request('http://localhost:8080')
                .post('/api/order')
                .set({ "Authorization": `Bearer ${token}` })
                .send(order)
                .end((err, response) => {
                    response.should.have.status(422);
                    // console.log(response.body);
                })
            done();
        })

    })


        
    /**
    * Test the DELETE (by id) route 
    */

   describe("DELETE  /api/order/:id", () => {

        it("It should DELETE a order by id ", (done) => {
            let orderId = "5fe26ef29d00dd389ccece09" 
            chai.request('http://localhost:8080')
                .delete("/api/order/" + orderId)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("Object");
                    response.body.should.have.property("_id").eq(orderId);
                
                    // console.log(response.body);
                })
            done();
        })
    })

})