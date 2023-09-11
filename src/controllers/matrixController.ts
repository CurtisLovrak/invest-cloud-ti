import axios from 'axios';

export const matrixSize: number = 3; // here you can reassign the matrix size globally for testing

export const matrixA: any[] = []; // these are rows left to right, up to down, which is how I see them visually

export const matrixB: any[] = [];

export async function fetchData(): Promise<void> {

    await axios.get(`https://recruitment-test.investcloud.com/api/numbers/init/${matrixSize}`);

    for (let idx = 0; idx < matrixSize; idx++) {
        const responseA = await axios.get(`https://recruitment-test.investcloud.com/api/numbers/A/row/${idx}`);
        const responseB = await axios.get(`https://recruitment-test.investcloud.com/api/numbers/B/row/${idx}`);

        matrixA.push(responseA.data.Value); //"Value" is the key on the JSON response object
        matrixB.push(responseB.data.Value);
    }
}

export function multiplyMatricies(matrixA: any[], matrixB: any[]): any {

  const l: number = matrixSize;

	let i: number, j: number, k: number, result: string = ''
    
  for (i = 0; i < l; i++) {
    let acc: number[] = [];
    for (j = 0; j < l; j++) {
      let count: number = 0;
      for (k = 0; k < l; k++) {
        count += matrixA[j][k] * matrixB[k][i];
				// the acc array becomes columns, up to down left to right, as per instructions
      }
      result += count.toString() + ' '; // The prompt says to omit "separators", I interpret that as only spaces in between the individual pieces of data from the matricies. To change this, you would only have to remove the space character here, and return the result, not a slice of the result.
    }
  }
	return result.slice(0, -1); // this removes the last character in the result string, I find this best because 1: you're no reordering the indexes of the characters in the string, and 2: I'm not checking for a condition when I'm at the end of the loop every time.
}

/*
[		 j					i			 j	k		 k  i
	[a[0][0]*b[0][0] + a[0][1]*b[1][0] + a[0][2]*b[2][0], a[1][0]*b[0][0] + a[1][1]*b[1][0] + a[1][2]*b[2][0], a[2][0]*b[0][0] + a[2][1]*b[1][0] + a[2][2]*b[2][0]],
	[a[0][0]*b[0][1] + a[0][1]*b[1][1] + a[0][2]*b[2][1], a[1][0]*b[0][1] + a[1][1]*b[1][1] + a[1][2]*b[2][1], a[2][0]*b[0][1] + a[2][1]*b[1][1] + a[2][2]*b[2][1]],
	[a[0][0]*b[0][2] + a[0][1]*b[1][2] + a[0][2]*b[2][2], a[1][0]*b[0][2] + a[1][1]*b[1][2] + a[1][2]*b[2][2], a[2][0]*b[0][2] + a[2][1]*b[1][2] + a[2][2]*b[2][2]],
]
*/