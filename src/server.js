const Hapi = require('@hapi/hapi'); // using nodejs framwork for make server
const routes = require('./routes'); // add routes from routes.js for method and handler

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: { // membuat CORS agar server dapat digunakan ketika meminta data dari origin yg berbeda
      cors: {
        origin: ['*'], // * seluruh data origin yg berbeda/masukan host origin
      },
    },
  });

  server.route(routes); // menjalankan route file routes.js yg menyimpan route method path handler

  await server.start(); // untuk menjalankan hapi server, berjalan secara async
  console.log(`Server berjalan pada ${server.info.uri}`); // untuk pesan agar console dapat menampilkan alamat lengkap server
};

init(); // menjalankan fungsi pembuatan server
