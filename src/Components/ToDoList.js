import React, {useState} from 'react'
import ToDoForm from './ToDoForm'
import ToDo from './ToDo';
import ProgressBar from './ProgressBar';
import Loading from './Loading';

function ToDoList() {

    const [ToDos, setToDos] = useState([]);

    const addToDo = ToDo => {
        if (!ToDo.text || /^\s*$/.test(ToDo.text)){
            return;
        }

        const newToDos = [ToDo, ...ToDos];

        setToDos(newToDos);
    };


    const updateToDo = (ToDoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)){
            return;
        }

        setToDos(prev => prev.map(item => (item.id === ToDoId ? newValue : item)));
    } 

    const [XPcount, setXPCount] = useState(0);

    const [Lvlup, setLvlup] = useState(1);
    
    const DoneToDo = id => {

        setXPCount(XPcount+20);

        if(XPcount===80){

            setTimeout(() => {
                document.getElementById('loading').classList.add('active');
            }, 300);

            setTimeout(() => {
                setXPCount(0);
            }, 500);

            setLvlup(Lvlup+1);

            var i = 1;

            for(i=1; i<5; i++){
                if(document.body.classList.contains('level-'+i)){
                    document.body.classList.remove('level-'+i);
                    document.body.classList.add('level-'+(i+1));
                    break;
                }
            }

          /*  if(document.body.classList.contains('level-1')){
                document.body.classList.remove('level-1');
                document.body.classList.add('level-2');
            }
            else if(document.body.classList.contains('level-2')){
                document.body.classList.remove('level-2');
                document.body.classList.add('level-3');
            }
            else if(document.body.classList.contains('level-3')){
                document.body.classList.remove('level-3');
                document.body.classList.add('level-4');
            }
            else if(document.body.classList.contains('level-4')){
                document.body.classList.remove('level-4');
                document.body.classList.add('level-5');
            }
            */
        }

        const removeArr = [...ToDos].filter(ToDo => ToDo.id !== id);

        setToDos(removeArr);

    };

    const removeToDo = id => {
            
        const removeArr = [...ToDos].filter(ToDo => ToDo.id !== id);

        setToDos(removeArr);

    };

    const completeToDo = id => {
        let updatedToDos = ToDos.map(ToDo => {
            if(ToDo.id === id) {
                ToDo.isComplete = !ToDo.isComplete;
            }
            return ToDo;
        });
        setToDos(updatedToDos)
    }

    return (
        <div>
            <Loading 
                levelup = {Lvlup}
            />
            <ProgressBar
                XPcount = {XPcount}
                levelup = {Lvlup}
            />
            <h1 id="texto-principal">  </h1>
            <p id="tema-principal">  </p>
            <ToDoForm onSubmit={addToDo} />
            <ToDo 
                ToDos = {ToDos}
                completeToDo = {completeToDo}
                updateToDo = {updateToDo}
                DoneToDo = {DoneToDo}
                removeToDo = {removeToDo}
            />
        </div>
    )
}

export default ToDoList
