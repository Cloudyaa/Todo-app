class ValidationError extends Error {}
class NotFoundError extends Error {}

const handleError = (err, req, res, next) => {
    if(err instanceof NotFoundError){
        res
            .status(404)
            .render('error', {
            message: 'ID not found!',
        });
        return;
    }

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
        message: err instanceof ValidationError ? err.message : 'Sorry, try again later',
    })
}

module.exports = {
    handleError,
    ValidationError,
    NotFoundError,
}
