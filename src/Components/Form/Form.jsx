import { useContext, useState } from "react"
import { NoteContext } from "../../Context/NoteContext.jsx"
import './Form.css'
import todoapp from '../../assets/todoapp.png'
import arrow from '../../assets/arrow.jpg'

const Form = () => {
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')
    const [tag, setTag] = useState('')
    const { addTask, message, setMessage } = useContext(NoteContext)
    const [relevance, setRelevance] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')
    const [originalMessage, setOriginalMessage] = useState([]);
    const [mostrarTodo, setMostrarTodo] = useState(false);

    const submitNote = (e) => {
        e.preventDefault()
        addTask(task, date, tag, relevance)
        setTask('')
        setDate('')
        setTag('')
        setRelevance('')
    }

    // const handleSort = () => {
    //     const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    //     setSortDirection(newSortDirection);
    //     setMessage(sortNotes(message, newSortDirection));
    // }

    const sortNotes = (notes, direction) => {
        return [...notes].sort((a, b) => {
            const aDate = new Date(a.date).getTime();
            const bDate = new Date(b.date).getTime();
            const compareResult = aDate - bDate;
            return direction === 'asc' ? compareResult : - compareResult;
        });
    }

    const sortedNotes = sortNotes(message, sortDirection);
    const UniqueRelevances = () => {
        const relevances = message.map(note => note.relevance);
        return [...new Set(relevances)];
    };

    const showNoShow = UniqueRelevances();


    const filterByRelevance = (relevance) => {
        const filteredNotes = message.filter(note => note.relevance === relevance);
        setMostrarTodo(true);
        setOriginalMessage(message);
        setMessage(filteredNotes);
    };

    const showAllNotes = () => {
        setMessage(originalMessage);
        setMostrarTodo(false);
    };

    return (
        <div >
            <div id="img-header">
                <img src={todoapp} alt='title-img' />
            </div>

            <form onSubmit={submitNote}>
                <div id="form-note">
                    <input
                        type="text"
                        className="input-note"
                        value={task}
                        placeholder="Escribe aquí tu tarea..."
                        onChange={e => setTask(e.target.value)}
                        required />

                    <button id="left" className="btn-input">Añadir</button>

                    <button id="left" className="btn-input" >
                        Ordenar por fecha {sortDirection === 'asc' ? 'ascendente' : 'descendente'}
                    </button>

                    <div >
                            <select
                                value={relevance}
                                onChange={e => setRelevance(e.target.value)}>
                                <option value="">Prioridad</option>
                                <option value="1" >Baja</option>
                                <option value="2">Media</option>
                                <option value="3">Alta</option>
                                <div>
                                    <img src={arrow} alt="arrow" />
                                </div>
                            </select>
                        </div>
                    
                </div>

                <div id="allTwo">

                    {task && (
                        <div id="left">
                            <input type="text" value={tag} placeholder="#Add" onChange={e => setTag(e.target.value)} />
                        </div>
                    )}

                    {/* {task && (
                        <div >
                            <select
                                value={relevance}
                                onChange={e => setRelevance(e.target.value)}>
                                <option value="">Prioridad</option>
                                <option value="1" >Baja</option>
                                <option value="2">Media</option>
                                <option value="3">Alta</option>
                                <div>
                                    <img src={arrow} alt="arrow" />
                                </div>
                            </select>
                        </div>
                    )} */}

                    {task && (
                        <div >
                            <input required type="date" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                    )}
            
                {showNoShow.map(relevance => (
                    <button 
                        key={relevance}
                        className="btn-input"
                        id="all"
                        type="button"
                        onClick={() => filterByRelevance(relevance)}
                    >
                        {`Prioridad ${relevance}`}
                    </button>
                )
            
            )}
                </div>
          
            {mostrarTodo && (
            <button className="btn-input" i onClick={showAllNotes}>
                Mostrar todas
            </button>
            )}

            </form>
        </div>
    )
}

export default Form







