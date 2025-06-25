import API_URL from "../apiUrl.js"

const DELETE_TODOLIST = `
mutation DeleteTodoLists($where: TodoListWhere, $delete: TodoListDeleteInput) {
  deleteTodoLists(where: $where, delete: $delete) {
    nodesDeleted
  }
}
`

const DELETE_TODOS = `
mutation DeleteTodos($delete: TodoDeleteInput) {
  deleteTodos(delete: $delete) {
    nodesDeleted
  }
}
`

export default async function deleteTodoList(id, token) {
  try {
      const deleteTodosResponse = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              query: DELETE_TODOS,
              variables: {
                "delete": {
                  "belongsTo": [
                    {
                      "where": {
                        "node": {
                          "id": {
                            "eq": id
                          }
                        }
                      }
                    }
                  ]
                }
              }
          })
      });
      
      const deleteTodoListResponse = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              query: DELETE_TODOLIST,
              variables: {
                  "where": {
                      "id": {
                          "eq": id
                      }
                  }
              }
          })
      });
      const jsonDeleteTodoListResponse = await deleteTodoListResponse.json();
      return jsonDeleteTodoListResponse.data.deleteTodoLists.nodesDeleted;
  } catch (error) {
    console.log('error API', error.message)
    throw error;
  }
}