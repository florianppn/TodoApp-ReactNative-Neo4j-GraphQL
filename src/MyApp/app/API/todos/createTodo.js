import API_URL from "../apiUrl.js"

const CREATE_TODO = `
mutation Mutation($input: [TodoCreateInput!]!) {
  createTodos(input: $input) {
    todos {
      id
      content
      done
      belongsTo {
        id
        title
      }
    }
  }
}
`
export default function createTodo(content, todoListId, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
        query: CREATE_TODO,
        variables: {
            "input": [
              {
                "content": content,
                "belongsTo": {
                  "connect": [
                    {
                      "where": {
                        "node": {
                          "id": {
                            "eq": todoListId
                          }
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        })
    })
    .then(response => {
    return response.json()
    })
    .then(jsonResponse => {
    if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
    }
    return jsonResponse.data.createTodos.todos[0]
    })
    .catch(error => {
        console.log('error API', error.message)
    throw error
    })
}