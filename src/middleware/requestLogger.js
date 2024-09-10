// ANSI color codes
const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";

export default function requestLogger (req, res, next){
    res.on('finish', () => {//logging the after the response is sent
        console.log(`${getMethodColor(req.method)}${req.method}${reset} http://localhost:${req.socket.localPort}${req.url} ${getStatusColor(res.statusCode)}${res.statusCode}${reset}`);
    });
    next();
}
function getStatusColor (status){
    if(status === 200 || status === 201){
        return green;
    }else if(status === 404 || status === 500 || status === 400 || status === 403 || status === 401 || status === 405){
        return red;
    }
}
function getMethodColor (method){
    if(method === "GET"){
        return blue;
    }else if(method === "POST"){
        return green;
    }else if(method === "PUT"){
        return yellow;
    }else if(method === "DELETE"){
        return red;
    }
}