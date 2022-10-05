import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  judul_tabel: [
    { text: "Nama Barang", value: "nama" },
    {
      text: "Jumlah Barang",
      align: "start",
      sortable: false,
      value: "jumlah",
    },
    { text: "Aksi", value: "aksi", sortable: false },
  ],
  isi_tabel: [],
});

export const mutations = { ...defaultMutations(state()) };

export const plugins = [EasyAccess()];

export const actions = {
  setIsiTabel({ dispatch }, value) {
    dispatch("set/isi_tabel", value);
  },
};
