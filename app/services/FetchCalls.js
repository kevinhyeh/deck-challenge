export const _login = (username, password) => {
  return fetch('http://192.168.1.72:3001/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json())
}

export const _signup = (user, email, username, password) => {
  return fetch('http://192.168.1.72:3001/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        email: email,
        username: username,
        password: password
      })
    }).then(res => res.json())
}

export const _loadWorkouts = () => {
  return fetch('http://192.168.1.72:3001/workouts', {
      method: 'POST'
    }).then(res => res.json())
}

export const _addWorkout = (addWorkout) => {
  return fetch('http://192.168.1.72:3001/addWorkout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        addWorkout: addWorkout
      })
    }).then(res => res.json())
}

export const _addHistory = (timer, difficulty, chosenWorkouts, deckCompleted, favorite, user_id) => {
  return fetch('http://192.168.1.72:3001/addHistory', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timer: timer, 
        difficulty: difficulty,
        chosenWorkouts: chosenWorkouts,
        deckCompleted: deckCompleted,
        favorite: favorite,
        user_id: user_id
      })
    }).then(res => res.json())
}

export const _selectHistory = (user_id) => {
  return fetch('http://192.168.1.72:3001/selectHistory', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id
      })
    }).then(res => res.json())
}

export const _stats = (user_id) => {
  return fetch('http://192.168.1.72:3001/stats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id
      })
    }).then(res => res.json())
}

export const _selectFavorites = (user_id) => {
  return fetch('http://192.168.1.72:3001/selectFavorites', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id
      })
    }).then(res => res.json())
}

export const _updateFavorites = (id, fav) => {
  return fetch('http://192.168.1.72:3001/updateFavorite', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        favorite: fav
      })
    }).then(res => res.json())
}

export const _toggleFavorites = (id, fav) => {
  return fetch('http://192.168.1.72:3001/updateFavorite', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        favorite: fav
      })
    }).then(res => res.json())
}

export const _bestDeck = (user_id) => {
  return fetch('http://192.168.1.72:3001/bestDeck', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id
      })
    }).then(res => res.json())
}