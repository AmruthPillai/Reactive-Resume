import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import clsx from 'clsx';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import { ListItem, Section as SectionRecord, SectionType } from 'schema';
import { validate } from 'uuid';

import Heading from '@/components/shared/Heading';
import List from '@/components/shared/List';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModalName, setModalState } from '@/store/modal/modalSlice';
import { duplicateItem, duplicateSection } from '@/store/resume/resumeSlice';

import SectionSettings from './SectionSettings';

type Props = {
  path: `sections.${string}`;
  type?: SectionType;
  name?: string;
  titleKey?: string;
  subtitleKey?: string;
  isEditable?: boolean;
  isHideable?: boolean;
  isDeletable?: boolean;
  addMore?: boolean;
  isDuplicated?: boolean;
};

const Section: React.FC<Props> = ({
  path,
  name = 'Section Name',
  type = 'basic',
  titleKey = 'title',
  subtitleKey = 'subtitle',
  isEditable = false,
  isHideable = false,
  isDeletable = false,
  addMore = false,
  isDuplicated = false,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const heading = useAppSelector<string>((state) => get(state.resume.present, `${path}.name`, name));
  const visibility = useAppSelector<boolean>((state) => get(state.resume.present, `${path}.visible`, true));

  const handleAdd = () => {
    const modal: ModalName = `builder.sections.${type}`;

    dispatch(setModalState({ modal, state: { open: true, payload: { path } } }));
  };

  const handleEdit = (item: ListItem) => {
    const id = path.split('.')[1];
    let modal: ModalName = validate(id) ? 'builder.sections.custom' : `builder.${path}`;

    const payload = validate(id) ? { path, item } : { item };

    if (isDuplicated) {
      modal = `builder.sections.${type}`;
      payload.path = path;
    }

    dispatch(setModalState({ modal, state: { open: true, payload } }));
  };

  const handleDuplicate = (item: ListItem) => dispatch(duplicateItem({ path: `${path}.items`, value: item }));

  const handleDuplicateSection = () => {
    const newSection: SectionRecord = {
      name: `${heading}`,
      type: type,
      visible: true,
      columns: 2,
      items: [],
      isDuplicated: true,
    };

    dispatch(duplicateSection({ value: newSection, type }));
  };

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
          {t('builder.common.actions.add', {
            token: t(`builder.leftSidebar.${path}.heading`, { defaultValue: heading }),
          })}
        </Button>
      </footer>

      {addMore ? (
        <div className="py-6 text-right">
          <Button fullWidth variant="outlined" startIcon={<Add />} onClick={handleDuplicateSection}>
            {t('builder.common.actions.duplicate')}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Section;
