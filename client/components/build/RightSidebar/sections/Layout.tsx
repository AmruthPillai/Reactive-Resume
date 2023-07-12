import { DragDropContext, Draggable, DraggableLocation, Droppable, DropResult } from '@hello-pangea/dnd';
import { Add, Close, Restore } from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';
import clsx from 'clsx';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';

import Heading from '@/components/shared/Heading';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addPage, deletePage, setResumeState } from '@/store/resume/resumeSlice';

import styles from './Layout.module.scss';

const getIndices = (location: DraggableLocation) => ({
  page: +location.droppableId.split('.')[0],
  column: +location.droppableId.split('.')[1],
  section: +location.index,
});

const Layout = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const layout = useAppSelector((state) => state.resume.present.metadata.layout);
  const resumeSections = useAppSelector((state) => state.resume.present.sections);

  const onDragEnd = (dropResult: DropResult) => {
    const { source: srcLoc, destination: destLoc } = dropResult;

    if (!destLoc) return;

    const newLayout = cloneDeep(layout);

    const srcIndex = getIndices(srcLoc);
    const destIndex = getIndices(destLoc);
    const section = layout[srcIndex.page][srcIndex.column][srcIndex.section];

    // Remove item at source
    newLayout[srcIndex.page][srcIndex.column].splice(srcIndex.section, 1);

    // Insert item at destination
    newLayout[destIndex.page][destIndex.column].splice(destIndex.section, 0, section);

    dispatch(setResumeState({ path: 'metadata.layout', value: newLayout }));
  };

  const handleAddPage = () => dispatch(addPage());

  const handleDeletePage = (page: number) => dispatch(deletePage({ page }));

  const handleResetLayout = () => {
    for (let i = layout.length - 1; i > 0; i--) {
      handleDeletePage(i);
    }
  };

  return (
    <>
      <Heading
        path="metadata.layout"
        name={t('builder.rightSidebar.sections.layout.heading')}
        action={
          <Tooltip title={t('builder.rightSidebar.sections.layout.tooltip.reset-layout')}>
            <IconButton onClick={handleResetLayout}>
              <Restore />
            </IconButton>
          </Tooltip>
        }
      />

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Pages */}
        {layout.map((columns, pageIndex) => (
          <div key={pageIndex} className={styles.page}>
            <div className="flex items-center justify-between pr-3">
              <p className={styles.heading}>
                {t('builder.common.glossary.page')} {pageIndex + 1}
              </p>

              <div className={clsx(styles.delete, { hidden: pageIndex === 0 })}>
                <Tooltip
                  title={
                    t('builder.common.actions.delete', {
                      token: t('builder.common.glossary.page'),
                    }) as string
                  }
                >
                  <IconButton size="small" onClick={() => handleDeletePage(pageIndex)}>
                    <Close fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div className={styles.container}>
              {/* Sections */}
              {columns.map((sections, columnIndex) => {
                const index = `${pageIndex}.${columnIndex}`;

                return (
                  <Droppable key={index} droppableId={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} className={styles.column} {...provided.droppableProps}>
                        <p className={styles.heading}>{columnIndex ? 'Sidebar' : 'Main'}</p>

                        <div className={styles.base} />

                        {/* Sections */}
                        {sections.map((sectionId, sectionIndex) => (
                          <Draggable key={sectionId} draggableId={sectionId} index={sectionIndex}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div
                                  className={clsx(styles.section, {
                                    [styles.disabled]: !get(resumeSections, `${sectionId}.visible`, true),
                                  })}
                                >
                                  {get(resumeSections, `${sectionId}.name`, '') as string}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-end">
          <Button variant="outlined" startIcon={<Add />} onClick={handleAddPage}>
            {t('builder.common.actions.add', { token: t('builder.common.glossary.page') })}
          </Button>
        </div>
      </DragDropContext>
    </>
  );
};

export default Layout;
