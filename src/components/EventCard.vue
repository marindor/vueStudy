<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <!-- import RouterLink 관련 반입이 없어도 여기서 써지네... 신기하다.-->
  <!-- 중요한 것은 이렇게 태그를 붙이면 Dynamic Router 를 구현한 것이라는 거엇! -->
  <!--<RouterLink to="/event/123">--> <!-- 이 부분도 Dynamic 하게 바꿔야 한다.-->
    <!-- 그 해답이 defineProps() 이다. 즉 어떤 부모로부터 파라메터를 받아서 이 문자열을 바꿔야하 한다. -->
    <RouterLink class="event-link" :to="{name: 'event-details', params:{id:event.id}}">  <!-- :key 값을 받아서 route/index.js에 전달 -->
      <!--router의 index.js에서 :id가 dynamic segment라고 외웠다.-->
      <!-- :to 역시 Dynamic segment이다. 그 뒤에는 '경로'인데-->
      <!-- "{name: 'event-details'}"를 썼다는 것은 index.js의 routes 배열의 객체를 찾아가기 때문이다. -->
      <!-- to 속성의 논리는 route 객체배열에서 name을 찾아서 id라는 Dynamic segment에 event.id 값을 파라메터로 전달하겠다 라는 거엇!-->
    <div class="event-card">
      <h2>{{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.event-link{
  color:#324ecc;
  text-decoration: none;
  background: #ccb032; 
  /* 색을 보면  <RouterLink>의 영역이 뭔지 깨달을 것이다. */
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