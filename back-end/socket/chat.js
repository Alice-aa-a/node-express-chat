module.exports = function (io) {

  io.on('connection', (socket) => {
    // Affichage du client qui vient de se connecter
    console.log(`Connecté au client ${socket.id}`)
    io.emit('notification', { type: 'new_user', data: socket.id });



    socket.on('message', (data) => {
      io.emit('message',  { message: data.message, userid: data.userid, date: data.date });
    });    
    
    
    // Listener sur la déconnexion
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`);
      io.emit('notification', { type: 'removed_user', data: socket.id });
    });
  })
}