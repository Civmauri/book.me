const handleErrorAsync = async (req, res, next, func) => {
    try {
        return await func(req, res, next);
    } catch (error) {
        next(error, req, res);
    }
};

export { handleErrorAsync }