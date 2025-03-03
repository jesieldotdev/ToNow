export const initialTaskState = (): TaskState=>(
    {
      items: [
        {
          time: {
            hour: "07:00",
            date: {
              day: { label: "Mon", day: 4 },
              month: { label: "Mar", day: 3 },
              year: 2024,
              dayWeek: { value: 1, label: "Mon" },
            },
          },
          title: "Wakeup",
          description: "Early wakeup from bed and fresh",
          color: { primary: "#FF5722", secondary: "#FF8A65" },
        },
        {
          time: {
            hour: "08:00",
            date: {
              day: { label: "Mon", day: 4 },
              month: { label: "Mar", day: 3 },
              year: 2024,
              dayWeek: { value: 1, label: "Mon" },
            },
          },
          title: "Morning Exercise",
          description: "4 types of exercise",
          color: { primary: "#FF5722", secondary: "#FF8A65" },
        },
        {
          time: {
            hour: "09:00",
            date: {
              day: { label: "Mon", day: 4 },
              month: { label: "Mar", day: 3 },
              year: 2024,
              dayWeek: { value: 1, label: "Mon" },
            },
          },
          title: "Meeting",
          description: "Zoom call, Discuss team task for the day",
          participants: [
            "https://lifehacker.com/imagery/articles/01HF2GKNRQZ4MN1YA639Q53NQV/hero-image.fill.size_1200x675.png",
            "https://img.freepik.com/psd-gratuitas/renderizacao-3d-do-personagem-avatar_23-2150611765.jpg",
          ],
          color: { primary: "#FF5722", secondary: "#FF8A65" },
        },
        {
          time: {
            hour: "10:00",
            date: {
              day: { label: "Mon", day: 4 },
              month: { label: "Mar", day: 3 },
              year: 2024,
              dayWeek: { value: 1, label: "Mon" },
            },
          },
          title: "Breakfast",
          description: "Morning breakfast with bread, banana, egg bowl and tea.",
          color: { primary: "#FF5722", secondary: "#FF8A65" },
        },
      ],
      TaskModalTable: false,
      selectedItemIndex: -1,
      searchText: '',
      filter: {
        task: {
          filter: {
            page: 0,
            limit: 50,
            filter: [],
            orderBy: [],
          },
          data: {
            meta: {
              total: 0,
            },
            data: [],
          },
        },
      },
    }
  )