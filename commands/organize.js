let fs = require("fs");
let path = require("path");

function organizeFn(dirpath){
    //1. input -> directory path given
    let destPath;
    if(dirpath == undefined){
        let dirpath = process.cwd();
        let destPath = path.join(dirpath , "organized_files");
        if(!fs.existsSync(destPath)){
            fs.mkdirSync(destPath);
        }
    }
    else{
        //check if the given directory exists
        if(fs.existsSync(dirpath)){

            destPath = path.join(dirpath , "organized_files");
            if(!fs.existsSync(destPath)){
                fs.mkdirSync(destPath);
            }
        }
        else{
            console.log("please enter a valid path");
            return;
        }


    }
    organizeHelper(dirpath , destPath);

}

function organizeHelper(src , dest){
    //3. idetify categories of all files present in src directory
    let childNames = fs.readdirSync(src);
    for(let i=0 ; i<childNames.length ;i++){
        let childAddress = path.join(src , childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category = getCatogary(childNames[i]);
           // console.log( childNames[i] ,   "belongs to -->"  ,category);
            //4.copy files to the organized directory in the catogery folder
            sendFiles(childAddress , dest , category);
        }

    }

}

function getCatogary(name){
    let ext = path.extname(name).slice(1);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i=0 ; i< cTypeArray.length ; i++){
            if(cTypeArray[i] == ext){
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath , dest , category){
    let categoryPath = path.join(dest , category);
    if(!fs.existsSync(categoryPath)){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath , fileName);
    fs.copyFileSync(srcFilePath ,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName , "copied to -------->" , category);
}

module.exports = {
    organizeKey : organizeFn
}