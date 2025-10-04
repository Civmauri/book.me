function echo(req, res) {
    return res.status(200).json({
        message: req.body.message
    });
}


export { echo };