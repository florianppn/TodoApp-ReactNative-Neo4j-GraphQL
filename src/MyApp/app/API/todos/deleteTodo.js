import API_URL from "../apiUrl.js"

const DELETE_TODO = `
mutation DeleteTodos($where: TodoWhere) {
  deleteTodos(where: $where) {
    nodesDeleted
  }
}
`

export default function deleteTodo(id, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
        query: DELETE_TODO,
        variables: {
            "where": {
              "id": {
                "eq": id
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
    return jsonResponse.data.deleteTodos.nodesDeleted
    })
    .catch(error => {
        console.log('error API', error.message)
    throw error
    })
}
  