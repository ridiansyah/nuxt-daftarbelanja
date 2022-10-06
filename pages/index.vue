<template>
  <v-data-table
    :headers="judulTabel"
    :items="isiTabel"
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
                  required
                  :error-messages="namaErrors"
                  @input="$v.editedItem.nama.$touch()"
                  @blur="$v.editedItem.nama.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model.number="editedItem.jumlah"
                  label="Jumlah Barang"
                  required
                  :error-messages="jumlahErrors"
                  @input="$v.editedItem.jumlah.$touch()"
                  @blur="$v.editedItem.jumlah.$touch()"
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
      </v-toolbar>
    </template>

    <template #[`item.aksi`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data> </template>
  </v-data-table>
</template>

<script>
import { required, integer } from "vuelidate/lib/validators";
export default {
  data: () => ({
    judul: "DAFTAR BELANJA",
    cari: "",
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      nama: "",
      jumlah: "",
    },
    defaultItem: {
      nama: "",
      jumlah: "",
    },
  }),

  validations: {
    editedItem: {
      nama: { required },
      jumlah: { required, integer },
    },
  },

  computed: {
    judulModal() {
      return this.editedIndex === -1 ? "Tambah Barang" : "Edit Barang";
    },
    isiTabel() {
      return [...this.$store.get("isi_tabel")];
    },
    judulTabel() {
      return [...this.$store.get("judul_tabel")];
    },

    namaErrors() {
      const errors = [];
      console.log("log: ", this.$v);
      if (!this.$v.editedItem.nama.$dirty) return errors;
      !this.$v.editedItem.nama.required &&
        errors.push("Nama tidak boleh kosong!");
      return errors;
    },
    jumlahErrors() {
      const errors = [];
      if (!this.$v.editedItem.jumlah.$dirty) return errors;
      !this.$v.editedItem.jumlah.required &&
        errors.push("Jumlah tidak boleh kosong!");
      !this.$v.editedItem.jumlah.integer && errors.push("Jumlah harus angka!");
      return errors;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.isiTabel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.isiTabel.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.$swal({
        text: `Kamu yakin akan menghapus barang ini?`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.value) {
          let temp = this.isiTabel;
          temp.splice(this.editedIndex, 1);
          this.$store.set("setIsiTabel", temp);
          this.closeDelete();
        }
      });
    },

    close() {
      this.$v.$reset();
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
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.editedIndex > -1) {
          let temp = this.isiTabel.map((obj) => ({
            ...obj,
          }));
          Object.assign(temp[this.editedIndex], this.editedItem);
          this.$store.set("setIsiTabel", temp);
        } else {
          this.isiTabel.push(this.editedItem);
          this.$store.set("setIsiTabel", this.isiTabel);
        }
        this.close();
      }
    },
  },
};
</script>
