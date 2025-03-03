export const initialEventState = (): EventState=>(
    {
      items: [
        { time: "7:00 AM", title: "Wakeup", description: "Early wakeup from bed and fresh" },
        { time: "8:00 AM", title: "Morning Exercise", description: "4 types of exercise" },
        {
          time: "9:00 AM",
          title: "Meeting",
          description: "Zoom call, Discuss team task for the day",
          participants: ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍💻"]
        },
        { time: "10:00 AM", title: "Breakfast", description: "Morning breakfast with bread, banana, egg bowl and tea." }
      ],
      EventModalTable: false,
      selectedItemIndex: -1,
      searchText: '',
      filter: {
        Event: {
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