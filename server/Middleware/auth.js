import jwt, {decode} from "jsonwebtoken";

// why its needed?
// user wants to like post => click on like => check if valid token here then next()=> call the like

const auth = async (req,res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length<500;

        let decodedData;

        if( token && isCustomAuth) {
            decodedData = jwt.verify(token,'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;