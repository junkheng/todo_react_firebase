import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import firebase from "firebase"

class Todo extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;
    this.state = {
      todos: [],
      item: '',
      key: '',
      todo: {},
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { item } = doc.data();
      todos.push({
        key: doc.id,
        doc, 
        item,
      });
    });
    this.setState({
      todos
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // const ref = firebase.firestore().collection('todos').doc(this.props.match.params.id);
    // ref.get().then((doc) => {
    //   if (doc.exists) {
    //     this.setState({
    //       todo: doc.data(),
    //       key: doc.id,
    //       isLoading: false
    //     });
    //   } else {
    //     console.log("No such document!");
    //   }
    // });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { item } = this.state;

    this.ref.add({
      item,
    }).then((docRef) => {
      this.setState({
        item: '',
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  delete(id){
    firebase.firestore().collection('todos').doc(id).delete().then(() => {
      console.log(this.state.todos);
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    const { item } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-body">
            <h4>Add a To Do Item</h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="item">Item:</label>
                <input type="text" className="form-control" name="item" value={item} onChange={this.onChange} placeholder="Item" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
        <div className="panel-body">
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>To Do List</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map(todo =>
                <tr>
                  <td>{todo.item}<Button onClick={this.delete.bind(this, this.state.key)}>Delete</Button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Todo