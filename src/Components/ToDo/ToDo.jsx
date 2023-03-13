
import React, { useContext, useState } from "react"
import { NoteContext } from "../../Context/NoteContext"
import './ToDo.css'






const ToDo = ({ id, task, complete, date, setCurrentDate, currentDate, relevance, tag, deleteTask }) => {

    const { setStatusTask } = useContext(NoteContext)
    const [isEditing, setIsEditing] = useState(false);

    const checkTask = e => setStatusTask(id, e.target.checked)

    const handleUpdateDate = () => {
        setCurrentDate(new Date());
        setIsEditing(false);
    }

    const formattedDate = currentDate.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });



    const handleClick = () => {
        deleteTask(id);
    }





    return (

        <div id='conteiner-list' className={relevance === '1' ? 'low' : relevance === '2' ? 'medium' : 'high'}>
            <button id="x" onClick={handleClick}>X</button>
            <div id="info">
                <div style={{ backgroundColor: 'transparent' }}>
                    <div id="check-name">
                        <input type="checkbox" onChange={checkTask} />
                        <h3 className={complete ? 'task-done' : ''}>{task}</h3>
                    </div>
                    {/* no va */}
                  <div id="tag-task">
    {tag ? tag : 'No hay etiquetas'}
</div>




                    <div className="box-date">

                        <div className="calendar-box" id="datetime"> {isEditing ? (
                            <div>
                                <input type="datetime-local"
                                    value={currentDate}
                                    onChange={(e) => setCurrentDate(e.target.value)}
                                    onBlur={() => setIsEditing(false)}
                                    autoFocus />
                                <button onClick={handleUpdateDate}>Cambiar</button>
                            </div>) : (

                            <p id="line" onClick={() => setIsEditing(true)}>{formattedDate}</p>
                        )}
                        </div>
                        <div style={{ paddingTop: '25px' }} className="calendar-box">
                            <p>Tienes hasta: {date}</p>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}


export default ToDo


