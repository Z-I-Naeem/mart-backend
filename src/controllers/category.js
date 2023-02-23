const slugify = require('slugify');
const Category = require('../models/categoryModel');



const allCategories = (categories, parentId = null) =>{  

    const categoryList = []
    let category;

    if(parentId == null) {
        category = categories.filter( cat => cat.parentId == undefined)
    }else{
        category = categories.filter( cat => cat.parentId == parentId)
    }

    for (cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: allCategories(categories, cat._id)
        })
    }

    return categoryList

}


exports.categories = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
        parentId: req.body?.parentId
    }
    if(req.file){
        categoryObj.image = process.env.API + '/public/'+ req.file.filename
    }
    console.log(categoryObj);

    const cat = new Category(categoryObj)
    cat.save((err, category) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        if (category) {
            return res.status(201).json({
                category
            })
        }
    })


}


exports.getCategories = (req, res) => {

    Category.find({}).exec( (err, category) => {
        if(err) return res.status(400).json({ err })
        if ( category ){
            
            const fullCategories = allCategories(category)
            return res.status(201).json({fullCategories})
        } 
    })


}