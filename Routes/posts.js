import express from "express";
import data from "../data";
import bodyParser from "body-parser";

const postRouter = express.Router();
postRouter.use(bodyParser.json()); // to use body object in requests

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - author
 *         - bookName
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a book
 *         author:
 *           type: string
 *           description: book of author
 *         bookName:
 *           type: string
 *           descripton: book name
 *       example:
 *         id: 1
 *         author: Adam Fawer
 *         bookName: Empati
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Books
 *    description: about books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns all books and authors
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: the list of the books and authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */

postRouter.get("/", (req, res) => {
  res.send(data);
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Gets book and author by id
 *     tags: [Books]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of book
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: books by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: post can not be found
 */

postRouter.get("/:id", (req, res) => {
  const post = data.find((post) => post.id === +req.params.id);

  if (!post) {
    res.sendStatus(404);
  }

  res.send(post);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */

postRouter.post("/", (req, res) => {
  try {
    const post = {
      ...req.body,
      id: data.length + 1,
    };

    data.push(post);

    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Updates books by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         decsription: The book was updated succesfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: the book was not found.
 *       500:
 *         description: Some errors happend.
 *
 */

postRouter.put("/:id", (req, res) => {
  try {
    let post = data.find((post) => post.id === +req.params.id);
    post.author = req.body.author;
    post.bookName = req.body.bookName;

    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 *  /books/{id}:
 *    delete:
 *      summary: Removes book from array
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: book id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The book was deleted succesfully!
 *        404:
 *          description: The book was not found
 *
 */

postRouter.delete("/:id", (req, res) => {
  let post = data.find((post) => post.id === +req.params.id);
  const index = data.indexOf(post);

  if (post) {
    data.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = postRouter;
