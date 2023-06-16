<script setup>

</script>
<template>
  <div class="messagesView">
    <div class="messagesView__container">
      <div
        class="messagesView__cardChat"
        v-for="(message, index) in 10"
        :key="index"
      >
        <div class="messagesView__cardChat-img"></div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        <!-- <div class="messagesView__cardChat-info">
          <div class="messagesView__cardChat-userName">Diego velez</div>
          <div class="messagesView__cardChat-text">Hola, Soy un acosador dame tu alma </div>
        </div> -->
        
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.messagesView{
  display: flex;
  justify-content: center;
  
  &__container{    
    display: flex;
    flex-direction: column;   
    gap: 10px;
  }
  
  
  &__cardChat{
    border: 1px solid #5e5e5ec9;
    border-radius: 10px;    
    padding: 10px;
    height: 40px;

  }
}
</style>
