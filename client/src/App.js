import React from 'react';
import './App.css';

var result_length;
function Display(props) {
    return(
        <tr>
            <td>
                {props.firstname}
            </td>
            <td>
                {props.lastname}
            </td>
            <td>
                {props.email}
            </td>
            <td>
                {props.mobile}
            </td>
        </tr>
    )

}

class DisplayRows extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            data : [],
        }
    }
    componentDidMount(){

        this.callApi()
            .then(res => {
                this.setState(
                    {
                        data : res
                    }
                )
            })
            .catch(err=> console.log(err));
    }

    callApi = async()=>
    {
        const response = await fetch('http://localhost:8080/');
        if(response.status !==200) console.log("error");
        return response.json();

    }
    render(){
        let x;
        return(
            <div >
                <table>
                    <thead>
                    <tr>
                        <td>
                            First Name
                        </td>
                        <td>
                            Last Name
                        </td>
                        <td>
                            Mobile Number
                        </td>
                        <td>
                            Email
                        </td>
                    </tr>
                    </thead>
                    <tbody className="Displaydata">
                    {
                        this.state.data.length > 0
                            ?
                            this.state.data.map((row,key)=> {
                                return (<tr>
                                    <td>{row.first_name}</td>
                                    <td>{row.last_name}</td>
                                    <td>{row.mobile_no}</td>
                                    <td>{row.email_id}</td>

                                </tr>)
                            }) : 'no data'
                    }
                    </tbody>
                </table>
            </div>

        )
    }
}
export default DisplayRows;
