const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.validateAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg : "validation failed"});
    }
}

module.exports = validate;