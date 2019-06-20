import React, { Component } from 'react';
import {List,Form,Button,Modal,Input,Card,Grid,Header} from 'semantic-ui-react'
import './Demo.css';

let bays=['bay1','bay2']
let lines=['line1','line2','line3']
export default class AppDragDropDemo extends Component {
     
    state = {
        tasks: [
            {name:" Angular",category:"wip", icon: "file alternate"},
            {name:"React", category:"wip", icon:"file alternate"},
            {name:"Java", category:"wip", icon:"file alternate"},
            {name:"Python", category:"wip", icon:"file alternate"},
            {name:"Lua", category:"wip", icon:"file alternate"},
            {name:"Nodejs", category:"wip", icon:"file alternate"},
            {name:"Front end", category:"complete", icon:"folder",showDetail:false},
            {name:"back end", category:"complete", icon:"folder",showDetail:false}
            
          ],
          showForm:false,
          selectedTech:'',
          folder:'',
          sub:[],
          target:'',
          location:'',
          bay:'',
          line:''
         
         
    }

    

    handleClose = () =>{
      this.setState({showForm:false})
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    formSubmit = () =>{
      let sub=this.state.sub
      sub.push({...this.state.selectedTech,id:this.state.target,bay:this.state.bay,line:this.state.line})
      console.log(sub)
      this.setState({showForm:false,sub:sub})
      
      
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
        
    }
    showDetail =(t) =>{
      let arr=this.state.tasks
      for(let i=0;i<arr.length;i++)
      {
        if(arr[i]===t)
           arr[i].showDetail=!arr[i].showDetail
      }
      this.setState({tasks:arr})
    }

    renderContent = (t,bay,line) =>{
      let arr=this.state.sub;
      for(let i=0;i<arr.length;i++)
      {
        if(arr[i].id===t.name && arr[i].bay===bay && arr[i].line===line)
             return (<List.Content>{arr[i].name}</List.Content>)
      }
      return (<List.Content>{line}</List.Content>)
      
    }

    onDrop = (ev, cat) => {
      console.log('sghjkjh')
      let target=ev.target.innerText
       let id = ev.dataTransfer.getData("id");
       
       let arr=this.state.tasks
       let task=''
       for(var i=0;i<arr.length;i++)
       {
         if(arr[i].name===id)
           {
              task=arr[i];
             arr.splice(i,1);
           }
       }

      

       this.setState({
           tasks:arr,
           showForm:true,
           selectedTech:task,
           target:target
           
       });
       
    }

    render() {
     
        var tasks = {
            wip: [],
            complete: []
        }

        this.state.tasks.forEach ((t) => {
          if(t.category==='wip')
          {
            tasks[t.category].push(
              <List.Item onDragStart = {(e) => this.onDragStart(e, t.name)}
              draggable>
              <List.Icon name={t.icon} />
              <List.Content>{t.name}</List.Content>
              
            </List.Item>
             
            );
          }
          else{
            
            tasks[t.category].push(
              <List.Item >
                <List.Icon link name="caret right" onClick={() =>this.showDetail(t)}/>
              <List.Icon name={t.icon} />
              <List.Content>{t.name}</List.Content>
              
              {bays.map((bay) => {
                let display=(!t.showDetail)?"none":null
                return(
                 
                  <List.List style={{marginLeft:"10px",display:display}} >
                  <List.Item>
                  
                    <List.Icon name="folder"/>
                    <List.Content>{bay}</List.Content>
                  </List.Item>
                  {lines.map((line) => {
                    return(
                      <List.List style={{marginLeft:"10px"}} >
                  <List.Item>
                  
                    <List.Icon name="file"/>
                    {this.renderContent(t,bay,line)}
                  </List.Item>
                  </List.List>
                    )
                  })}
              </List.List>

                )
              })}
            </List.Item>
             
            );
          }
            
        });
        

        return (
          <Card  style={{height:"600px",width:"80%",marginLeft:"10%"}}>
            <Card.Content>
              <h2 style={{textAlign:"center"}}>Drag And Drop Demo</h2>
            </Card.Content>
            <Card.Content>

            <Grid>

<Grid.Column floated='left' width={5} style={{marginLeft:"20px",marginTop:"3%"}}>
<Card>
    <Card.Content>
      Technologies
    </Card.Content>
    <Card.Content>
    <List   
      onDragOver={(e)=>this.onDragOver(e)}
      onDrop={(e)=>{this.onDrop(e, "wip")}}>
      
      {tasks.wip}
  </List>
    </Card.Content>
  
  </Card>
</Grid.Column>

 
  
  
 <Modal size="tiny"


open={this.state.showForm}
onClose={this.handleClose}
>
<Modal.Header> {"Adding "+ this.state.selectedTech.name +" to " + this.state.target} </Modal.Header>

<Form  style={{marginTop:"20px",marginLeft:"20px",marginBottom:"20px"}} onSubmit={()=>this.formSubmit()}  >
<Form.Field>
  <label> Bay number</label>
  <Input  placeholder='bay no.' name='bay' style={{width:"60%"}} value={this.state.bay} onChange={this.handleChange} />
</Form.Field>
<Form.Field>
   <label>Line number</label>
   <Input  placeholder='line no.' name='line' style={{width:"60%"}} value={this.state.line} onChange={this.handleChange} />
</Form.Field>



<Button type='submit' >Submit</Button>
</Form>

</Modal>
<Grid.Column floated='right' width={5} style={{marginRight:"20px",marginTop:"3%"}} >
<Card>
   <Card.Content>
      Classification 
   </Card.Content>

   <Card.Content>
   <List  
      onDragOver={(e)=>this.onDragOver(e)}
      onDrop={(e)=>this.onDrop(e, "complete")}
      >
       
       
       {tasks.complete}
  </List>
   </Card.Content>
 </Card>
</Grid.Column>
 
  


</Grid>

       
            </Card.Content>
            
            
            </Card>
        );
    }
}