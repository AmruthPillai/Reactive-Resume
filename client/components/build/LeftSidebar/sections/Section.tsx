import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ListItem } from '@reactive-resume/schema';
import clsx from 'clsx';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import { validate } from 'uuid';

import Heading from '@/components/shared/Heading';
import List from '@/components/shared/List';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModalName, setModalState } from '@/store/modal/modalSlice';
import { duplicateItem } from '@/store/resume/resumeSlice';

import SectionSettings from './SectionSettings';

type Props = {
  path: `sections.${string}`;
  name?: string;
  titleKey?: string;
  subtitleKey?: string;
  isEditable?: boolean;
  isHideable?: boolean;
  isDeletable?: boolean;
};

const Section: React.FC<Props> = ({
  path,
  name = 'Section Name',
  titleKey = 'title',
  subtitleKey = 'subtitle',
  isEditable = false,
  isHideable = false,
  isDeletable = false,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const heading = useAppSelector<string>((state) => get(state.resume, `${path}.name`, name));
  const visibility = useAppSelector<boolean>((state) => get(state.resume, `${path}.visible`, true));

  const handleAdd = () => {
    const id = path.split('.')[1];
    const modal: ModalName = validate(id) ? 'builder.sections.custom' : `builder.${path}`;

    dispatch(setModalState({ modal, state: { open: true, payload: { path } } }));
  };

  const handleEdit = (item: ListItem) => {
    const id = path.split('.')[1];
    const modal: ModalName = validate(id) ? 'builder.sections.custom' : `builder.${path}`;
    const payload = validate(id) ? { path, item } : { item };

    dispatch(setModalState({ modal, state: { open: true, payload } }));
  };

  const handleDuplicate = (item: ListItem) => dispatch(duplicateItem({ path: `${path}.items`, value: item }));

  return (
    <>
      <Heading path={path} name={name} isEditable={isEditable} isHideable={isHideable} isDeletable={isDeletable} />

      <List
        path={`${path}.items`}
        titleKey={titleKey}
        subtitleKey={subtitleKey}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        className={clsx({ 'opacity-50': !visibility })}
      />

      <footer className="flex items-center justify-between">
        <SectionSettings path={path} />

        <Button variant="outlined" startIcon={<Add />} onClick={handleAdd}>
          {t<string>('builder.common.actions.add', { token: heading })}
        </Button>
      </footer>
    </>
  );
};

export default Section;
