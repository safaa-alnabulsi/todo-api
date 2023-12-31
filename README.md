# Todo API

A simple example of a RESTful API that handles TODO list of items. It's built using TypeScript, expressjs and mongoosejs.

## Prerequisites

- [Yarn](https://yarnpkg.com/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) account so you can create a mongodb cluster `clustertodo` and a user.
- [PostMan](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/) or simply `curl` to invoke the API endpoints.

## Installation

1. Clone the repository: `git clone git@github.com:safaa-alnabulsi/todo-api.git`
2. Install the application: `yarn install`
3. Place your own MongoDB User credentials in `nodemon.json`

```json
{
  "env": {
    "MONGO_USER": "<Username>",
    "MONGO_PASSWORD": "<password>",
    "MONGO_DB": "clustertodo"
  }
}
```

4. Build the project and start the server: `yarn build && yarn start`
5. Open Insmonia and make a `GET` request to `http://localhost:4000/todos/`. It will like the image below after you add your endpoints and couple of todos:

![Insomina app](insomina.png)

## Endpoints

| Method   | End-Point    | Description                         |
| -------- | ------------ | ----------------------------------- |
| `GET`    | `/todos`     | List all _todos_                    |
| `POST`   | `/todos`     | Create a new _todo_                 |
| `GET`    | `/todos/:id` | Fetch a specific _todo_             |
| `PUT`    | `/todos/:id` | Edit existing _todo_                |
| `PATCH`  | `/todos/:id` | Mark an existing _todo_ as complete |
| `DELETE` | `/todos/:id` | Delete existing _todo_              |

## TODO next

To add the following: 

- Authentication
- Etags
- JSON Schema

## References

- mongoose: https://mongoosejs.com/
- express: https://expressjs.com
- supertest: https://yarnpkg.com/package/supertest
- sinon-mongoose: https://www.npmjs.com/package/sinon-mongoose 
- mocking mongoose: https://getsimple.works/how-to-stub-mongoose-methods-and-mock-document-objects
- Dependabot: https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates
- Automating Dependabot with Github Action: https://docs.github.com/en/code-security/dependabot/working-with-dependabot/automating-dependabot-with-github-actions
- semnatic-release:
  - https://www.npmjs.com/package/semantic-release
  - https://yarnpkg.com/package/semantic-release
  - plugins: https://github.com/semantic-release/semantic-release/blob/HEAD/docs/usage/plugins.md
- https://github.com/semantic-release/commit-analyzer
- eslint: https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/

- commit for pure test: test major release - test with BREAKING CHANGE
Note: Your commits must be formatted exactly as specified by the chosen convention. For example the Angular Commit Message Conventions require the BREAKING CHANGE keyword to be followed by a colon (:) and to be in the footer of the commit message.
let's try again!!!
