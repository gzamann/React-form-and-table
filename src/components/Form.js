import React from 'react';
import Display from './Display';

class Form extends React.Component{
    
    constructor(props){
        super(props);

        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.dateRef = React.createRef();
        this.phoneRef = React.createRef();

        this.state={ 
            data : []
        };
        this.submitForm = this.submitForm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.letEdit = this.letEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleDelete(e){
        // console.log(e);
        let newAr = this.state.data;
        console.log(newAr[e]);
        
        // newAr.splice(e,1);

        newAr = newAr.filter(function(i){
         return   i.id !== e;
        });

        console.log(newAr);
        this.setState({data: newAr});
    }
    letEdit(e){
        let newEl = this.state.data;
        newEl[e].isEditable = !newEl[e].isEditable;
        this.setState({data:newEl});
    }
    handleUpdate(e){
        console.log(e.id);
        let updateEl = this.state.data;
        updateEl[e.id] = e;
        updateEl[e.id].isEditable = false;
        this.setState({data:updateEl});
    }

    submitForm(e){
        e.preventDefault();

        let newEntry = this.state.data;
        let name = this.nameRef.current.value;
        let email = this.emailRef.current.value;
        let date = this.dateRef.current.value;
        let phone = this.phoneRef.current.value;
        newEntry.push({
            name,
            email,
            date,
            phone,
            id: this.state.data.length,
            isEditable: false
        });
        this.setState({data: newEntry});
        this.nameRef.current.value = "";
        this.emailRef.current.value = "";
        this.dateRef.current.value = "";
        this.phoneRef.current.value = "";
    }
    render(){

        return(
            <div class="formwrap">
            <div>
            <form onSubmit={this.submitForm}>
                <label>Name</label>
                <input placeholder="name" type="text" required pattern="[^0-9]+" ref={this.nameRef}></input>
                <label>email</label>
                <input ref={this.emailRef} type="email" placeholder="email"></input>
                <label>Date</label>
                <input ref={this.dateRef} type="date" min="1995-01-01" placeholder="date"></input>
                <label>Phone</label>
                <input ref={this.phoneRef} min="1000" max="9999999999" type="number" placeholder="phone"></input>

                <button type="submit">Submit</button>
            </form>
            </div>
            <div>
                <Display posts={this.state.data} onEdit={this.letEdit} onDelete={this.handleDelete} onUpdate={this.handleUpdate} />
            </div>
            </div>
    )
}
}

export default Form;