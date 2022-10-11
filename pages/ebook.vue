<template>
  <div>
    <v-toolbar flat>
      <v-btn icon class="hidden-xs-only" @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="icon" borderless>
        <v-btn
          :disabled="currentPage === 1 ? true : false"
          @click="currentPage -= 1"
        >
          <v-icon left> mdi-arrow-left-bold </v-icon>
          <span class="hidden-sm-and-down">Previous Page</span>
        </v-btn>

        <v-btn
          :disabled="currentPage === totalPage ? true : false"
          @click="currentPage += 1"
        >
          <span class="hidden-sm-and-down">Next Page</span>

          <v-icon right> mdi-arrow-right-bold </v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-divider class="mx-4" inset vertical></v-divider>
      <v-toolbar-title class="font-weight-bold">Cheat Sheet</v-toolbar-title>
    </v-toolbar>
    <pdf
      src="/pdf/Nuxtjs-Cheat-Sheet.pdf"
      @num-pages="pageCount = $event"
      :page="currentPage"
      :style="`width: ${zoomLevel}`"
    >
    </pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  name: "EBookPage",
  components: {
    pdf,
  },
  data: () => ({
    currentPage: 1,
    totalPage: 3,
    zoomLevel: "100%",
  }),
};
</script>
