<script setup lang="ts">

</script>

<template>
  <div >
    <div id="error-message">
      <h1>
        Error 404: Page has not been found
      </h1>
      <p id="error-info">
        We cannot find the page. Are you sure the URL is correct?
      </p>
      <img id="detective" src="/detective.png" alt="detective looking for your page">
      <p id="running-url">
        Your URL
      </p>
    </div>
  </div>


</template>

<style scoped>

h1{
  width: 100%;
  margin: 0;
  padding-top: 10px;

}
p{
  margin: 0;
  padding: 0;
}

#error-message{
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
}



#running-url{
  animation: move-around 10s linear infinite;

}

#error-info{
  padding-top: 5px;
  padding-bottom: 30px;
}

#detective{
  width: 200px;
  margin-left:auto;
  margin-right:auto;
  filter: drop-shadow( 0 0 25px #FC0) drop-shadow( 0 0 50px green);
  animation: search-around 10s ease-in-out infinite;
}

@keyframes move-around {

  25%{
    transform: translate(250px) rotate(-180deg);
  }
  75%{
    transform: translateX(-250px) rotate(180deg);
  }



}

@keyframes search-around {

  25%{
    transform: translate(40px);
  }
  75%{
    transform: translateX(-40px) ;
  }

}
</style>