
import mongoose from "mongoose"
import Article from "../models/articleModel.js"

// get all articles
export const getArticles = async (req, res) => {
    const articles = await Article.find({}).sort({createAt: -1})
    res.status(200).json(articles)
}


// get a single article
export const getArticle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such article'})
    }

    const article = await Article.findById(id)

    if (!article) {
        return res.status(404).json({error: 'No such article'})
    }

    res.status(200).json(article)
}


// create new article
export const createArticle = async (req, res) => {
    const {title, body, image, date, adminId} = req.body

    // add doc to db
    try {
        const article = await Article.create({title, body, image, date, admin: adminId})
        res.status(200).json(article)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete an article
export const deleteArticle = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such article'})
    }

    const article = await Article.findOneAndDelete({_id: id})

    if (!article) {
        return res.status(404).json({error: 'No such article'})
    }

    res.status(200).json(article)
}

// update an article
export const updateArticle = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such article'})
    }

    const article = await Article.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!article) {
        return res.status(404).json({error: 'No such article'})
    }

    res.status(200).json(article)
}
