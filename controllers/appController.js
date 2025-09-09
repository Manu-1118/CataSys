const noEncontrado = (req, res) => {
    res.render("404", {
        pagina: "No encontrada",
        // csrfToken: req.csrfToken()
    });
};

export { noEncontrado };
