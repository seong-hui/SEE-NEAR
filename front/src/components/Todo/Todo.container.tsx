import Todo from "@/components/Todo/Todo";
import { useState, useEffect } from "react";
import { axiosEventsCheck } from "@/api/axios/axiosCustom";
import dummyTodos from "@/assets/data/dummyTodos";
import { EventDto } from "@/dto/dto";
interface TodoContainerProps {
  selectedDate: string;
}

const TodoContainer = ({ selectedDate }: TodoContainerProps) => {
  // const [todos, setTodos] = useState<EventDto[]>([]);
  const [todos, setTodos] = useState(dummyTodos);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosEventsCheck(selectedDate);
        setTodos(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, [selectedDate]);

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
