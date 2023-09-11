"use strict";
// makes calls to API and calls the multiplyMatrix() function.
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
exports.multiplyMatricies = exports.fetchData = exports.matrixB = exports.matrixA = exports.matrixSize = void 0;
const axios_1 = __importDefault(require("axios"));
exports.matrixSize = 10; // here you can reassign the matrix size globally for testing
exports.matrixA = [];
exports.matrixB = [];
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.get(`https://recruitment-test.investcloud.com/api/numbers/init/${exports.matrixSize}`);
        // const A: any[] = []; moved these to global variables
        // const B: any[] = [];
        for (let idx = 0; idx < exports.matrixSize; idx++) {
            const responseA = yield axios_1.default.get(`https://recruitment-test.investcloud.com/api/numbers/A/row/${idx}`);
            const responseB = yield axios_1.default.get(`https://recruitment-test.investcloud.com/api/numbers/B/row/${idx}`);
            exports.matrixA.push(responseA.data.Value); //"Value" is the key on the JSON response object
            exports.matrixB.push(responseB.data.Value);
        }
        // return { A, B }; removed return
    });
}
exports.fetchData = fetchData;
function multiplyMatricies(matrixA, matrixB) {
    const l = exports.matrixSize, result = [];
    let i, j, k;
    for (i = 0; i < l; i++) {
        let acc = [];
        for (j = 0; j < l; j++) {
            let count = 0;
            for (k = 0; k < l; k++) {
                count += matrixA[i][k] * matrixB[k][j];
            }
            acc.push(count);
        }
        result.push(acc);
    }
    return result;
}
exports.multiplyMatricies = multiplyMatricies;
