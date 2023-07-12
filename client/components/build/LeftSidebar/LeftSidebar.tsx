import { Add, Star } from '@mui/icons-material';
import { Button, Divider, IconButton, SwipeableDrawer, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { ReactComponentElement, useMemo } from 'react';
import { Section as SectionRecord } from 'schema';
import { validate } from 'uuid';

import Icon from '@/components/shared/Icon';
import { getCustomSections, getSectionsByType, left } from '@/config/sections';
import { setSidebarState } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addSection } from '@/store/resume/resumeSlice';

import styles from './LeftSidebar.module.scss';
import Section from './sections/Section';

const LeftSidebar = () => {
  const theme = useTheme();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const sections = useAppSelector((state) => state.resume.present.sections);

  const { open } = useAppSelector((state) => state.build.sidebar.left);

  const customSections = useMemo(() => getCustomSections(sections), [sections]);

  const handleOpen = () => dispatch(setSidebarState({ sidebar: 'left', state: { open: true } }));

  const handleClose = () => dispatch(setSidebarState({ sidebar: 'left', state: { open: false } }));

  const handleClick = (id: string) => {
    const elementId = validate(id) ? `#section-${id}` : `#${id}`;
    const section = document.querySelector(elementId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddSection = () => {
    const newSection: SectionRecord = {
      name: 'Custom Section',
      type: 'custom',
      visible: true,
      columns: 2,
      items: [],
    };

    dispatch(addSection({ value: newSection, type: 'custom' }));
  };

  const sectionsList = () => {
    const sectionsComponents: Array<ReactComponentElement<any>> = [];

    for (const item of left) {
      const id = (item as any).id;
      const component = (item as any).component;
      const type = component.props.type;
      const addMore = !!component.props.addMore;

      sectionsComponents.push(
        <section key={id} id={id}>
          {component}
        </section>,
      );

      if (addMore) {
        const additionalSections = getSectionsByType(sections, type);
        const elements = [];
        for (const element of additionalSections) {
          const newId = element.id;

          const props = cloneDeep(component.props);
          props.path = 'sections.' + newId;
          props.name = element.name;
          props.isDeletable = true;
          props.addMore = false;
          props.isDuplicated = true;
          const newComponent = React.cloneElement(component, props);

          elements.push(
            <section key={newId} id={`section-${newId}`}>
              {newComponent}
            </section>,
          );
        }
        sectionsComponents.push(...elements);
      }
    }

    return sectionsComponents;
  };

  return (
    <SwipeableDrawer
      open={open}
      anchor="left"
      onOpen={handleOpen}
      onClose={handleClose}
      PaperProps={{ className: '!shadow-lg' }}
      variant={isDesktop ? 'persistent' : 'temporary'}
    >
      <div className={styles.container}>
        <nav className="overflow-y-auto">
          <div>
            <Link href="/dashboard">
              <IconButton>
                <Icon size={24} />
              </IconButton>
            </Link>
            <Divider />
          </div>

          <div className={styles.sections}>
            {left.map(({ id, icon }) => (
              <Tooltip
                arrow
                key={id}
                placement="right"
                title={t(`builder.leftSidebar.sections.${id}.heading`, get(sections, `${id}.name`))}
              >
                <IconButton onClick={() => handleClick(id)}>{icon}</IconButton>
              </Tooltip>
            ))}

            {customSections.map(({ id }) => (
              <Tooltip
                key={id}
                title={t(`builder.leftSidebar.sections.${id}.heading`, get(sections, `${id}.name`))}
                placement="right"
                arrow
              >
                <IconButton onClick={() => id && handleClick(id)}>
                  <Star />
                </IconButton>
              </Tooltip>
            ))}
          </div>

          <div />
        </nav>

        <main>
          {sectionsList()}

          {customSections.map(({ id }) => (
            <section key={id} id={`section-${id}`}>
              <Section path={`sections.${id}`} type="custom" isEditable isHideable isDeletable />
            </section>
          ))}

          <div className="py-6 text-right">
            <Button fullWidth variant="outlined" startIcon={<Add />} onClick={handleAddSection}>
              {t('builder.common.actions.add', {
                token: t('builder.leftSidebar.sections.section.heading'),
              })}
            </Button>
          </div>
        </main>
      </div>
    </SwipeableDrawer>
  );
};

export default LeftSidebar;
