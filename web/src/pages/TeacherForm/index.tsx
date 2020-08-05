import React from 'react';

import { Container } from './styles';
import PageHeader from '../../components/PageHeader';

const TeacherForm: React.FC = () => {
  return (
    <Container className="container">
      <PageHeader title="Que incrível que você quer dar aulas." />
    </Container>
  );
};

export default TeacherForm;
