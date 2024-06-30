import { useEffect, useState } from "react";
import { account, database } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import conf from "../Conf/conf";
import { Query } from "appwrite";
// import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [todo, setTodo] = useState("");
  const [alltodos, setAlltodos] = useState([]);

  const isLogin = async () => {
    try {
      
      let currentUser = await account.get("client");
      if(currentUser.emailVerification==false){
        navigate("/login")
      }
      // console.log(currentUser);
      setEmail(currentUser.email);
      setName(currentUser.name);
      showTodo(currentUser.email); // Fetch todos after setting the email
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const Logout = async () => {
    try {
      let deleteSession = await account.deleteSession("current");
      console.log(deleteSession + " session is deleted");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    if (todo === "") {
      alert("Todo can't be blank");
    } else {
      try {
        const data = await database.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, 'unique()', {
          email: email,
          todo: todo
        });
        // console.log(data);
        setTodo("");
        showTodo(email); // Refresh the todo list after adding a new todo
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showTodo = async (userEmail) => {
    const listDoc = await database.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, [
      Query.equal('email', userEmail)
    ]);
    // console.log(listDoc.documents);
    setAlltodos(listDoc.documents);
  };

  const updateTodo = async (id) => {
    try {
      const data =await database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,id, {
        todo:"i have complited it"
      })
      showTodo(email);
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  const deleteTodo = async (id) => {
    try {
      const data =await database.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,id,);
      showTodo(email);
      // console.log(data +"deleted succesfully")
      alert(data +"deleted Successsfully")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isLogin();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <div className="user-info">
          {name && email ? (
            <>
              <p><strong>UserName:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <button className="logout-button" onClick={Logout}>Logout</button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <input
            style={{ outline: "none", height: "40px" }}
            value={todo}
            type="text"
            placeholder="Enter todo..."
            onChange={(e) => { setTodo(e.target.value); }}
          />
          <button onClick={addTodo}>Submit</button>
        </div>

        {alltodos.length > 0 ? (
          <div>
            {alltodos.map((e) => (
              <>
              <p key={e.$id}>{e.todo}</p>
              <button onClick={()=>{updateTodo(e.$id)}}>Update</button>
              <button onClick={()=>{deleteTodo(e.$id)}}>Delete</button>
              
              </>
            ))}
          </div>
        ) : <div>Loading....</div>}
      </div>
    </div>
  );
};

export default Dashboard;
