import './App.css'
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import JournalItem from "./components/JournalItem/JournalItem.jsx";
import CardButton from "./components/CardButton/CardButton.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import {useState} from "react";

const INITIAL_DATA = [
  {
    id: 1,
    title: 'Journal 1',
    text: 'First journal entry',
    date: new Date(2025, 2, 9),
  },
  {
    id: 6,
    title: 'Journal 2',
    text: 'Second journal entry',
    date: new Date(2025, 2, 10),
  },
  {
    id: 3,
    title: 'Journal 3',
    text: 'Third journal entry',
    date: new Date(2025, 2, 7),
  }
];


function App() {

  const [data, setData] = useState(INITIAL_DATA);
  // кешування maxId


  function addItem(item) {
    const ids = data.map(item => item.id);
    const maxId = Math.max(...ids, 1);

    for (let i = 1; i <= maxId + 1; i++) {
      if (!ids.includes(i)) {
        item.id = i;
        break;
      }
    }

    item.date = new Date(item.date);

    data.push(item);
    const newData = [...data];

    setData(() => newData);
  }


  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList data={data} />
      </LeftPanel>
      <Body>
        <JournalForm addItem={addItem} />
      </Body>
    </div>
  )
}

export default App
