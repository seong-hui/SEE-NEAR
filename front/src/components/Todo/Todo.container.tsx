import Todo from "@/components/Todo/Todo";
import { useState, useEffect } from "react";
import { axiosEventsCheck } from "@/api/axios/axiosCustom";
import dummyTodos from "@/assets/data/dummyTodos";
interface TodoContainerProps {
  selectedDate: string;
}

interface EventsCheckResponse {
  id: number;
  title: string;
  location: string;
  datetime: string;
}

const TodoContainer = ({ selectedDate }: TodoContainerProps) => {
  // const [todos, setTodos] = useState<EventsCheckResponse[]>([]);
  const [todos, setTodos] = useState(dummyTodos);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  const fetchEvents = async () => {
    try {
      const response = await axiosEventsCheck(selectedDate);
      setTodos(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <Todo
      todos={todos}
      handleAddClick={handleAddClick}
      handleCloseModal={handleCloseModal}
      showAddModal={showAddModal}
    />
  );
};
export default TodoContainer;
