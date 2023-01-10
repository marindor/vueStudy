<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Events</RouterLink> |   <!--분명 위에서 vue-router로 RouterLink를 반입했다.-->
          <RouterLink to="/about">About</RouterLink> <!-- 그래서 ROuterLink 태그를 쓸 수 있는거라 생각했어-->
          <!-- 근데 EventCard.vue를 가도 <RouterLink>를 쓸 수 있네. import 없어도 말이야.. 가서 봐바 -->
            <br/>
          <RouterLink :to="{name : 'event-list'}">Events</RouterLink> :::
          <RouterLink :to="{name : 'about'}">About</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView /> <!-- 이놈이 RouterLink를 클릭했을 해당 Router component를 뿌리는 역할을 한다.-->
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}
</style>

<!-- [핵심 정리 : 파악하느라 힘들었다.]
1. route/index.js : 
- dynamic segment로 가변 url 설정
- /에 EventListView 로 바로가기 되어 있음

2. EventListView.vue 는 <EventCard>태그를 가져와서 3번을 뿌림
- 이 때 :key='event.id'로 각 EventCard에 다른 component에서 참고할 수 있는 값을 남김

3. 각 EventCard는 <RouterLink>를 가지고 있음.
- 즉, <EventCard>태그 자체가는 <a>처럼 클릭이 가능해졌음.
- 각 EventCard는 key를 통해 id를 가지고 있으므로 클릭시 그 값을 router/index.js가 경로를 알게함

4. EventCard 클릭시 router/index.js로 인해 EventDetailsView.vue를 <RouterView /> 이 자리에 뿌림
- 이 때 defineProps()로 id값을 받아서 getEvent(props.id)를 통해 json 서버에 데이터 요청
- 이 때 getEvent는 /services/EventService.js에서 가져옴.
- 이제 axios의 .then으로 응답을 받은 후에야
- <template>을 뿌림 

5. 이것이 Dynamic Routing의 과정임 -->