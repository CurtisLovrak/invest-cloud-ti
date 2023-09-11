Thank you for the opportunity to show my coding aptitude, I'm looking foward to next steps.

I built this application in TypeScript, as the role is looking for Angular experience.

If you fork this repo, run npm i, tsc, and then node dist/server.js to run up the app, the port is localhost:3000.

I have my routes set up so that when you send the initial get request to the base URL, it will run all of the functionality in matrixController.ts.

I have left some console logs through my code to explain my process, and what I was considering while building this application. I've left some tests in there that would definetely be left in a deployement ready application.

Currently, after my final POST request, my response is "{ Value: "Alas it didn't work", Cause: null, Success: true }" which confuses me, because everything is working how I believe the instructions ask me to. I'm making a concatinated string, columns FIRST, left to right. Then I'm hashing it and posting it, and I get a Success: true on the response. I have tried with spaces and not spaces in the string, since "no separators" was a little vague to me. Without spaces, I would find it a challenge to unhash and turn back into usable data, but that is the instructions, so I will leave it as that.

Multiplying the two matricies is On^3, and there isn't any way I see to get around that. I am choosing to make the entire call to the API first and store the datasets as a global variables. If time complexity was not a concern, but space was, you could painfully make an API call to the database every time to only retrieve 1 indice. I'm looking up the value of the array by the index, so I am not using a map or other kind of object. I am also only every adding to the end of the string, never reordering my data.

The md5 hash algorithm is a fixed length, so I don't need any chunking.

I could add more to my code, like error handling.

I'm sure that if the error is with my code, that it's a formatting issue with the hashed string.