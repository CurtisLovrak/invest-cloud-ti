"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ts_md5_1 = require("ts-md5");
const matrixController_1 = require("../controllers/matrixController");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, matrixController_1.fetchData)(); // Call fetchData to populate matrixA and matrixB
        const result = (0, matrixController_1.multiplyMatricies)(matrixController_1.matrixA, matrixController_1.matrixB); // Perform matrix multiplication
        const md5Hash = ts_md5_1.Md5.hashStr(result); // Hash the result string.
        // res.json(md5Hash); // sending this as a response for now, making a POST route now
        yield (0, matrixController_1.postData)(md5Hash);
        // response object should have {Value: string, Cause: string, and Success: bool}
        res.json({ matrixA: matrixController_1.matrixA, matrixB: matrixController_1.matrixB, result, md5Hash });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
