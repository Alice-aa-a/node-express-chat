(function () {
    const server = 'http://127.0.0.1:3000'
    const socket = io(server);

    socket.on('notification', (data) => {
        console.log('Message depuis le seveur:', data);
    })

    const ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_DI21' + Math.random().toString(36).substr(2, 9);
        };
    let userid = '';
    if(localStorage.getItem('userid')){
            userid = localStorage.getItem('userid');
        } else {
            const id = ID();
            localStorage.setItem('userid', id)
            userid = id;
        }

    let users = [];

    socket.on('get_users', (data) => {
        console.log('Message depuis le seveur:', data);
    })


    let send_button = document.getElementById('sendBtn');
    let input_message = document.getElementById('inputMsg');
    

    send_button.addEventListener('click', SendMessage);

        let date = new Date;
        let date_string =`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

       function SendMessage()
       {    
        let input_value = input_message.value;

                    socket.emit('message', { message: input_value, userid: userid, date: date_string });
                    
                    console.log(input_value);
                    input_message.value = "";

       }
        
        socket.on('message', (message) => {

        var list = document.getElementById('message_list');
        var item = document.createElement('li');
        item.classList.add('me');

        var name = document.createElement('div');
        name.classList.add('name');
        var username = document.createElement('span');
        username.innerHTML = userid;
        name.appendChild(username);

        var line = document.createElement('div');
        line.classList.add('message');
        var content = document.createElement('p');
        content.innerHTML = message.message;
        line.appendChild(content);
        
        var time = document.createElement('span');
        time.innerHTML = date_string;
        time.classList.add('msg-time');
        line.appendChild(time);

 
        item.appendChild(name);
        item.appendChild(line);

        list.insertBefore(item, list.childNodes[-1]);
        })
})()