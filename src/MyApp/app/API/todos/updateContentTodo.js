import API_URL from "../apiUrl.js"

const UPDATE_TODO = `
mutation UpdateTodos($update: TodoUpdateInput, $where: TodoWhere) {
  updateTodos(update: $update, where: $where) {
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

export default function updateContentTodo(todoId, content, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: UPDATE_TODO,
            variables: {
                "update": {
                  "content": {
                    "set": content
                  }
                },
                "where": {
                  "id": {
                    "eq": todoId
                  }
                }
              }
        })
    })
    .then(response => {
        return response.json();
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0];
      }
      return jsonResponse.data.updateTodos.todos[0];
    })
    .catch(error => {
      console.log('error API', error.message);
      throw error;
    })
}