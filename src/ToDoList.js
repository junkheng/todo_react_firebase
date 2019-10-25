import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createTasks(item) {
    return <ListItem button className = "todoItem" onClick = {() => this.delete(item.key)} key = {item.key} > {item.text}</ListItem>
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
    return(
    <Card className = "fullList">
    {listItems}
    </Card>
    )
  }
}

export default TodoList