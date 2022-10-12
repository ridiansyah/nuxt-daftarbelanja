<template>
  <div>
    <v-toolbar flat>
      <v-btn icon class="hidden-xs-only" @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn-toggle borderless>
        <v-btn
          :disabled="zoomLevel === 0 ? true : false"
          @click="zoomLevel -= 10"
        >
          <v-icon> mdi-magnify-minus</v-icon>
        </v-btn>

        <v-btn @click="zoomLevel += 10">
          <v-icon> mdi-magnify-plus </v-icon>
        </v-btn>
      </v-btn-toggle>
      &nbsp;
      <v-btn-toggle borderless>
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
      :style="pdfStyle"
      @mousedown="onMouseDown"
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
    zoomLevel: 100,
    pdfDrag: {
      posX: null,
      posY: null,
      position: "absolute",
      initialMouseX: null,
      initialMouseY: null,
      startX: null,
      startY: null,
      dx: null,
      dy: null,
    },
  }),
  computed: {
    pdfStyle() {
      return {
        width: `${this.zoomLevel}%`,
        top: `${this.pdfDrag.posY}px`,
        left: `${this.pdfDrag.posX}px`,
        position: this.pdfDrag.position,
        cursor: "pointer",
      };
    },
  },
  methods: {
    onMouseDown(e) {
      this.pdfDrag.startX = e.target.offsetLeft;
      this.pdfDrag.startY = e.target.offsetTop;
      this.pdfDrag.initialMouseX = e.clientX;
      this.pdfDrag.initialMouseY = e.clientY;
      this.$el.addEventListener("mousemove", this.onMouseMove);
      this.$el.addEventListener("mouseup", this.onMouseUp);

      return false;
    },
    onMouseMove(e) {
      this.pdfDrag.dx = e.clientX - this.pdfDrag.initialMouseX;
      this.pdfDrag.dy = e.clientY - this.pdfDrag.initialMouseY;
      this.pdfDrag.posX = this.pdfDrag.startX + this.pdfDrag.dx;
      this.pdfDrag.posY = this.pdfDrag.startY + this.pdfDrag.dy;
      return false;
    },
    onMouseUp() {
      this.$el.removeEventListener("mousemove", this.onMouseMove);
      this.$el.removeEventListener("mouseup", this.onMouseUp);
    },
  },
  mounted() {
    this.$el.addEventListener("mousedown", this.onMouseDown);
  },
};
</script>
