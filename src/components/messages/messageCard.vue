<script setup>
import { ref } from 'vue';

const props = defineProps(["message", "idx", "media"]);
const messages =  ref(this.message);

const yes=  "--dato:#f0f0f0; --raius:0 10px 10px 10px;"
const  not = "--dato:rgba(189, 9, 9, 0.05); --raius:10px 0 10px 10px;"
const  center=  "--dato:#d9fdd3; --raius:10px; --center:center;"
const  options= { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h12" }

     const validPosition = () =>{
       if (this.message?.type && this.message?.type !== "helpMessage") return this.center;
       if (this.idx) return this.yes;
       return this.not;
     }
     const validtype = () =>{
       if (this.message?.type && this.message?.type !== "helpMessage") return "center";
       if (this.idx) return "";
       return "left";
     }
    const  validTextPisition = () =>{
       if (this.message?.type && this.message?.type !== "helpMessage") return "messageDefault__content-date-center";
       if (!this.idx) return "messageDefault__content-date-left";
       return "";
     }

 };
</script>
<template>
  <div class="messageDefault" :style="validPosition()" v-if="messages.idUser">
    <div class="messageDefault__container" :class="validtype()">
      <avatar
        v-show="idx"
        class="messageDefault__avatar"
        :user="messages.idUser"
      ></avatar>
      <div class="messageDefault__content">
        <p class="messageDefault__content-text">
          {{ messages.description }}
        </p>
        <p
          class="messageDefault__seeMedia"
          v-if="message.files[0]"
          @click="media(message.files)"
        >
          <iconic name="eye"></iconic>
          Multimedia
        </p>
      </div>
      <avatar
        v-show="!idx"
        class="messageDefault__avatar"
        :user="messages.idUser"
      ></avatar>
    </div>
    <div></div>
    <p :class="['messageDefault__content-date', validTextPisition()]">
      <strong class="messageDefault__userName p">{{
        messages.idUser.user
      }}</strong>
      <strong class="p2">{{
        messages.date ? $global.dateLocaleFormat(messages.date, options) : ""
      }}</strong>
    </p>
  </div>
</template>

<style lang="scss">
.messageDefault {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  &__container {
    display: flex;
    align-items: center;
  }
  &__seeMedia {
    background-color: rgba(208, 188, 188, 0.35);
    margin: 5px 2px 0;
    width: 110px;
    padding: 5px;
    border-radius: 5px;
    white-space: nowrap;
    cursor: pointer;
    color: black;
    font-size: 14px;
    font-weight: bold;
    &:hover {
      background-color: #dec2c2;
    }
  }
  &__userName {
    margin-left: 15px;
  }
  &__content {
    background-color: var(--dato);
    padding: 5px;
    border-radius: var(--raius);
    &-date {
      .p {
        font-size: 15px;
        text-transform: capitalize;
      }
      .p2 {
        font-size: 12px;
        padding: 4px;
        color: #8c8c8c;
      }

      &-left {
        display: flex;
        justify-content: flex-end;
      }
      &-center {
        display: flex;
        justify-content: center;
      }
    }
    &-icon {
      margin-right: 5px;
      color: black;
      &:hover {
        color: $primary-color;
      }
    }
  }
  &-text {
    font-size: 14px;
    color: #9d9d9d;
    margin-bottom: 5px;
  }
  &__avatar {
    width: 38px;
    height: 38px;
    min-width: 38px;
    min-height: 38px;
    margin: 5px 10px;
  }
  &-file {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
}
.left {
  justify-content: flex-end;
}
.center {
  justify-content: center;
}
</style>
