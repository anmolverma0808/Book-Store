import express from 'express';
import {Book} from '../models/bookmodels.js';

const router = express.Router();

router.post('/',async (req,res) => {
    try{
        // const title = req.body.title;
        // const author = req.body.author;
        // const publishYear = req.body.publishYear;

        const {title,author,publishYear} = req.body;
        if(!title || !author || !publishYear){
            return res.status(400).send({
                message: "Enter all required fields: title, author, publisher"
            })
        }

        const newBook = {
            title : title,
            author: author,
            publishYear: publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

router.get('/',async (request,response) => {
    try{
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

router.get('/:id',async (request,response) => {
    try{
        const {id} = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

router.put('/:id', async (request,response) => {
    try{
        const {title,author,publishYear} = request.body;

        if(!title || !author || !publishYear){
            return response.status(400).send({
                message: "Send all requires fields: title, author, publishYear"
            })
        }

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: "Book not found."});
        }

        return response.status(200).send({message: "Book updated successfully"});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

router.delete('/:id', async (request,response) => {
    try{

        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: "Book not found."});
        }

        return response.status(200).send({message: "Book deleted successfully"})
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;