import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SwitchInput from '../switch/switch.component';
import { MenuAlt4Icon } from '@heroicons/react/outline';

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`,
  };
  return custom;
});

console.log(initial);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteItem = ({ children, provided, ...props }) => (
  <div
    className="flex items-center justify-between border-t-2 px-2 py-2"
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    {...props}
  >
    <div>
      <MenuAlt4Icon className="w-6 h-6 inline-block mr-2 text-gray-400" />
      {children}
    </div>
    <SwitchInput />
  </div>
);

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote, index) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
});

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => <QuoteItem provided={provided}>{quote.content}</QuoteItem>}
    </Draggable>
  );
}

const DragDropSection = () => {
  const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="last:border-b-2"
          >
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropSection;
