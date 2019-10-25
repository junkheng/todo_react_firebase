import React, { Component } from 'react';
import ToDoList from './ToDoList'
import Button from '@material-ui/core/Button';

const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }
  addTodo(x) {
    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };
      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
      this._inputElement.value = "";
    }
    x.preventDefault();
  }

  deleteTodo(key) {
    var remainingItems = this.state.items.filter(function (item) {
      return (item.key !== key)
    })
    this.setState({
      items: remainingItems
    })
  }

  render() {
    return (
      <div className="todoList">
        <h1>To Do List</h1>
        <div>
          <form className="todoForm" onSubmit={this.addTodo}>
            <input className="inputTodo" ref={(a) => this._inputElement = a}
              placeholder="Before I forget..">
            </input>
            <Button style={style} type="submit" variant="contained" color="primary">Remind Me</Button>
          </form>
          <ToDoList entries={this.state.items}
            delete={this.deleteTodo} />
        </div>
      </div>
    )
  }
}

export default Todo