type TaskState = {
    items: TaskItem[]
    selectedItemIndex: number;
    searchText: string;
    filter: {
      task: {
        filter: SearchFilter<TaskItem>;
        data: PaginatedResponse<TaskItem>;
      };
    };
  
    taskModalTable: boolean
  }
  
  type TaskItem = {
    time: Time;
    title: string;
    description: string;
    participants?: string[] | undefined;
    color?: {primary: string; secondary: string}
}