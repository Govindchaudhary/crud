import React from 'react';
import {Modal,Form,Input,Button} from 'semantic-ui-react'
class SubjectForm extends React.Component {
    render()
    {
        return (
            <Modal size="tiny"  
            trigger={this.props.formTrigger}
            open={this.props.openSubjectForm}
            onClose={this.props.closeSubjectForm}
          >
        <Modal.Header>Add the subjects for {this.props.user.name}</Modal.Header>
          <Form  style={{marginTop:"20px",marginLeft:"20px",marginBottom:"20px"}} >
                <Form.Field>
                   <label> Subject1</label>
                   <Input  placeholder='Name' name='sub1' style={{width:"60%"}} />
                </Form.Field>
                <Form.Field>
                    <label>Subject2</label>
                    <Input  placeholder='Reg. Date' name='sub2' style={{width:"60%"}}  />
                </Form.Field>
                <Form.Field>
                    <label>Subject3</label>
                    <Input  placeholder='ID number' name='sub3' style={{width:"60%"}} />
                </Form.Field>

                <Form.Field>
                      <label>Subject4</label>
                      <Input  placeholder='abc@gmail.com' name='sub4' style={{width:"60%"}} />
                </Form.Field>
    
                <Button type='submit' >Submit</Button>
          </Form>

        </Modal>
        )
    }
   
}

export default SubjectForm;