# RenderingReact
Passing data fetched from sql query to react via node express

If you want to view the code directly and figure out for yourself :

sending data from node - server/routes/index.js

fetching data from node - client/src/App.js

In this tutorial I will only show how to pass the data from the backend (node - express) to the frontend (react).
Basic routing knowledge of database connectivity is required.

1. Create an express app using the command line or using the auto generator if you use an IDE like WebStorm
    ```
    $npx express-generator
    ```
2. Create a folder named server and move all the files created by the create-express command to the server folder.

3. Go outside the server folder and create a react app with the command like or auto generator whichever you prefer.
    ```
    $npx create-react-app my-app
    ```
4. Create a folder client and move the all the files and folders created by the above command
Your directory should look like
```
Project-name
|
|->Server
|    |->bin/
|    |->node_modules/
|    |->public/
|    |->routes/
|    |->views/
|    |->app.js
|    |->package.json
|    |->package-lock.json
|
|->Client
    |->node_modules/
    |->public/
    |->src/
    |->package.json
    |->package-lock.json
```

5. Open the package.json from the client folder and add the following
```
"proxy": "http://localhost:xxxx/"
```
replace the xxxx with the port that you are using for your node app

6. Now you are ready to pass data between express and reactjs

7. Write the piece of code you use to connect to your database. Select the method GET or POST for transferring data and use the appropriate function for the method. I have called the query function and passed my data to ```result```. Now ```result``` needs to be passed on to the front end. For that use ```response.send(result)```

Snapshot of my code :
```
router.get('/', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  con.query(sql,function(err,result){
    if(err) {
      throw err;
    }else{
      console.log(result);
      res.send( result);
    }
  });
});

```

8. Now open the front end i.e ```client/src/app.js```

Create a Class component to store the data in the ```state``` of the class.
```
class DisplayRows extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            data : [],
        }
    }
```
Use the function ```ComponentDidMount()``` to **call an asynchronous function** to fetch the data after the component is mounted on the DOM.
``` fetch('http://localhost:8080/');``` is used to fetch the data that we sent from the backend
store the data into a variable or constant 
``` const response = await fetch('http://localhost:8080/');```
I have used await here because I want my code to wait till I get the result and then display it.

**Note : You can use await only in async functions**

The ```response``` stores the fetched data in a raw format. So we need to convert it into a json object to iterate over it and display it.
Use ```return response.json()``` to send the json object to the parent function.

```
componentDidMount(){

        this.callApi()
            .then(res => {
                this.setState(
                    {data : res})
            })
            .catch(err=> console.log(err));
    }

    callApi = async()=>
    {
        const response = await fetch('http://localhost:8080/');
        if(response.status !==200) console.log("error");
        return response.json();

    }
```
Now in the render function of the Class component, go to ```return``` and use ```{}``` to write the javascript statements we need to iterate through the result.
    
We will use a ```map``` function over the object so that we dont need to bother ourselves with the number of entries there are in the fetched query.
```
this.state.data.map((row,key)=> {
  return ()
})
```
Now we will access the data using ```row``` 
We will need the names of the columns or properties if you are using a NoSQL db like Mongo.
```
row.col_name; // in case of SQL 
row.key_name; // in case of NoSQL
```

```
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
```
    
I am displaying the data in a table hence I am using ```<tr>``` and ```<td>``` tags. You can skip them if you are not using a table.

```
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
```
