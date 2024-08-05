import Todo from "@/components/Todo/Todo";
import { useState } from "react";
import { EventDto } from "@/dto/dto";
import { useGetEvents } from "@/api/query/reactQuery";
import { useEventsDelete } from "@/api/query/reactQuery";
interface TodoContainerProps {
  selectedDate: string;
}

const TodoContainer = ({ selectedDate }: TodoContainerProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: todos = [], error, isError } = useGetEvents(selectedDate);
  if (isError) {
    console.error(error);
  }

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const [selectedTodo, setSelectedTodo] = useState<EventDto | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTodo(null);
  };

  const handleTodoClick = (todo: EventDto) => {
    setSelectedTodo(todo);
    setShowDetailModal(true);
  };

  const { mutate: deleteEvent } = useEventsDelete(handleCloseDetailModal);

  const handleDeleteEvent = (data: EventDto) => {
    deleteEvent(data);
  };

  const sortedTodos = todos.sort((a, b) => {
    return a.datetime.localeCompare(b.datetime);
  });
  return (
    <Todo
      todos={sortedTodos}
      handleAddClick={handleAddClick}
      handleCloseModal={handleCloseModal}
      showAddModal={showAddModal}
      selectedTodo={selectedTodo}
      handleCloseDetailModal={handleCloseDetailModal}
      handleTodoClick={handleTodoClick}
      showDetailModal={showDetailModal}
      selectedDate={selectedDate}
      handleDeleteEvent={handleDeleteEvent}
    />
  );
};
export default TodoContainer;
