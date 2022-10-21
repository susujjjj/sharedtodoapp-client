export default class TodoService {
  constructor(http, tokenStorage, socket) {
    this.http = http
    this.tokenStorage = tokenStorage
    this.socket = socket
  }

  async getPosts(username) {
    const query = username ? `?username=${username}` : ''
    return this.http.fetch(`/posts${query}`, {
      method: 'GET',
      headers: this.getHeaders(),
    })
  }

  async postTodo(text) {
    return this.http.fetch(`/posts`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
    })
  }

  async deleteTodo(todoId) {
    return this.http.fetch(`/posts/${todoId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })
  }

  async updateTodo(todoId, text, isCompleted) {
    return this.http.fetch(`/posts/${todoId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, isCompleted }),
    })
  }

  async doneTodo(todoId, text, isCompleted) {
    // console.log(isCompleted, ' isCompleted))))))??') // true
    return this.http.fetch(`/posts/${todoId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, isCompleted }),
    })
  }

  getHeaders() {
    const token = this.tokenStorage.getToken()
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  onSync(callback) {
    return this.socket.onSync('posts', callback)
  }
}
