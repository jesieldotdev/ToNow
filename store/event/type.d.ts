type EventState = {
    items: EventItem[]
    selectedItemIndex: number;
    searchText: string;
    filter: {
      Event: {
        filter: SearchFilter<EventItem>;
        data: PaginatedResponse<EventItem>;
      };
    };
  
    EventModalTable: boolean
  }
  
  type EventItem = {
    title: string;
    description: string;
    isHighlighted?: boolean
    time: string
    participants?: string[]
  }