let fs = require("fs");
let path = require("path");
function treeFn(dirpath){
    let destPath;
    if(dirpath == undefined){
        treeHelper(process.cwd() , "");
    }
    else{
        //check if the given directory exists
        if(fs.existsSync(dirpath)){
            treeHelper(dirpath , "");
        }
        else{
            console.log("please enter a valid path");
            return;
        }
    }
}

function treeHelper(dirpath , indent){
    let isFile = fs.lstatSync(dirpath).isFile();;
    if(isFile){
        let fileName = path.basename(dirpath);
        console.log(indent + "├──"+fileName);
    }
    else{
        let = dirName = path.basename(dirpath);
        console.log(indent + "└──"+ dirName);
        let childrens = fs.readdirSync(dirpath);
        for(let i=0 ; i< childrens.length ; i++){
            let childPath = path.join(dirpath , childrens[i]);
            treeHelper(childPath , indent + "\t");
        }
    }


}

module.exports = {
    treeKey : treeFn
}