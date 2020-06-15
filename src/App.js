import React, {Component} from 'react';
import axios from 'axios';
import { Input, FormGroup,Label,Table ,Button, Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap'
class App extends Component {
  state = {
    todos: [],
    newTodoData:{
      name:'',
      completed: '',
      order: '',
    },

    newTodoModal: false,
  }


  componentWillMount(){
      this._refreshTodos();

  }

  toggleNewTodoModal(){
    this.setState({
      newTodoModal : !this.state.newTodoModal
    });
  }


  addTodo(){
    axios.post('https://todo-backend-express-csp.herokuapp.com/', this.state.newTodoData).then((response) =>{
      let { todos} = this.state;

      todos.push(response.data);

      this.setState({todos, newTodoModal:false, newTodoData:{
        id:'',
        title:'',
        completed: " ",
        order: ''
      }});
    });
  }


  deleteTodo(url){
    axios.delete(url,{

    }).then((response) =>{
      this._refreshTodos()
    })
  }

  _refreshTodos(){
    axios.get('https://todo-backend-express-csp.herokuapp.com/').then((response) => {
      this.setState({
        todos: response.data
      })
    });

  }

  completeTodo(todo){

        let temp = this.state.todos;

        temp.map(Ntodo => {

            if (Ntodo.url === todo.url) 
            {
                Ntodo.completed = !Ntodo.completed;    
            }
  
        })
        
        this.setState({todos:temp})

  }

  render(){

    let todos = this.state.todos.map((todo) =>{
      return (
        <tr style={{textDecoration: todo.completed ? "line-through" : null,color:"white"} } key={todo.url}>
          <td  >{todo.title}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.completeTodo.bind(this,todo)}>Complete</Button>
            <Button color="danger" size="sm" onClick={this.deleteTodo.bind(this,todo.url)}>Delete</Button>
        </td>
      </tr>
      
      )
    }
    )
    
  return (
    
    <div className="App container">

      <h1 style={{textAlign: 'center', color:'#fbbd08'}}>Getir Todo App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewTodoModal.bind(this)}>Add Todo</Button>
      <Modal isOpen={this.state.newTodoModal} toggle={this.toggleNewTodoModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewTodoModal.bind(this)}>Add Todo</ModalHeader>
        <ModalBody>
            <FormGroup>
              <Label for="title">Todo</Label>
              <Input id="title" value={this.state.newTodoData.title} onChange={(e) =>{
                let { newTodoData } = this.state;
                newTodoData.title = e.target.value;

                this.setState({newTodoData});
              
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="title">Order</Label>
              <Input id="title" value={this.state.newTodoData.order} onChange={(e) =>{
                let { newTodoData } = this.state;
                newTodoData.order = e.target.value;

                this.setState({newTodoData});
              
              }} />
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addTodo.bind(this)}>Add Todo</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewTodoModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th style={{color:'white'}}>Todo</th>
            <th style={{color:'white'}}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos}
        </tbody>
      </Table>
    </div>
  );
}

}
export default App;
