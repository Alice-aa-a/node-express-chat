const sMessage = require('../models/message');

module.exports = function (io) {
// Établissement de la connexion à Socket.io
  io.on('connection', (socket) => {
    // Affichage du client qui vient de se connecter
    console.log(`Connecté au client ${socket.id}`)
    io.emit('notification', { type: 'new_user', data: socket.id });


    socket.on('message', (data) => {
      const message = new sMessage({
        text: data.message,
        timestamp: new Date(),
        sessionid: socket.id,
        userid: data.userid
    });

    // Sauvegarde dans la base de données
      message.save()

        io.emit('message',  { message: data.message, userid: data.userid, date: data.date });
      });    

        
    socket.on('get_users', () => {
      // io.emit('notification', { type: 'removed_user', data: socket.id });
    });
    
    // Listener sur la déconnexion
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`);
      io.emit('notification', { type: 'removed_user', data: socket.id });
    });
  })
}