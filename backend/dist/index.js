"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check endpoint
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Nōta API is running' });
});
app.use('/', noteRoutes_1.default);
app.use('/', categoryRoutes_1.default);
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});
// Export for Vercel serverless
exports.default = app;
//# sourceMappingURL=index.js.map