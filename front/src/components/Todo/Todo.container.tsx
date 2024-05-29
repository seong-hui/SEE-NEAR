import Todo from "@/components/Todo/Todo";
import { useState } from "react";
import { EventDto } from "@/dto/dto";
import { useGetEvents } from "@/api/query/reactQuery";
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

  return (
    <Todo
      todos={todos}
      handleAddClick={handleAddClick}
      handleCloseModal={handleCloseModal}
      showAddModal={showAddModal}
      selectedTodo={selectedTodo}
      handleCloseDetailModal={handleCloseDetailModal}
      handleTodoClick={handleTodoClick}
      showDetailModal={showDetailModal}
    />
  );
};
export default TodoContainer;
