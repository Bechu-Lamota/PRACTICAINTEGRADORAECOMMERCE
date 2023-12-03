const socket = io() //ya con esto y el index, nuestro front end ya se esta conectando a nuestro servidor.

const messageContainer = document.getElementById('messageContainer')
const messageInput = document.getElementById('messageInput')
const messageButton = document.getElementById('messageButton')
const notificationContainer = document.getElementById('notificationContainer')

console.log({ messageContainer, messageInput, messageButton, notificationContainer })

const params = Qs.parse(window.location.search, { //Lo que hace esta libreria que importamos en index.handlebars es parsear todos mis parametros en este caso los users.
	ignoreQueryPrefix: true
})

console.log(params)

socket.emit('joinChat', params.username) //cuando mi archivo cargue, quiero que me ingrese al chat

socket.on('notification', notif => { //De esta manera todas las veces que iniciemos sesion de distintas pestañas nos va avisar que se conecto el cliente.
	notificationContainer.innerHTML = notif //Es como una notificacion.
})

messageButton.addEventListener('click', (e) => {
	const message = messageInput.value

	if (message) {
		socket.emit('newMessage', message)
	}

	console.log({ message })
})

socket.on('message', messageString => {
	const message = JSON.parse(messageString)
	messageContainer.innerHTML += `
	<div>${message.user}: ${message.message} </div>
	`
})

//Para tener el arreglo de los mensajes anteriores:
socket.on('messages', messagesString => {
	const messages = JSON.parse(messagesString)
	messageContainer.innerHTML = ''
	messages.forEach(message => {
		messageContainer.innerHTML += `
		<div>${message.user}: ${message.message} </div>
		`
	})
})