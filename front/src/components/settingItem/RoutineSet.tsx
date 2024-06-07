import styled from "styled-components";
import EditButtonImg from "@/assets/images/edit.svg";
import { useState } from "react";
import RoutineModal from "../modal/RoutineModal";
import {
  useRoutineCreate,
  useRoutineUpdate,
  useRoutineDelete,
} from "@/api/query/reactQuery";
import { RoutineDto } from "@/dto/dto";
import RoutineEditModal from "../modal/RoutineEditModal";

interface RoutineSetProps {
  routines: RoutineDto[];
}

const RoutineSet = ({ routines }: RoutineSetProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  const { mutate: AddRoutine } = useRoutineCreate(handleCloseModal);
  const { mutate: UpdateRoutine } = useRoutineUpdate(handleCloseEditModal);
  const { mutate: DeleteRoutine } = useRoutineDelete(handleCloseEditModal);

  const [isModalEditOpen, setModalEditOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<RoutineDto>();

  const handleAddRoutine = (data: RoutineDto) => {
    AddRoutine(data);
  };

  const handleUpdateRoutine = (data: RoutineDto) => {
    UpdateRoutine(data);
  };

  const handleDeleteRoutine = () => {
    if (selectedRoutine && selectedRoutine.id)
      DeleteRoutine(selectedRoutine.id);
  };

  const handleRoutineClick = (routine: RoutineDto) => {
    setSelectedRoutine(routine);
    setModalEditOpen(true);
  };

  return (
    <SettingItemLayout>
      <BoxTitle>대화 루틴</BoxTitle>
      <SettingBox>
        <EditButton onClick={handleOpenModal} />
        <Table>
          <thead>
            <tr>
              <Th>루틴명</Th>
              <Th>시각</Th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine, index) => (
              <tr key={index} onClick={() => handleRoutineClick(routine)}>
                <Td>{routine.name}</Td>
                <Td>{routine.time}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isModalOpen && (
          <RoutineModal onClose={handleCloseModal} onSave={handleAddRoutine} />
        )}
        {isModalEditOpen &&
          selectedRoutine?.name &&
          selectedRoutine.time &&
          selectedRoutine.id && (
            <RoutineEditModal
              onClose={handleCloseEditModal}
              onSave={handleUpdateRoutine}
              selectedRoutine={selectedRoutine}
              onDelete={handleDeleteRoutine}
            />
          )}
      </SettingBox>
    </SettingItemLayout>
  );
};

const SettingItemLayout = styled.div``;

const SettingBox = styled.div`
  width: 320px;
  height: 400px;
  border-radius: 15px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 0;
  position: relative;
`;

const EditButton = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;
  cursor: pointer;
  background: url(${EditButtonImg}) no-repeat center;
  border: none;
  width: 20px;
  height: 20px;
`;

const BoxTitle = styled.h2`
  font-size: 20px;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  color: #718ebf;
  font-weight: bold;
  padding: 15px;
  border-bottom: 0.8px solid #979ca5;
  font-size: 18px;
`;

const Td = styled.td`
  text-align: center;
  padding: 12px;
  cursor: pointer;
`;
export default RoutineSet;
