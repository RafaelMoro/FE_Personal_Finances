import { useState } from 'react';
import { IndebtedPeople } from '../globalInterface';
import { AccountAction } from '../aliasType';

const useIndebtedPeople = () => {
  const [indebtedPeople, setIndebtedPeople] = useState<IndebtedPeople []>([]);
  const [personToModify, setPersonToModify] = useState<IndebtedPeople | null>(null);
  const [action, setAction] = useState<AccountAction>('Create');

  const addIndebtedPerson = (indebtedPerson: IndebtedPeople):void => {
    setIndebtedPeople([...indebtedPeople, indebtedPerson]);
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
    deleteIndebtedPerson,
    updateIndebtedPerson,
    personToModify,
    fetchPersonToModify,
    action,
  };
};

export { useIndebtedPeople };
