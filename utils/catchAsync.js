module.exports = fn => {
    return (req, res, next) => {     // because promise not returning req
        fn(req, res, next).catch(next);
    };
};