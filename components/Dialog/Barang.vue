<template>
  <v-dialog v-model="modalBarang" max-width="500px">
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
            @input="validator.editedItem.nama.$touch()"
            @blur="validator.editedItem.nama.$touch()"
          ></v-text-field>
          <v-text-field
            v-model.number="editedItem.jumlah"
            label="Jumlah Barang"
            required
            :error-messages="jumlahErrors"
            @input="validator.editedItem.jumlah.$touch()"
            @blur="validator.editedItem.jumlah.$touch()"
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
</template>

<script>
export default {
  name: "DialogBarang",
  props: {
    judulModal: { type: String, default: "" },
    editedItem: { type: Object, default: () => {} },
    namaErrors: { type: Array, default: () => {} },
    jumlahErrors: { type: Array, default: () => {} },
    validator: { type: Object, default: () => {} },
    close: { type: Function, default: () => {} },
    save: { type: Function, default: () => {} },
  },
  computed: {
    modalBarang: {
      get() {
        return this.$store.get("modal_barang");
      },
      set(newValue) {
        this.$store.dispatch("setModalBarang", newValue);
      },
    },
  },
};
</script>
