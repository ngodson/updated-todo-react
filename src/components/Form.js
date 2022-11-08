import React, {useState, useEffect} from "react";



export const Form = ()=> {
    const [textInput, setTextInput] = useState("")
    const [submitedText, setSubmitedText] = useState([]);
    const [editText, setEditText] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(()=>{
       const getTodos = JSON.parse(localStorage.getItem("List"))
       if(getTodos){
        setSubmitedText(getTodos)
       }
    },[])

    useEffect(()=>{
        localStorage.setItem("List", JSON.stringify(submitedText))
    },[submitedText])

    const textInputChange = (e)=> {
        setTextInput(e.target.value);
    }

    const submitForm = (ev)=> {
        ev.preventDefault()
       if(textInput === ""){
        alert("Kindly insert an item in the list")
       }
       else{
        const textObeject = {
            id:  submitedText.length === 0 ? (1) : (submitedText.length + 1),
            text: textInput,
            isComplete: false,
        }
        setSubmitedText([...submitedText, textObeject])
        console.log(textObeject)
        setTextInput("")
       }
    }

    const completeTask = ({id})=> {
        const checkTask = submitedText.map((element)=>{
            if(element.id === id){
                return {...element, isComplete: !element.isComplete}
            }
            return element
        })
        setSubmitedText(checkTask)
    }

    const editTodo = ({id})=> {
        if(editingText === ""){
            alert("kindly update with a value")
        }
        const typedEditedMessage = [...submitedText].map((element)=>{
            if(element.id === id){
             element.text = editingText
            }
            return element
        })
        setSubmitedText(typedEditedMessage)
        setEditingText("")
        setEditText(null)
    }

    const deletingTask = (id)=> {
       const taskList = submitedText.filter((element)=>{
            if(element === id){
                return false
            }
            else{
                return true
            }
        })
        setSubmitedText(taskList)
    }

    const today = new Date()
    const hr = today.getHours()
    const min = today.getMinutes()
    const sec = today.getSeconds()

    return (
        <div className="todoInput">
           <input value={textInput} onChange={textInputChange} type="text" placeholder="type to submit an item" />
           <button onClick={submitForm}  type="button" value="Submit" >Submit</button>
           <div>
                {submitedText.map((item, key)=> {
                    return (
                    <div key={key}>
                        {
                            editText === item.id ? 
                            (
                                <input type="text" onChange={(e)=>{setEditingText(e.target.value)}}  value={editingText}/>
                            ) : 
                            (
                                <div className="display">
                                <div className="displayText"><p className={`${item.isComplete ? ("complete") : ("")}`}>{item.text}</p></div>
                              <div className="time"><h6>{hr}:{min}:{sec}</h6></div>
                              </div> 
                            )
                        }
                        
                        <input type="checkbox" onClick={()=> {completeTask(item)}}/>
                        {
                            editText === item.id ? 
                            (
                                <button onClick={()=> {editTodo(item)}}>Submit updated Item</button>
                            ) : 
                            (
                                <button onClick={()=> {setEditText(item.id)}}>Edit</button>
                            )
                        }
                       
                        
                     <button onClick={()=> {deletingTask(item)}} >Delete Task</button>
                    </div>
                     )
                })}
              
           </div>
        </div>
    )
}