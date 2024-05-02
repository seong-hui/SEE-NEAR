import Todo from "@/components/Todo/Todo";
interface TodoContainerInterface {
  selectedDate: string;
}

const TodoContainer = ({ selectedDate }: TodoContainerInterface) => {
  return <Todo />;
};
export default TodoContainer;
