const { nanoid } = require('nanoid'); // mendapatkan id/character random
const notes = require('./notes'); // import notes.js untuk mengirim/push datanya dalam array []

// membuat catatan
const addNoteHandler = (request, h) => {
  // mendapatkan data pada body request, dengan hapi tanpa konversi ke json.parse()
  const { title, tags, body } = request.payload;

  const id = nanoid(16); // id/character dengan panjang 16
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  // menggabungkan nilai kedalam object javascript untuk push notes
  const newNote = {
    title, tags, body, id, createAt, updateAt,
  };

  notes.push(newNote); // mengirim object ke notes []

  // filter untuk cek apakah newNote sudah berhasil di push
  const isSucces = notes.filter((note) => note.id === id).length > 0;

  // jika isSucces bernilai true = berhasil
  if (isSucces) {
    const response = h.response({
      status: 'succes',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  // jika isSucces  bernilai false = tidak berhasil
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// menampilkan smua catatan dihalaman utama
const getAllNotesHandler = () => ({
  status: 'succes',
  data: {
    notes, // mengembalikan data notes untuk memunculkan data yg sudah ditambah
  },
});

// menampilkan catatan berdasarkan Id nya
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params; // mendapatkan id notes menggunakan request params
  // mendapatkan object note dengan id dari objek array notes
  // [0] array id pertama yg ditemukan yg sama dengan id notes
  const note = notes.filter((n) => n.id === id)[0];

  // respon note yg sudah difilter jika tidak undefined = berhasil
  if (note !== undefined) {
    return {
      status: 'succes',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params; // mendapatkan id notes menggunakan path/request params

  // mendapatkan data pada body request, dengan hapi tanpa konversi ke json.parse()
  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString(); // untuk mengupadate tanggalnya karena method put

  // filter untuk mendapatkan index dari object catatan sesuai dengan id yg didapat
  const index = notes.findIndex((note) => note.id === id);

  // kalau -1 = gagal, karena index array dimulai dari 0,1 dst
  //  jika data benar akan diupdate jadi harus mengembalikan nilai yg dibutuhkan
  if (index !== -1) {
    notes[index] = {
      ...notes[index], // spread operator untuk mempertahankan nilai notes[index] tdk perlu diubah
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'succes',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.status(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params; // mendapatkan id notes menggunakan path/request params

  // filter untuk mendapatkan index dari object catatan sesuai dengan id yg didapat
  const index = notes.findIndex((note) => note.id === id);

  // kalau -1 = gagal, karena index array dimulai dari 0,1 dst
  if (index !== -1) {
    notes.splice(index, 1); // mengapus array berdasarkan id nya (1 = hapus 1)
    const response = h.response({
      status: 'succes',
      message: 'Catatan berhasil dihapus',
    });
    response.code(202);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// export untuk di inport dirouter untuk kebutuhan handler
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
