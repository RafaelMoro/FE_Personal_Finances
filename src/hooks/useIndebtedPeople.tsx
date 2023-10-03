import { useState } from 'react';
import { IndebtedPeople } from '../globalInterface';
import { ModalAction } from '../aliasType';

const useIndebtedPeople = () => {
  const [indebtedPeople, setIndebtedPeople] = useState<IndebtedPeople []>([]);
  const [personToModify, setPersonToModify] = useState<IndebtedPeople | null>(null);
  const [action, setAction] = useState<ModalAction>('Create');

  const addIndebtedPerson = (indebtedPerson: IndebtedPeople):void => {
    setIndebtedPeople([...indebtedPeople, indebtedPerson]);
  };

  /** Method used when a record is to be edited, the indebted people has to be filled down. */
  const addIndebtedPeopleForEdit = (indebtedPeopleReceived: IndebtedPeople[]):void => {
    setIndebtedPeople(indebtedPeopleReceived);
  };

  const updateIndebtedPerson = (indebtedPerson: IndebtedPeople):void => {
    const personExist = indebtedPeople.find((person) => person.name === indebtedPerson.name);
    if (personExist) {
      const filteredData = indebtedPeople.filter((person) => person.name !== personExist.name);
      setIndebtedPeople([...filteredData, indebtedPerson]);
    }
  };

  const deleteIndebtedPerson = (personName: string) => {
    const filteredPeople = indebtedPeople.filter((person) => person.name !== personName);
    setIndebtedPeople(filteredPeople);
  };

  const [modal, setModal] = useState<boolean>(false);
  const openModal = () => setModal(true);
  const closeModal = () => {
    setAction('Create');
    setPersonToModify(null);
    setModal(false);
  };

  const fetchPersonToModify = (personName: string) => {
    setAction('Modify');
    const person = indebtedPeople.find((indebtedPerson) => indebtedPerson.name === personName);
    setPersonToModify(person ?? null);
    openModal();
  };

  return {
    modal,
    openModal,
    closeModal,
    indebtedPeople,
    addIndebtedPerson,
    addIndebtedPeopleForEdit,
    deleteIndebtedPerson,
    updateIndebtedPerson,
    personToModify,
    fetchPersonToModify,
    action,
  };
};

export { useIndebtedPeople };
