<template>
  <Transition name="modal">
    <div  class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">

            </slot>
            <button
                class="modal-default-button"
                @click="show_modal = false,show_success_modal=false,show_fail_modal=false"
            >OK</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {useModalStore} from "@/stores/modalStore.ts";
import {toRefs} from "vue";

const useStore = useModalStore()

const {show_modal,show_success_modal,show_fail_modal} = toRefs(useStore);

</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  variant:outlined;
  width: 450px;
  height: 180px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgb(33, 33, 33);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  margin-top: 0;
  color: #fff;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  width: 50px;
  float: right;
  border:1px solid #fff;
  padding: 5px;
  border-radius: 5px;
}

.modal-default-button:hover{
  background-color: #fff;
  color: rgb(33, 33, 33);
}


.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>