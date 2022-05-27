import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import fs from "fs";
import Recipe from "../models/Recipe";

const router = express.Router();

router.use(bodyParser.json()).use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Database path
const DB_PATH = './database/cookbook.json';

// parse Recipe Object
const parseRecipe = (it: any): Recipe => {
    let recipe = new Recipe().deserialize(it);
    return recipe;
}

// Parsing the File data as an array of Recipes
const formatFileData = (data: any): Array<Recipe> => {
    var recipeJournal: Array<Recipe> = [];
    data.forEach((it: any) => {
        recipeJournal.push(parseRecipe(it));
    });
    return recipeJournal;
}

// Reading from the file
const readFile = (returnJson: boolean, callback: Function) => {
    fs.readFile(DB_PATH, 'utf8', (err: any, data: any) => {
        if (err) {
            callback({
                status: 2,
                data: null,
                errors: err
            });
        }

        callback({
            status: 0,
            data: returnJson ? JSON.parse(data) : data,
            errors: null
        });
    });
};

//Writing the data
const writeFile = (fileData: any, callback: Function) => {
    fs.writeFile(DB_PATH, fileData, 'utf8', (err: any) => {
        if (err) {
            callback({
                status: 2,
                message: "Unble to access the DB"
            });
        }

        callback({
            status: 0,
            message: "Success!"
        });
    });
};

/**
* Get All Recipes
**/

router.get("/recipes", (req: Request, res: Response) => {
    console.log("Reached to Recipes");
    readFile(true, function (response: any) {
        if (response.status === 0) {
            res.status(200).send(response);
        } else {
            res.status(400).send(response);
        }
    });
});

/**
* Search by id
**/
router.get("/recipes/:id", (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    readFile(true, function (response: any) {
        if (response.status === 0) {
            let receipes: Array<Recipe> = formatFileData(response.data);
            var recipe = receipes.find(it => it.id === id);
            if (recipe !== undefined) {
                res.status(200).send({
                    status: 0,
                    data: recipe,
                    errors: null
                });
            } else {
                res.status(400).send({
                    status: 1,
                    data: null,
                    errors: "Unable to find the Recipe or It might not exist!"
                });
            }
        } else {
            res.status(400).send(response);
        }
    });
});

/**
* Search by Name or Ingredient
**/
router.get("/recipe/:type/:name", (req: Request, res: Response) => {
    console.log("Params", req.params);
    let searchWord = req.params.name;
    let type = parseInt(req.params.type);
    readFile(true, function (response: any) {
        if (response.status === 0) {
            let receipes: Array<Recipe> = formatFileData(response.data);
            var recipe = receipes.filter(it => (type === 1 ? it.ingredients.indexOf(searchWord) > -1  : it.name.indexOf(searchWord) > -1));
            console.log("filtered Recipe", recipe);
            if (recipe.length > 0) {
                res.status(200).send({
                    status: 0,
                    data: recipe,
                    errors: null
                });
            } else {
                res.status(200).send({
                    status: 1,
                    data: null,
                    errors: "Unable to find the Recipe or It might not exist!"
                });
            }
        } else {
            res.status(400).send(response);
        }
    });
});

/**
* Add a new Recipe
**/
router.post("/recipe/", (req: Request, res: Response) => {
    const recipe = parseRecipe(req.body);
    console.log("req.body", req.body);
    // console.log("recipe", recipe);
    readFile(true, function (response: any) {
        if (response.status === 0) {
            console.log("=============================");
            console.log("Receipes before push", response.data);
            console.log("=============================");
            let receipes: Array<Recipe> = formatFileData(response.data);
            console.log("Receipes Length", receipes.length);
            let filteredRecipe = receipes.find(it => it.id === recipe.id);
            console.log("Receipes Length", receipes.length);
            if (filteredRecipe === undefined) {
                receipes.push(recipe);
                console.log("=============================");
                console.log("Receipes after push", receipes);
                console.log("=============================");
                writeFile(JSON.stringify(receipes, null, 2), (writeStatus: any) => {
                    const msg = writeStatus.status === 0 ?
                        'Successfully added the Recipe.' :
                        'Failed to add the Recipe';
                    res.status(200).send({
                        status: writeStatus.status,
                        message: msg,
                        data: recipe
                    });
                });
            } else if (!isNaN(filteredRecipe.id)) {
                res.status(200).send({
                    status: 3,
                    message: null,
                    errors: "Record already exist!"
                });
            }
        } else {
            res.status(400).send(response);
        }
    });
});

/**
* Delete a Recipe
**/
router.delete("/recipe/:id", (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    readFile(true, function (response: any) {
        if (response.status === 0) {
            let receipes: Array<Recipe> = formatFileData(response.data);
            var recipe = receipes.find(it => it.id === id);
            if (!isNaN(recipe.id)) {
                receipes = receipes.filter(it => it.id === id);
                writeFile(JSON.stringify(receipes, null, 2), (writeStatus: number) => {
                    const msg = writeStatus === 0 ?
                        'Successfully deleted the Recipe.' :
                        'Failed to delete the Recipe';
                    res.status(200).send({
                        status: writeStatus,
                        message: msg
                    });
                });
            } else {
                res.status(400).send({
                    status: 1,
                    data: null,
                    errors: "Unable to find the Recipe or It might not exist!"
                });
            }
        } else {
            res.status(400).send(response);
        }
    });
});

export default router;