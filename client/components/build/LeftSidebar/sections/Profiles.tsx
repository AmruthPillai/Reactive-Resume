import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ListItem } from 'schema';

import Heading from '@/components/shared/Heading';
import List from '@/components/shared/List';
import { useAppDispatch } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { duplicateItem } from '@/store/resume/resumeSlice';

const Profiles = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(setModalState({ modal: 'builder.sections.profile', state: { open: true } }));
  };

  const handleEdit = (item: ListItem) => {
    dispatch(setModalState({ modal: 'builder.sections.profile', state: { open: true, payload: { item } } }));
  };

  const handleDuplicate = (item: ListItem) => {
    dispatch(duplicateItem({ path: 'basics.profiles', value: item }));
  };

  return (
    <>
      <Heading path="sections.profiles" name={t('builder.leftSidebar.sections.profiles.heading')} />

      <List
        path="basics.profiles"
        titleKey="username"
        subtitleKey="network"
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
      />

      <footer className="flex justify-end">
        <Button variant="outlined" startIcon={<Add />} onClick={handleAdd}>
          {t('builder.common.actions.add', {
            token: t('builder.leftSidebar.sections.profiles.heading', { count: 1 }),
          })}
        </Button>
      </footer>
    </>
  );
};

export default Profiles;
