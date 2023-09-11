// makes calls to API and calls the multiplyMatrix() function.

import axios from 'axios';

export const matrixSize: number = 1000; // here you can reassign the matrix size globally for testing

export const matrixA: any[] = [];

export const matrixB: any[] = [];

export async function fetchData(): Promise<void> {

    await axios.get(`https://recruitment-test.investcloud.com/api/numbers/init/${matrixSize}`);

    // const A: any[] = []; moved these to global variables
    // const B: any[] = [];

    for (let idx = 0; idx < matrixSize; idx++) {
        const responseA = await axios.get(`https://recruitment-test.investcloud.com/api/numbers/A/row/${idx}`);
        const responseB = await axios.get(`https://recruitment-test.investcloud.com/api/numbers/B/row/${idx}`);

        matrixA.push(responseA.data.Value); //"Value" is the key on the JSON response object
        matrixB.push(responseB.data.Value);
    }
    // return { A, B }; removed return
}

export function multiplyMatricies(matrixA: any[], matrixB: any[]): any {

  const l: number = matrixSize, result: number[][] = [];

	let i: number, j: number, k: number;
    
  for (i = 0; i < l; i++) {
    let acc: number[] = [];
    for (j = 0; j < l; j++) {
      let count: number = 0;
      for (k = 0; k < l; k++) {
        count += matrixA[i][k] * matrixB[k][j];
      }
      acc.push(count);
    }
    result.push(acc);
  }
  return result;
}
