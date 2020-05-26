exports.setCors = (req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header( //optional
        "Access-Control-Allow-Headers",
        "Origin, x-Request-Width, Content-Type, Accept, x-auth"
    )
    res.header(
        "Access-Control-Expose-Headers", "*" //expose all headers to give all clients access also to our custom headers
    )

    res.header( //optional
        "Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS"
    );
    next();
};