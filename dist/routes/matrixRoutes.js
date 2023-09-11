"use strict";
// define Express routes for API
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
/*
import express from 'express';
import { fetchData, multiplyMatricies, matrixSize, matrixA, matrixB } from '../controllers/matrixController';

const router = express.Router();

router.get(`/matrix/${matrixSize}`, async (req, res) => {
    try {
        const matrixSize = parseInt(req.params.matrixSize, 10);
        const { A, B } = await fetchData(matrixSize);
        const result = multiplyMatricies(A, B);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
*/
// src/routes/matrixRoutes.ts
const express_1 = __importDefault(require("express"));
// import md5 from 'md5';
const ts_md5_1 = require("ts-md5");
const matrixController_1 = require("../controllers/matrixController");
const router = express_1.default.Router();
router.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
    console.log('test works');
});
router.get('/matrix', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, matrixController_1.fetchData)(); // Call fetchData to populate matrixA and matrixB
        const result = (0, matrixController_1.multiplyMatricies)(matrixController_1.matrixA, matrixController_1.matrixB); // Perform matrix multiplication
        const md5Hash = ts_md5_1.Md5.hashStr(result);
        res.json(md5Hash);
        // res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
