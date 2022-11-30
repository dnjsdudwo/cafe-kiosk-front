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
                       @click="">
                  Button
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
      <add-menu-list></add-menu-list>
      <div style="position: absolute; bottom: 20px;">
        <v-btn variant="outlined" style="width: 150px; height: 50px;" @click="add_list.modal = true">상품추가</v-btn>
      </div>
    </v-container>
  </div>

</template>

<script setup>
import LoadingProgress from "./LoadingProgress.vue"
import CustomAlert from '@/components/CustomAlert.vue'
import AddMenuList from "@/components/AddMenuList.vue";
import {useModalStore} from "@/stores/modalStore";

const modalStore = useModalStore();
let {add_list} = modalStore;

</script>
