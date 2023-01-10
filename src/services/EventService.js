import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id) {
    //이번에 새로 만든 함수
    //함수명 끝에 s를 뺐다. 매개변수에 id 추가함.
    return apiClient.get('/events/' + id)
  },
}
//와~ export default에 함수가 2개 들어갈 수 있구나.
//그래서 export default가 {} 객체로 싸는구나.
//신기하네~


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