export function authorize(role){
    return (req, res, next) => {
        req.user.user.role == role ? 
        next() : 
        res.status(400).json({
            error: "Unauthorized",
            message: "Your role does not allow you to access this functionality",
        })
    }
}

 