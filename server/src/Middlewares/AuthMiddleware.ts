import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    console.log("authHeader ",authHeader)

    if (authHeader === null || authHeader === undefined) {
        return res.status(401).json({
            status: 401,
            message: "UnAuthorized",
        });
    }

    const token = authHeader.split(" ")[1];
    console.log(token)

    //verify the token
    jwt.verify(token, process.env.JWT_SECRET as string, (error, user) => {
        if (error)
            return res.status(401).json({
                status: 401,
                message: "UnAuthorized",
            });

        req.user = user as AuthUser;
        next();
    });
};

export default authMiddleware;
