import React from 'react'
import { Button,  Icon, Table } from 'semantic-ui-react'

class ChildTable extends React.Component {
    render()
    {
        return (
            <Table  celled compact  attached="bottom" color="blue" style={{margin:"5px 5px 5px 5px"}}>
              <Table.Header >
              <Table.Row>
                  <Table.HeaderCell >{this.props.user.name}- Exam Results</Table.HeaderCell>
                  <Table.HeaderCell colSpan='6'>
                    <Button floated='right' icon labelPosition='left' primary size='small'>
                      <Icon name='user' /> Add Record
                    </Button>
                    
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                
                  <Table.HeaderCell>Course Name</Table.HeaderCell>
                  <Table.HeaderCell>Exam Date</Table.HeaderCell>
                  <Table.HeaderCell>Degree</Table.HeaderCell>
                  
                  <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
          
              <Table.Body>
                <Table.Row>
                  
                  <Table.Cell>John Lilki</Table.Cell>
                  <Table.Cell>September 14, 2013</Table.Cell>
                  <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                  
                  <Table.Cell >
          <Button  icon><Icon link name='edit' size="large" /></Button>
         
        </Table.Cell>
        <Table.Cell >
          <Button   icon><Icon link name='delete' size="large" /></Button>
                 
        </Table.Cell>
                </Table.Row>
                <Table.Row>
                  
                  <Table.Cell>Jamie Harington</Table.Cell>
                  <Table.Cell>January 11, 2014</Table.Cell>
                  <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                  
                  <Table.Cell >
          <Button   icon><Icon link name='edit' size="large" /></Button>
         
        </Table.Cell>
        <Table.Cell >
          <Button  icon><Icon link name='delete' size="large" /></Button>
                 
        </Table.Cell>
                </Table.Row>
                
              </Table.Body>
          
             
            </Table>
          )
    }
} 

export default ChildTable