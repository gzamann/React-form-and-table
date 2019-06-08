import React from 'react';

function Display(props){

    const deleteItem = (i) =>{
        props.onDelete(i);
    }

    const doEdit = (i) =>{
        props.onEdit(i);
    }
    
    let nameEref = React.createRef();
    let emailEref = React.createRef();
    let dateEref = React.createRef();
    let phoneEref = React.createRef();

    const doSave = (i) =>{
        let updateEl = {
            name: nameEref.current.value,
            email: emailEref.current.value,
            date: dateEref.current.value,
            phone: phoneEref.current.value,
            id: i
        }
        props.onUpdate(updateEl);
        console.log("saved");
    }

    return(
        <div class="table">
            <table>
                <tr>
                    <th>Name</th>
                    <th>email</th>
                    <th>Date</th>
                    <th>Phone</th>
                </tr>
                {props.posts.map((item)=>
                    <List listitem={item}/>
                )
                }
                </table> 
        </div>
    )

function List(props){

    return props.listitem.isEditable ?
    <tr>
        <td><input ref={nameEref} defaultValue={props.listitem.name}></input></td>
        <td><input ref={emailEref} type="email" defaultValue={props.listitem.email}></input></td>
        <td><input ref={dateEref} type="date" defaultValue={props.listitem.date}></input></td>
        <td><input ref={phoneEref} type="number" max="9999999999" defaultValue={props.listitem.phone}></input></td>
        <td>
        <button onClick={()=>doSave(props.listitem.id)} class="ebtn">Save</button>
        </td>
        <td>
        <button onClick={()=>doEdit(props.listitem.id)} class="ebtn">Cancel</button>
        </td>
    </tr>
    :
    <tr>
        <td>{props.listitem.name}</td>
        <td>{props.listitem.email}</td>
        <td>{props.listitem.date}</td>
        <td>{props.listitem.phone}</td>
        <td>
            <button onClick={()=>doEdit(props.listitem.id)} class="ebtn">Edit</button>
        </td>
        <td onClick={() => deleteItem(props.listitem.id)}>
            <button class="dbtn">Delete</button>
        </td>
    </tr>
}
}
export default Display;