import React from 'react'
import styled from 'styled-components'

// below is our styled component
const Container = styled.div`
 
`

const TableDiv = styled.div`

`

const Table = styled.table`
    width: 100%;
    align-items: center;
    border: 1px solid black;
    padding: 1rem;
   
    
`

const TableHead = styled.thead`

`
const Trow = styled.tr`
    
`
const Th = styled.th`
  text-align: start;
`
const Tbody = styled.tbody`
    align-items: center;
   gap: 1rem;
`
const Td = styled.td`
  border: 1px solid black;
  padding: 4px;
`
const AdminBtn = styled.button`
    background-color: green;
    color: white;
    border: 0px;
    border-radius: 5px;
    padding: 0px 4px;
    cursor: pointer;
`
const RemoveBtn = styled.button`
     background-color: red;
    color: white;
    border: 0px;
    border-radius: 5px;
    padding: 0px 4px;
    cursor: pointer;
`

// below is our jsx

const Users = ({User}) => {
  return (
    <Container>
      
      <TableDiv>
        <Table>
          <TableHead>
            <Trow>
              <Th>UserId</Th>
              <Th>User Name</Th>
              <Th>User Email</Th>
              <Th>Add admin</Th>
              <Th>Delete User</Th>
            </Trow>
          </TableHead>
          <Tbody>
            {
                User.map((user)=>(
                    <Trow key={user._id}>
                        <Td>{user._id}</Td>
                        <Td>{user.username}</Td>
                        <Td>{user.email}</Td>
                        <Td><AdminBtn>make Admin</AdminBtn></Td>
                        <Td><RemoveBtn>Delete User</RemoveBtn></Td>
                    </Trow>
                ))
            }
           
          </Tbody>
        </Table>
      </TableDiv>
    </Container>
  )
}

export default Users