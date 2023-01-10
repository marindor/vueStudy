import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailsView from '../views/EventDetailsView.vue'//component 경로와 객체 반입
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //이번에 새로 만듦
      //path: '/event/123', //라우터 경로. 이 자리를 Dynamic하게 세팅하고자 한다. EventCard.vue로 가봐.
      path: '/event/:id', // 이와 같이 URL에 :id 로 표기하는 것을 "Dynamic Segment"라고 한다.(용어 및 표기법 암기)
      //결국 그 해답은 defineProps() 이다. 즉 어떤 부모로부터 파라메터를 받아서 이 문자열을 바꿔야하 한다.
      //결국은 EventCard.vue에서 defineProps()를 설정해서 어떤 부모로부터 경로를 받아야한다. /123, /456, /789 를 말이다.
      name: 'event-details', //라우터 이름 새로 만듦
      component: EventDetailsView, //위에서 객체 반입한 것을 가져다 씀
      props : true, //이제 이 라우터는 prop으로 parameter를 받겠다.
    },    
    {
      path: '/',
      name: 'event-list',  
      // App.vue에서 name으로 경로를 찾게 했다.
      component: EventListView,
    },
    {
      path: '/about',
      name: 'about',
      // App.vue에서 name으로 경로를 찾게 했다.
      component: AboutView,
    },
  ],
})

export default router


// [핵심 정리 : 파악하느라 힘들었다.]
// 1. route/index.js : 
// - dynamic segment로 가변 url 설정
// - /에 EventListView 로 바로가기 되어 있음

// 2. EventListView.vue 는 <EventCard>태그를 가져와서 3번을 뿌림
// - 이 때 :key='event.id'로 각 EventCard에 다른 component에서 참고할 수 있는 값을 남김

// 3. 각 EventCard는 <RouterLink>를 가지고 있음.
// - 즉, <EventCard>태그 자체가는 <a>처럼 클릭이 가능해졌음.
// - 각 EventCard는 key를 통해 id를 가지고 있으므로 클릭시 그 값을 router/index.js가 경로를 알게함

// 4. EventCard 클릭시 router/index.js로 인해 EventDetailsView.vue를 <RouterView /> 이 자리에 뿌림
// - 이 때 defineProps()로 id값을 받아서 getEvent(props.id)를 통해 json 서버에 데이터 요청
// - 이 때 getEvent는 /services/EventService.js에서 가져옴.
// - 이제 axios의 .then으로 응답을 받은 후에야
// - <template>을 뿌림 

// 5. 이것이 Dynamic Routing의 과정임