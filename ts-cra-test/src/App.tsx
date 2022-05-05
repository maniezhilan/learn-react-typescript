import { render } from '@testing-library/react';
import React, { ReactElement, ReactNode, useState } from 'react';
import { isTemplateExpression, isTemplateSpan } from 'typescript';
import './App.css';

//conventional props

function Heading({title} : {title: string}){
  return <h1>{title}</h1>
}

function HeadingWithContent({children} : {children: ReactNode}) : ReactElement {
  return <h1>{children}</h1>
}

//Default props
const defaultContainerProps = {
  heading : <strong> My Heading </strong>,
};

type containerProps = { children: ReactNode } & typeof defaultContainerProps;

function Container ({ heading, children } : containerProps ) : ReactElement {
  return <div><h1>{heading}</h1>{children}</div>
}

Container.defaultProps = defaultContainerProps;

//functional props
function TextWithNumber({
  children } : { children : ( num: number) => ReactNode }
){
    const [state, stateSet ] = useState(0);

    return (
        <div>
          <div>{children(state)}</div>
          <div>
            <button onClick={ () => stateSet(state + 1) }>Add</button>
          </div>
        </div>
    );
}

//List
function List<ListItem>({
  items,
  render,
}: {
    items : ListItem[],
    render: ( item: ListItem) => ReactNode,
}) {
  return (
    <ul>
      {items.map((item,index) => (
        <li key={index}>
          {render(item)}  
        </li>
      ))}
    </ul>
  )
} 

function App() {
  return (
    <div className="App">
      <Heading title={'Hello there'}></Heading>
      <HeadingWithContent><strong>React node is awesome</strong></HeadingWithContent>
      <Container>Foo</Container>
      <TextWithNumber>{(num: number) => <div>Today's num {num}</div>}</TextWithNumber>
      <List items={['Mani','Ani','Aran']} render={(item) => item.toLowerCase()}></List>
    </div>
  );
}

export default App;
