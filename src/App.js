import React from 'react'
import { Button,  Icon, Table,Modal,Form,Input,Loader,Dimmer,Container } from 'semantic-ui-react'
import ChildTable from './childTable';
import SubjectForm from './subjectForm';

class  TableExampleApprove extends React.Component{
  
  state = { selectedUser:{id: null},currentUser:'',selectedRow:'',name: '', email: '',date:'',updatedId:'', updatedName: '', updatedEmail: '',updatedDate: '' ,modalOpen:false,openSubjectForm:false,users:[],count:0,updateModalOpen:false,userToBeUpdated:'',id:'',message:''}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  showChildTable = (user) =>{
    this.setState({currentUser:''})
     this.setState({currentUser:user});

  }
  onSelectingUser=(user) =>{
       this.setState({selectedRow:user});
  }
  

  handleSubmit = () => {
   // const { name, email,date } = this.state
   
   
    let user={
      name:this.state.name,
      date:this.state.date,
      email:this.state.email,
      id:this.state.id
     
    }
    
    var request = new Request('http://localhost:3001/api/new-user',{
      method:'POST',
      headers:new Headers({'content-type':'application/json'}),
      body:JSON.stringify(user)
      });
      let that =this;
      let users=that.state.users;
      
      fetch(request).then(function(response)
      {
        
         response.json(user).then(function(data)
         {
            console.log("NEW USER DATA -> ",data);
            users.push(user);
            that.setState({users:users});
            
         })
      });
      that.setState({modalOpen:false,name:'',email:'',date:'',id:''});
      
      
  }

  handleUpdateSubmit = (id) => {
    
    
    
     let user={
       name:this.state.updatedName,
       date:this.state.updatedDate,
       email:this.state.updatedEmail,
       id:this.state.updatedId
      
     }
     
     var request = new Request('http://localhost:3001/api/update'+id,{
       method:'PUT',
       headers:new Headers({'content-type':'application/json'}),
       body:JSON.stringify(user)
       });
       let that =this;
       let users=that.state.users;
       
       fetch(request).then(function(response)
       {
         
          response.json(user).then(function(data)
          {
             console.log(data);
             for( var i = 0; i < users.length; i++){ 
              if ( users[i].id === id) {
                users.splice(i, 1); 
              }
           }
           users.push(user);
           that.setState({users:users})
             
             
          })
       });
       that.setState({updateModalOpen:false});
       
       
   }

  handleClose = () =>{this.setState({modalOpen:false})};
  handleOpen = () =>{this.setState({modalOpen:true})};

  handleSubjectClose = () =>{this.setState({openSubjectForm:false})};
  handleSubjectOpen = () =>{this.setState({openSubjectForm:true})};

  handleUpdateClose = () =>{this.setState({updateModalOpen:false})};
  handleUpdateOpen = (u) =>{
    console.log("HANDLE UPDATE -> ",u.id )
    this.setState({updateModalOpen:true,selectedUser:u,updatedDate:u.date,updatedEmail:u.email,updatedId:u.id,updatedName:u.name})
    
    fetch('http://localhost:3001/api/user'+ u.id)
    .then(function(response){
     
      response.json().then(function(user){
       
        console.log("RECIVED USER - >", user);
  
         // that.setState({updatedDate:user[0].date,updatedEmail:user[0].email,updatedName:user[0].name,userToBeUpdated:user,updatedId:user[0].id})
       
      })
    })
  
  };

  deleteUser = (id) => {
    var request = new Request('http://localhost:3001/api/remove'+id,{
      method:'DELETE'
      });
    let that=this;
    let users = that.state.users;
    let user = users.find(user => user.id ===id);
      fetch(request).then(function(response)
      {
        
         response.json().then(function(data)
         {
          console.log(data);
          for( var i = 0; i < users.length; i++){ 
            if ( users[i] === user) {
              users.splice(i, 1); 
            }
         }
         that.setState({users:users})
         
         })
      });
  }

  componentDidMount()
  {
    let that =this;
    console.log("I am in componentDidMount")
    fetch('http://localhost:3001/api/users')
    .then(function(response){
     
      response.json().then(function(data){
        that.setState({users:data});
       
      })

  })
  }
  

  renderUsers()
  {
    let users = this.state.users;
    
    
      
    if(users.length===0)
       return ( <Dimmer active inverted>
        <Loader size="large" inverted>Loading</Loader>
      </Dimmer>);
    else {
      return <React.Fragment> 
        <Modal size="tiny"
         
            
            open={this.state.updateModalOpen}
            onClose={this.handleUpdateClose}
          >
        <Modal.Header>Update user</Modal.Header>
  
          <Form  style={{marginTop:"20px",marginLeft:"20px",marginBottom:"20px"}}   onSubmit={() => this.handleUpdateSubmit(this.state.selectedUser.id)} >
                <Form.Field>
                   <label> Name</label>
                   <Input  placeholder='Name' name='updatedName' style={{width:"60%"}} value={this.state.updatedName} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Registration Date</label>
                    <Input  placeholder='Reg. Date' name='updatedDate' style={{width:"60%"}} value={this.state.updatedDate} onChange={this.handleChange} />
                </Form.Field>

                <Form.Field>
                    <label>Id number</label>
                    <Input  placeholder='Id number' name='updatedId' style={{width:"60%"}} value={this.state.updatedId} onChange={this.handleChange} />
                </Form.Field>

                <Form.Field>
                      <label>Email Address</label>
                      <Input  placeholder='abc@gmail.com' name='updatedEmail' style={{width:"60%"}} value={this.state.updatedEmail} onChange={this.handleChange} />
                </Form.Field>
    
                <Button type='submit' >Submit</Button>
          </Form>

        </Modal>
      
      {users.map((user)=>{
        
          
        return(
          <React.Fragment>
            <Table  celled selectable fixed style={{marginTop:"0px",marginBottom:"0px"}}>
          <Table.Row onClick={() =>this.onSelectingUser(user)} active={this.state.selectedRow===user}>
          <Table.Cell width={1}>
            <Button onClick={()=> this.showChildTable(user)}  icon><Icon  link name="list"/></Button>
          </Table.Cell>
          <Table.Cell width={1}>{user.name}</Table.Cell>
          <Table.Cell width={1}>{user.date}</Table.Cell>
          <Table.Cell width={2}>{user.email}</Table.Cell>
          <Table.Cell width={1}>{user.id}</Table.Cell>
          <Table.Cell width={1}>
          <Button onClick={()=> this.handleUpdateOpen(user)}  icon><Icon link name='edit' size="large" /></Button>
         
        </Table.Cell>
        <Table.Cell width={1}>
          <Button onClick={this.deleteUser.bind(null,user.id)}  icon><Icon link name='delete' size="large" /></Button>
                 
        </Table.Cell>
        
        </Table.Row>
        </Table>
        {this.state.currentUser===user?<Container style={{width:"100%"}}><ChildTable user={user}/></Container>:null}
        </React.Fragment>
        
        )
      })
    }
    </React.Fragment>  
    }
    
    }
    
    
  

  
  render()
  {
    const { name, email, date,id } = this.state
    
    return(
      <React.Fragment>
      <Table fixed  celled  attached="top" >
      <Table.Header>
      
        <Table.Row>
        <Table.HeaderCell width={1}></Table.HeaderCell>
          <Table.HeaderCell width={1}>Name</Table.HeaderCell>
          <Table.HeaderCell width={1}>Registration Date</Table.HeaderCell>
          <Table.HeaderCell width={2}>E-mail address</Table.HeaderCell>
          <Table.HeaderCell width={1}>Id number</Table.HeaderCell>
          <Table.HeaderCell width={1}></Table.HeaderCell>
          <Table.HeaderCell width={1}></Table.HeaderCell>
          
        </Table.Row>
        <Table.Row>
        <Table.HeaderCell width={1}></Table.HeaderCell>
        <Table.HeaderCell colSpan='6'>
          <SubjectForm formTrigger={<Button  icon labelPosition='left' primary size='small' style={{marginLeft:"60%"}} onClick={this.handleSubjectOpen} >
            <Icon name='add' /> Add Subjects
          </Button>}
          openSubjectForm={this.state.openSubjectForm}
          closeSubjectForm={this.handleSubjectClose}
           user={this.state.selectedRow}/>
        
          <Modal size="tiny"  
            trigger={<Button floated='right' icon labelPosition='left' primary size='small' onClick={this.handleOpen}>
            <Icon name='user' /> Add User
          </Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
        <Modal.Header>Add the new user</Modal.Header>
          <Form  style={{marginTop:"20px",marginLeft:"20px",marginBottom:"20px"}} onSubmit={this.handleSubmit}>
                <Form.Field>
                   <label> Name</label>
                   <Input  placeholder='Name' name='name' style={{width:"60%"}} value={name} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Registration Date</label>
                    <Input  placeholder='Reg. Date' name='date' style={{width:"60%"}} value={date} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>ID</label>
                    <Input  placeholder='ID number' name='id' style={{width:"60%"}} value={id} onChange={this.handleChange}/>
                </Form.Field>

                <Form.Field>
                      <label>Email Address</label>
                      <Input  placeholder='abc@gmail.com' name='email' style={{width:"60%"}} value={email} onChange={this.handleChange}/>
                </Form.Field>
    
                <Button type='submit' >Submit</Button>
          </Form>

        </Modal>
            
            
          </Table.HeaderCell>
          
          
        </Table.Row>
      </Table.Header>
      </Table>
  
      <React.Fragment>
        {this.renderUsers()}
        
      </React.Fragment>
  
      
      
      </React.Fragment>
    
    )
  }
}
  


export default TableExampleApprove