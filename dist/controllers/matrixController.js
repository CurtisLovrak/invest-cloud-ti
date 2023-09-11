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
exports.postData = exports.multiplyMatricies = exports.fetchData = exports.matrixB = exports.matrixA = exports.matrixSize = void 0;
const axios_1 = __importDefault(require("axios"));
exports.matrixSize = 1000; // here you can reassign the matrix size globally for testing
exports.matrixA = []; // these are rows left to right, up to down, which is how I see them visually
exports.matrixB = [];
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.get(`https://recruitment-test.investcloud.com/api/numbers/init/${exports.matrixSize}`);
        for (let idx = 0; idx < exports.matrixSize; idx++) {
            const responseA = yield axios_1.default.get(`https://recruitment-test.investcloud.com/api/numbers/A/row/${idx}`);
            const responseB = yield axios_1.default.get(`https://recruitment-test.investcloud.com/api/numbers/B/row/${idx}`);
            exports.matrixA.push(responseA.data.Value); //"Value" is the key on the JSON response object
            exports.matrixB.push(responseB.data.Value);
        }
    });
}
exports.fetchData = fetchData;
function multiplyMatricies(matrixA, matrixB) {
    const l = exports.matrixSize;
    let i, j, k, result = '';
    for (i = 0; i < l; i++) {
        let acc = [];
        for (j = 0; j < l; j++) {
            let count = 0;
            for (k = 0; k < l; k++) {
                count += matrixA[j][k] * matrixB[k][i];
                // the acc array becomes columns, up to down left to right, as per instructions
            }
            // result += count.toString() + ' '; // The prompt says to omit "separators", 
            // I interpret that as only spaces in between the individual pieces of data from the matricies. 
            // To change this, you would only have to remove the space character here, and return the result, not a slice of the result.
            result += count.toString();
        }
    }
    // return result.slice(0, -1); // this removes the last character in the result string, 
    // I find this best because 1: you're no reordering the indexes of the characters in the string, 
    // and 2: I'm not checking for a condition when I'm at the end of the loop every time.
    return result;
}
exports.multiplyMatricies = multiplyMatricies;
function postData(hashedResult) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // "MD5 hash of values. Joined by colulmn then by row into a single string without separators and then hashed."
            const response = yield axios_1.default.post('https://recruitment-test.investcloud.com/api/numbers/validate', hashedResult);
            console.log(response.data); // so I can see what the response is while building the app.
        }
        catch (error) {
            console.log('Error while making the POST request:', error);
            // Handle the error as needed (e.g., retrying or displaying an error message)
        }
    });
}
exports.postData = postData;
/*

Here is a visualization I made to make sure I had the loop right. By all tests I have done, it is returning a string with columns up and down
and then left to right like how the prompt says.

[		 j					i			 j	k		 k  i
    [a[0][0]*b[0][0] + a[0][1]*b[1][0] + a[0][2]*b[2][0], a[1][0]*b[0][0] + a[1][1]*b[1][0] + a[1][2]*b[2][0], a[2][0]*b[0][0] + a[2][1]*b[1][0] + a[2][2]*b[2][0]],
    [a[0][0]*b[0][1] + a[0][1]*b[1][1] + a[0][2]*b[2][1], a[1][0]*b[0][1] + a[1][1]*b[1][1] + a[1][2]*b[2][1], a[2][0]*b[0][1] + a[2][1]*b[1][1] + a[2][2]*b[2][1]],
    [a[0][0]*b[0][2] + a[0][1]*b[1][2] + a[0][2]*b[2][2], a[1][0]*b[0][2] + a[1][1]*b[1][2] + a[1][2]*b[2][2], a[2][0]*b[0][2] + a[2][1]*b[1][2] + a[2][2]*b[2][2]],
]
*/ 
