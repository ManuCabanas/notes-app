"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = handleRequest;
function handleRequest(handler, errorMessage) {
    return async (req, res) => {
        try {
            await handler(req, res);
        }
        catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.status(500).json({ message: errorMessage });
            }
        }
    };
}
//# sourceMappingURL=requestHandler.js.map