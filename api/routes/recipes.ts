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


const DB_PATH = './database/cookbook.json';

const parseRecipe = (it: any): Recipe | null => {
    if( it != null){
        let recipe = new Recipe();
        recipe.id = it.id;
        recipe.name = it.name;
        recipe.ingredients = it.ingredients;
        recipe.measurements = it.measurements;
        recipe.cook_method = it.cook_method;
        return recipe;
    } else { return null; }
}

const formatFileData = (data: any): Array<Recipe> => {
    var recipeJournal: Array<Recipe> = [];
    data.forEach((it: any) => {
        let recipe = parseRecipe(it);
        if(recipe != null){ recipeJournal.push(recipe); }
    });

    return recipeJournal;
}

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
* Get All Recipes
**/
router.get("/recipes/:id", (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    readFile(true, function (response: any) {
        if (response.status === 0) {
            let receipes: Array<Recipe> = formatFileData(response.data);
            var recipe = receipes.find(it => it.id === id);
            if (!isNaN(recipe.id)) {
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

router.post("/recipe/", (req: Request, res: Response) => {
    const recipe = parseRecipe(req.body);
    console.log("req.body", req.body);
    console.log("recipe", recipe);
    readFile(true, function (response: any) {
        if (response.status === 0) {
            let receipes: Array<Recipe> = formatFileData(response.data);
            let filteredRecipe = receipes.find(it => it.id === recipe.id);
            if (filteredRecipe === undefined) {
                receipes.push(recipe);
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