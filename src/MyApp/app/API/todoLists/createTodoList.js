import API_URL from "../apiUrl.js"

const CREATE_TODOLIST = `
mutation createTodoLists($input: [TodoListCreateInput!]!) {
  createTodoLists(input: $input) {
    todoLists {
      id
      title
      owners {
        username
      }
    }
  }
}
`

export default function createTodoList(username, title, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      query: CREATE_TODOLIST,
      variables: {
        "input": [
          {
            "title": title,
            "owners": {
              "connect": [
                {
                  "where": {
                    "node": {
                      "username": {
                        "eq": username
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
      return jsonResponse.data.createTodoLists.todoLists[0]
    })
    .catch(error => {
      console.log('error API', error.message)
      throw error
    })
}