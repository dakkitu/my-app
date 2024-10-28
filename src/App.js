import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  const allCategories=['All','Complete','Incomplete'];
  const [button,setButton]=useState(0);
  const [categories,setcategories]=useState('All');
  const [formData,setFormData]=useState({
    task:''
  });
  const [max,setMax]=useState(0);
  const [searchText,setSearchText]=useState('');
  const [taskList,setTaskList]=useState([]);
  const [filteredtaskList,setFilteredTaskList]=useState([]);
  const [error,setError]=useState('');
  const changeCategory=(category,index)=>{
      setButton(index);
      setcategories(category);
      if(category==='All')
        setFilteredTaskList(taskList);
      if(category==='Complete')
        setFilteredTaskList(taskList.filter((task)=>task.completed===true));
      if(category==='Incomplete')
        setFilteredTaskList(taskList.filter((task)=>task.completed===false));
      
  }
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(formData.task.trim()=='')
       {
        setError('Task should not be empty');
        return;
       }
    setError('');
    setTaskList([...taskList,{id:max+1,task:formData.task,completed:false}]);
    if(categories!=='Complete')
      {
      setFilteredTaskList([...filteredtaskList,{id:max+1,task:formData.task,completed:false}]);
      }
    setMax(max+1);
    setFormData({task:''});
    
  }
  const handleCheckbox=(id)=>{
    const newtasklist=taskList.map((task)=>{
      if(task.id===id)
        {
        return {...task,completed:!task.completed};
        }
      return task;
    });
    const newlist=updatedTaskList.map((task)=>{
      if(task.id===id)
        {
        return {...task,completed:!task.completed};
        }
      return task;
    });
    setTaskList(newtasklist);
    if(categories!=='All')
      {
      setFilteredTaskList(filteredtaskList.filter((task)=>task.id!==id));
      }
    else
      {
      setFilteredTaskList(newtasklist);
      }
  }
  const removeTask=(id)=>{
    setTaskList(taskList.filter((task)=>task.id!==id));
    setFilteredTaskList(filteredtaskList.filter((task)=>task.id!==id));
  }
  const handlesearch=(e)=>{
    setSearchText(e.target.value);
  }
  const updatedTaskList=filteredtaskList.filter((task)=>task.task.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div >
      
      <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}>
      <div style={{display:"flex",flexDirection:"row",width:'40%',justifyContent:'space-between'}}>
      <div><input type="text" placeholder="search task" onChange={handlesearch} style={{height:'30px',borderRadius:'15px',fontSize:'15px'}}/></div>
      <div className='btn-container'>
        {allCategories.map((category,index)=>{
        return (
          <button className={`filter-btn ${button===index? 'selected': ''}`} key={index} onClick={()=>changeCategory(category,index)}>{category} </button>
        )
      })}
      </div>
      </div>
      
      <div className='table-header'><span>Mark as Completed/incomplete </span><span >task description </span><span>Remove Task</span></div>
      {updatedTaskList.map((ele)=>{
          const {id,task,completed}=ele;
          return(
            <div className={`table-row ${completed?'completed':''}`} key={id}>
              <span>
              <input type="checkbox" style={{margin:'0 auto'}} checked={completed} onChange={()=>handleCheckbox(id)}  />
              </span>
              <span className='task-description'> {task} </span>
              <span >
              <i className="fas fa-trash-alt " style={{ cursor: 'pointer', color: '#4CAF50', fontSize: '20px' }} onClick={()=>removeTask(id) } title='Delete'/>
              </span>
            </div>
          )
      })}
      <div style={{width:'40%'}}>
      <form ><div style={{padding:'2px',margin:'0 0.5rem'}}> <input type="text" name="task" style={{width:'100%',height:'25px'}} placeholder='type something..' value={formData.task} onChange={handleChange} required/></div><div ><button className="task-btn" style={{width:'100%'}}  onClick={handleSubmit}>Add New Task</button></div></form>
      {error &&<p style={{ color: 'red', fontSize: '14px' ,marginLeft:'7px'}}>{error}</p>}
      </div>
      </div>
    </div>
  );
}

export default App;
