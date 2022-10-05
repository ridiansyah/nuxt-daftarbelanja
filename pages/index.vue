<template>
  <v-data-table
    :headers="judul_tabel"
    :items="isi_tabel"
    sort-by="nama"
    class="elevation-1"
    :search="cari"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="font-weight-bold">{{ judul }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="cari"
          append-icon="mdi-magnify"
          label="Cari Barang"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Tambah Barang
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ judulModal }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.nama"
                  label="Nama Barang"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.jumlah"
                  label="Jumlah Barang"
                ></v-text-field>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Batal </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Simpan </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Kamu yakin akan menghapus barang ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Tidak</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Iya</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.aksi="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data> </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    judul: "DAFTAR BELANJA",
    cari: "",
    dialog: false,
    dialogDelete: false,
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
    editedIndex: -1,
    editedItem: {
      nama: "",
      jumlah: 0,
    },
    defaultItem: {
      nama: "",
      jumlah: 0,
    },
  }),

  computed: {
    judulModal() {
      return this.editedIndex === -1 ? "Tambah Barang" : "Edit Barang";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.isi_tabel = [
        {
          nama: "Sari Roti",
          jumlah: 2,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.isi_tabel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.isi_tabel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.isi_tabel.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.isi_tabel[this.editedIndex], this.editedItem);
      } else {
        this.isi_tabel.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
