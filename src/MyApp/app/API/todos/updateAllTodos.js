import API_URL from "../apiUrl.js"

const UPDATE_TODOS = `
mutation Mutation($update: TodoUpdateInput, $where: TodoWhere) {
  updateTodos(update: $update, where: $where) {
    todos {
      id
      done
      content
      belongsTo {
        id
        title
      }
    }
  }
}
`

export default function updateAllTodos(todoListId, done, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: UPDATE_TODOS,
            variables: {
                "update": {
                  "done": {
                    "set": done
                  }
                },
                "where": {
                  "belongsTo": {
                    "all": {
                      "id": {
                        "eq": todoListId
                      }
                    }
                  },
                  "done": {
                    "eq": !done
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
    return jsonResponse.data.updateTodos.todos;
    })
    .catch(error => {
        console.log('error API', error.message)
        throw error
    })
}
