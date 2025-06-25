import API_URL from "../apiUrl.js"

const UPDATE_TODOLIST = `
mutation Mutation($where: TodoListWhere, $update: TodoListUpdateInput) {
  updateTodoLists(where: $where, update: $update) {
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

export default function updateTodoList(todoListId, newTitle, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        query: UPDATE_TODOLIST,
        variables: {
          "update": {
            "title": {
              "set": newTitle
            }
          },
          "where": {
            "id": {
              "eq": todoListId
            }
          }
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
      return jsonResponse.data.updateTodoLists.todoLists[0]
    })
    .catch(error => {
        console.log('error API', error.message)
        throw error
    })
}