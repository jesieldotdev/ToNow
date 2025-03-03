type TaskState = {
    items: TaskItem[]
    selectedItemIndex: number;
    searchText: string;
    filter: {
      Task: {
        filter: SearchFilter<TaskItem>;
        data: PaginatedResponse<TaskItem>;
      };
    };
  
    TaskModalTable: boolean
  }
  
  type TaskItem = {
    time: Time;
    title: string;
    description: string;
    participants?: string[] | undefined;
    color?: {primary: string; secondary: string}
}