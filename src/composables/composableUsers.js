import { ref, readonly, onMounted, onUnmounted } from 'vue';

export function useAsync() {
  const items = ref([])
  const loading = ref(false)
  const page = ref(1)
  const perPage = ref(10)
  const totalItems = ref(100)

  onMounted(() => {

  })
  const loadItems = () => {
    loading.value = true;    
    setTimeout(() => {
      const startIndex = (page.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      for (let i = startIndex; i < endIndex; i++) {
        items.value.push({
          id: i,
          text: 'Elemento ' + i,
        });
      }
      loading.value = false;
      page.value++;
    }, 1000);
  }
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    if (scrollPosition >= pageHeight && !loading.value && items.value.length < totalItems.value) {
      loadItems.value();
    }
  }


  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  })
  return {
    makeRequest
  };
}