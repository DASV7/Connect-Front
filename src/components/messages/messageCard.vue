<script setup>
import { ref, onMounted } from "vue";
import AvatarUser from "../shared/avatarUser.vue";

const props = defineProps(["message", "idx", "media", "user"]);

const yes = "--dato:#f0f0f0;  --raius:10px 0 10px 10px;";
const not = "--dato:rgb(237 7 7 / 35%); --raius:0 10px 10px 10px;";
const center = "--dato:#d9fdd3; --raius:10px; --center:center;";

onMounted(() => {
  const date = new Date(props.message.date);

  // Obtener los componentes de la fecha
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Los meses en JavaScript comienzan en 0, por eso se suma 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Formatear los componentes en un string
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  // console.log(formattedDate);
  props.message.date = formattedDate;
});

const validPosition = () => {
  if (props.idx == "vincMessage") return center;
  if (props.idx == true) return yes;
  return not;
};

const validtype = () => {
  if (props.idx) return "left";
  return "";
};

const validTextPisition = () => {
  if (props.idx == "vincMessage") return "messageDefault__content-date-center";
  if (props.idx) return "messageDefault__content-date-left";
  return "";
};
</script>

<template>
  <div class="messageDefault" :style="validPosition()" v-if="props?.message?.sender">
    <div class="messageDefault__container" :class="validtype()">
      <AvatarUser v-show="!props.idx" :user="props.user" :size="30"></AvatarUser>
      <div class="messageDefault__content">
        <p class="messageDefault__content-text">
          {{ props.message.message }}
        </p>
      </div>
      <AvatarUser v-show="props.idx" class="messageDefault__avatar" :user="props.user" :size="30"></AvatarUser>
    </div>

    <div></div>
    <p :class="['messageDefault__content-date', validTextPisition()]">
      <strong class="messageDefault__userName p">{{ props.user.name }}</strong>
      <strong class="p2">{{ props.message.date }}</strong>
    </p>
  </div>
</template>

<style lang="scss">
.messageDefault {
  padding: 5px 10px;
  border-radius: 5px;

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
