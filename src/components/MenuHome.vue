<template>
  <LoadingProgress :isView="isView"></LoadingProgress>
  <CustomAlert></CustomAlert>
  <div>
    <v-container>
      <h1>Event</h1>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col
            v-for="n in 1"
            :key="n"
            cols="12"
            sm="4"
        >
          <v-sheet class="ma-2 pa-2">
            <v-card
                class="mx-auto"
                max-width="400"
                variant="outlined"
            >
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">
                    OVERLINE
                  </div>
                  <div class="text-h6 mb-1">
                    Headline
                  </div>
                  <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
                </div>
              </v-card-item>

              <v-card-actions>
                <v-btn variant="outlined"
                       @click="click()">
                  Button
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script setup>
import {reactive, ref} from "vue";
import LoadingProgress from "./LoadingProgress.vue"
import CustomAlert from '@/components/CustomAlert.vue'
import {useMberStore} from "@/sotre/mberStore";

const test1 = useMberStore();

const { menu, userId, addMenu } = test1;

console.log(menu)

const isView = ref(false);
const tes  = ref("");

const click = () => {
  addMenu({
    name: 'ddd',
    isIce: false
  });

  console.log(menu)
}

const test = reactive({
  test1: 1,
  test2: 3
})

const testInput = () => {
  console.log(tes.value)
}

const testLoading = async () => {

  // isView.value = true;
  await alert();
}
</script>
