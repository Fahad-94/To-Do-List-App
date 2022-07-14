const addTaskBtn = document.querySelector('#tasks-div-btn');
const tasksDiv = document.querySelector('#tasks-div');
const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn')
const dueDateInput = document.querySelector('#due-date');
const displayDiv = document.querySelector('#display-div');
const clearBtn = document.querySelector('#clearBtn');
const displayDate = document.querySelector('#header-midDiv');
const displayTime = document.querySelector('#header-div2');



window.onload = () => {

       realTime();

    
       for (let i = JSON.parse(window.localStorage.getItem('tasks')).length - 1; i >= 0; i--) {

        
        let x = JSON.parse(window.localStorage.getItem('tasks'));
        console.log(x)


        let Div = document.createElement('div');
        let para = document.createElement('input');
        let para2 = document.createElement('p');
        let doneBtn = document.createElement('button');
        let delBtn = document.createElement('button');
        let editBtn = document.createElement('button');


        doneBtn.innerHTML = 'Done';
        delBtn.innerHTML = 'Delete task';
        doneBtn.classList.add('tool-btn');
        delBtn.classList.add('tool-btn');
        editBtn.innerHTML = 'Edit';
        editBtn.classList.add('tool-btn');
        

        doneBtn.addEventListener('click', () => {

            
            Div.style.transition = 'all 0.4s ease';
            Div.style.opacity = '0';
            

            setTimeout(() => {
                
                let arr;

            if (localStorage.getItem('tasks') == null) {
                arr = [];
            } else {
                arr = JSON.parse(localStorage.getItem('tasks'));
            }


            const arr2  = {
                ...arr[i],
                'isDone' : !arr[i].isDone,
            }


            arr.splice(i, 1);


            if (arr2.isDone) {
                arr.unshift(arr2);
            } else {
                arr.push(arr2);
            }


            localStorage.setItem('tasks', JSON.stringify(arr));

            window.location.reload();
             }, 400)
            })



        editBtn.addEventListener('click', () => {

            let arr;

        if (localStorage.getItem('tasks') == null) {
            arr = [];
        } else {
            arr = JSON.parse(localStorage.getItem('tasks'));
        }


            if (editBtn.innerHTML == 'Edit') {
                para.removeAttribute('readonly');
                para.focus();
                editBtn.innerHTML = 'Save Changes';
            } else {
                para.setAttribute('readonly', 'readonly');
                editBtn.innerHTML = 'Edit';
                let newTask = para.value.trim();

                let arr2 = {
                    ...arr[i],
                    'task' : newTask
                }

                

                let index = i + 1;

                
                
                arr.splice(i, 0, arr2);
                
                arr.splice(index, 1);

                localStorage.setItem('tasks', JSON.stringify(arr));

            }
            
        })

        




        delBtn.addEventListener('click', () => {

            
            Div.classList.add("fall");
            


            setTimeout( () => {

                Div.remove();
                
                let arr;

            if (localStorage.getItem('tasks') == null) {
                arr =[];
            } else {
                arr = JSON.parse(localStorage.getItem('tasks'));
            }

            arr.splice(i, 1);

            localStorage.setItem('tasks', JSON.stringify(arr))}, 1000);


        });





        para2.innerHTML = 'Due Date: ' + x[i].due;
        para.style.margin = '10px';
        para.style.fontSize = '18px';
        para2.style.margin = '10px';
        para2.style.color = 'gray';
        para.setAttribute('value', x[i].task);
        para.setAttribute('readonly', 'readonly');
        para.style.textDecoration = `${x[i].isDone ? 'line-through' : 'none'}`
        para.classList.add('task-input');
        Div.append(para);
        Div.append(para2);
        Div.classList.add('taskDiv');
        Div.append(doneBtn);
        Div.append(editBtn);
        Div.append(delBtn);
        tasksDiv.append(Div)

        Div.style.opacity = `${x[i].isDone ? '0.5' : '1'}`;
        doneBtn.innerHTML = `${x[i].isDone ? 'Undone' : 'Done'}`;

    

        
    

       }

    }







function addTask() {

    if (taskInput.value.trim() != "" && dueDateInput.value != "") {
        let t = new Date();
        let d = t.getDate();
        let m = t.getMonth() + 1;
        let y = t.getFullYear();
        let date = `${y}-${m<=9 ? '0'+m : m}-${d<=9 ? '0'+d : d}`
        if (dueDateInput.value >= date) {

    let task = {
        'task' : taskInput.value.trim(),
        'due' : dueDateInput.value,
        'isDone' : false
    }

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    window.localStorage.setItem('tasks', JSON.stringify(tasks));
   
   

    window.location.reload();
    


    displayDiv.classList.add('hide-div');
    taskInput.value = '';
    dueDateInput.value = '';

    } else {
        alert('Invalid Due Date!');
    }
       } else {
        alert('Please fill the fields. All fields are required.');
    }

    
}


function displayTask() {
    if (displayDiv.classList.contains('hide-div')) {
         displayDiv.classList.remove('hide-div');
    } else {
         displayDiv.classList.add('hide-div');
    }
}

function clearAll() {
    window.localStorage.clear();
    document.location.reload();
}


function done(arr) {

    if (arr.isDone == true) {
        para.style.textDecoration = 'line-through';
        para.style.color = 'gray';
        Div.style.opacity = '0.6';
        Div.style.transition = 'all 0.4s ease';
        doneBtn.innerHTML = 'Undone';
    } else {
        para.style.textDecoration = 'none';
        para.style.color = 'black';
        Div.style.opacity = '1';
        doneBtn.innerHTML = 'Done';
    }
}


function realTime() {

    let t = new Date();

       let d = t.getDate();
       let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
       let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
       let dayName = days[t.getDay()];
       let m = months[t.getMonth()];
       let y = t.getFullYear();

       let date = m + ' ' + d + ' ' + y;

    let h = t.getHours();
    
    let mn = t.getMinutes();

    let s = t.getSeconds();
    
    let amPm = (h < 12) ? 'AM' : 'PM';

    h = (h > 12) ? h - 12 : h;

    h = ('0' + h).slice(-2);
    mn = ('0' + mn).slice(-2);
    s = ('0' + s).slice(-2);

    displayDate.innerHTML = h + ' : ' + mn + ' : ' + s + ' ' + amPm 
    displayTime.innerHTML =  dayName + ' ' + date;

    setTimeout(realTime, 500);
    
}
