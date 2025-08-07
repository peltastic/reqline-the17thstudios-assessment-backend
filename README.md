
## Assessment Submission (Reqline) Readme

### Decisons

* My parser only accepts valid JSON objects of type {"key": "value"}, if the key of the json passed isn't a string, it will return an error.

### Challenges

* Working with the assessment profold template was one of the challenges I faced as I had to understand its architecture pattern in order to properly place my code correctly in the right project structure.

* Implementing the parser without regex was particularly challenging as regex would have easily handled the command structure but as the assessment required following a manual approach, I had to utilize my programming and problem solving skills with javascript by splitting the pipe and looping through each iterations to perform a validation.

### Project installation

To install the project dependencies, run the following command:

```bash
npm install

```

To run the project on your local environmet, run the command:

```bash
npm run dev
```
