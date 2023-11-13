'use client';
import { Add, Star } from '@mui/icons-material';
import { Button, Divider, IconButton, SwipeableDrawer, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { ReactComponentElement, useMemo, useState } from 'react';
import { Section as SectionRecord } from 'schema';

import Section from '@/components/build/LeftSidebar/sections/Section';
import Icon from '@/components/shared/Icon';
import { getCustomSections, getSectionsByType, left } from '@/config/sections';
import { setSidebarState } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addSection } from '@/store/resume/resumeSlice';
import { resumePreviewScrollIntoView, sectionScrollIntoView } from '@/utils/editor';
import { v4 as uuidv4 } from 'uuid';

import styles from './SectionEditor.module.scss';
type SectionEditorProps = {
  currentSection?: string;
  setCurrentSection: Function;
};
const SectionEditor: React.FC<SectionEditorProps> = ({ currentSection, setCurrentSection }) => {
  const theme = useTheme();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const sections = useAppSelector((state) => state.resume.present.sections);
  const metadata = useAppSelector((state) => state.resume.present.metadata);

  const customSections = useMemo(() => getCustomSections(sections), [sections]);

  const handleAddSection = () => {
    const id = uuidv4();
    const newSection: SectionRecord = {
      name: 'Custom Section',
      type: 'custom',
      visible: true,
      columns: 2,
      items: [],
    };

    dispatch(addSection({ id, value: newSection, type: 'custom' }));
    setTimeout(() => {
      onMenuClick(id);
    }, 400);
  };

  const getCurrentSection = () => {
    let sectionsComponent: ReactComponentElement<any> = <></>;

    const item = left.find((x) => x.id === currentSection);
    if (item) {
      const id = (item as any).id;
      const component = (item as any).component;
      const type = component.props.type;
      const addMore = !!component.props.addMore;

      sectionsComponent = (
        <section key={id} id={id}>
          {component}
        </section>
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
      }
    } else {
      const customItem = customSections.find((x) => x.id === currentSection);
      if (customItem) {
        sectionsComponent = (
          <section key={customItem.id} id={`section-${customItem.id}`}>
            <Section path={`sections.${customItem.id}`} type="custom" isEditable isHideable isDeletable />
          </section>
        );
      }
    }

    return sectionsComponent;
  };

  const onMenuClick = (id?: string) => {
    if (id) {
      sectionScrollIntoView(id);
      setCurrentSection(id);
      if (isDesktop && metadata.template) {
        resumePreviewScrollIntoView(metadata.template, id);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <nav className="overflow-y-auto">
          <div className={styles.sections}>
            {left.map(({ id, icon }) => (
              <Tooltip
                arrow
                key={id}
                placement="right"
                title={t(`builder.leftSidebar.sections.${id}.heading`, get(sections, `${id}.name`))}
              >
                <IconButton onClick={() => onMenuClick(id)} color={id === currentSection ? 'secondary' : 'primary'}>
                  {icon}
                </IconButton>
              </Tooltip>
            ))}

            {customSections.map(({ id }) => (
              <Tooltip
                key={id}
                title={t(`builder.leftSidebar.sections.${id}.heading`, get(sections, `${id}.name`))}
                placement="right"
                arrow
              >
                <IconButton onClick={() => onMenuClick(id)} color={id === currentSection ? 'secondary' : 'primary'}>
                  <Star />
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </nav>

        <main>
          {getCurrentSection()}

          <div className="py-6 text-right">
            <Button fullWidth variant="outlined" startIcon={<Add />} onClick={handleAddSection}>
              {t('builder.common.actions.add', {
                token: t('builder.leftSidebar.sections.section.heading'),
              })}
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default SectionEditor;
