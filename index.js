const express=require('express');
const app=express();
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');
app.use(express.json())
const items=require('./items')
require('./config')

const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title: 'Node Js Api Documentation',
            version: '1.0.0'
        },
        servers:[
            {
                url:'http://localhost:8080/'
            }
        ]
    },
    apis: ['./index.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(swaggerSpec))

/**
 * @swagger
 * /:
 *  get:
 *      summary: check api Get Method
 *      description: This Api method used to check Get Method is working Or Not
 *      responses:
 *          200:
 *              description: to test get method
 * 
 */

app.get('/',(req,res)=>{
    res.send('checking Simple get Method')
    // res.json({name:"balu",age:22,gender:"male",email:"balu1072000@gmail.com",Phone:9380552833})
})

/**
 * @swagger
 * components:
 *     schemas:
 *         Book:
 *             type: object
 *             properties:
 *                 BookName:
 *                     type: string
 *                 Author:
 *                     type: string
 *                 Price:
 *                     type: number
 *                 id:
 *                     type: number
 */




/**
 * @swagger
 * /api/books:
 *  get:
 *      summary: Check api get Method with Books
 *      description: data is about book details
 *      responses:
 *          200:
 *              description: testing Get Method
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Book'
 *                                
 */

app.get('/api/books', async(req,res)=>{
    const data= await items.find()
    res.send(data)
    // res.send('Getting data with Swagger Checking')
})

/**
 * @swagger
 * /api/book/{Author}:
 *  get:
 *      summary: Check api get Method with Books Author
 *      description: data is about book details unique id
 *      parameters:
 *          - in: path
 *            name: Author
 *            required: true
 *            description: Author name required
 *            schema: 
 *              type: string
 *      responses:
 *          200:
 *              description: testing Get by ID Method
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Book'
 *                                
 */

app.get('/api/book/:Author',async(req,res)=>{
    console.log(req.params)
    const result= await items.findOne(req.params)
    console.log(result)
    res.send(result)
})

/**
 * @swagger
 * /api/book/addbook:
 *  post:
 *      summary: Check api Post Method
 *      description: data is about to post Book Details
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Book'
 *      responses:
 *          200:
 *              description: Data Added successfully
 *              
 *                                
 */

app.post('/api/book/addbook',async(req,res)=>{
    const data= new items(req.body)
    console.log(req.body)
    const result= await data.save()
    res.send(result)
})

/**
 * @swagger
 * /api/book/update/{id}:
 *  put:
 *      summary: Check api Put Method
 *      description: data is about to put Book Details
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: id name required
 *            schema: 
 *              type: integer
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Book'
 *      responses:
 *          200:
 *              description: Data Added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Book'
 *                                
 */

app.put('/api/book/update/:id',async (req,res)=>{
    const data = await items.update(
        req.params,
        {$set: req.body}
    )
    res.send(data)
    console.log(data)
})

/**
 * @swagger
 * /api/book/delete/{id}:
 *  delete:
 *      summary: Check api delete Method with Books id
 *      description: deleting
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id required
 *            schema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Data Deleted Successfully
 *                                
 */

app.delete('/api/book/delete/:id',async (req,res)=>{
    const data = await items.deleteOne(req.params)
    console.log(data)
    res.send(data)
})



app.listen(8080)
console.log('server is running on port 8080')