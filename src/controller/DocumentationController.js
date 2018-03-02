const AbstractController = require("./base/AbstractController");

class DocumentationController extends AbstractController {
    
    index(req, res, next){
        res.render("documentation", {
            page_title: "OriginalMy - Identidade Blockchain, Documentation",
            pageNS: "documentation"
        });
    }

}
module.exports = DocumentationController;