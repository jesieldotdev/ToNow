export const initialEventState = (): EventState=>(
    {
      items: [],
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