import axios from 'axios';

export const matrixSize: number = 1000; // here you can reassign the matrix size globally for testing

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

export function multiplyMatricies(matrixA: number[][], matrixB: number[][]): string {

  const l: number = matrixSize;

	let i: number, j: number, k: number, result: string = '';
    
  for (i = 0; i < l; i++) {
    for (j = 0; j < l; j++) {
      let count: number = 0;
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
export async function postData(hashedResult: string): Promise<void> {
  try {
		// "MD5 hash of values. Joined by colulmn then by row into a single string without separators and then hashed."
    const response = await axios.post('https://recruitment-test.investcloud.com/api/numbers/validate', hashedResult);
    console.log(response.data); // so I can see what the response is while building the app.
  } catch (error) {
    console.log('Error while making the POST request:', error);
    // Handle the error as needed (e.g., retrying or displaying an error message)
  }
}

/*

Here is a visualization I made to make sure I had the loop right. By all tests I have done, it is returning a string with columns up and down
and then left to right like how the prompt says.

[		 j					i			 j	k		 k  i
	[a[0][0]*b[0][0] + a[0][1]*b[1][0] + a[0][2]*b[2][0], a[1][0]*b[0][0] + a[1][1]*b[1][0] + a[1][2]*b[2][0], a[2][0]*b[0][0] + a[2][1]*b[1][0] + a[2][2]*b[2][0]],
	[a[0][0]*b[0][1] + a[0][1]*b[1][1] + a[0][2]*b[2][1], a[1][0]*b[0][1] + a[1][1]*b[1][1] + a[1][2]*b[2][1], a[2][0]*b[0][1] + a[2][1]*b[1][1] + a[2][2]*b[2][1]],
	[a[0][0]*b[0][2] + a[0][1]*b[1][2] + a[0][2]*b[2][2], a[1][0]*b[0][2] + a[1][1]*b[1][2] + a[1][2]*b[2][2], a[2][0]*b[0][2] + a[2][1]*b[1][2] + a[2][2]*b[2][2]],
]
*/