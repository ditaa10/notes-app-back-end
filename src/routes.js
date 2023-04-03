const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler'); // mengambil handler dari file handler.js untuk router handler

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler, // diambil dari berkas handler.js melalui export import module
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}', // membutuhkan {id} agar bisa dilihat/dicari berdasarkan id
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}', // membutuhkan {id} untuk update berdasarkan id note nya
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}', // membutuhkan {id} untuk menghapus note berdasarkan id nya
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes; // export untuk kebutuhan route server
